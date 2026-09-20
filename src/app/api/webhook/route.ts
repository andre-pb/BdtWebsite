import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    let rawBody = '';

    try {
        rawBody = await request.text();
    } catch (err) {
        const error = err as Error;
        console.error(`❌ Webhook Stream Error: ${error.message}`);
        return NextResponse.json({ error: `Buffer Read Exception: ${error.message}` }, { status: 400 });
    }

    const signature = request.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        if (webhookSecret && signature) {
            event = stripe.webhooks.constructEvent(rawBody, signature || '', webhookSecret || '');
        } else {
            event = JSON.parse(rawBody);
        }
    } catch (err) {
        const error = err as Error;
        console.error(`❌ Webhook Signature Authentication Denied: ${error.message}`);
        return NextResponse.json({ error: `Signature Verification Failed: ${error.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const sessionSnapshot = event.data.object as any;
        let session = sessionSnapshot;

        if (sessionSnapshot.id && !sessionSnapshot.id.includes('simulation')) {
            try {
                console.log(`📡 Fetching complete master payload from Stripe for Session: ${sessionSnapshot.id}`);
                session = await stripe.checkout.sessions.retrieve(sessionSnapshot.id);
            } catch (retrieveError) {
                console.error('⚠️ Could not fetch fresh cloud session, falling back to webhook snapshot:', retrieveError);
            }
        }

        const customerEmail = session.customer_details?.email || 'Unknown Client';
        const customerName = session.shipping_details?.name || session.customer_details?.name || 'Anonymous Purchaser';
        const orderMetadata = session.metadata || {};
        const orderNumber = orderMetadata.order_number || `BDT-${session.id.slice(-6).toUpperCase()}`;
        const completionTimestamp = new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/London' });
        let itemManifest = '';
        let chunkIdx = 0;
        while (orderMetadata[`manifest_chunk_${chunkIdx}`]) {
            itemManifest += orderMetadata[`manifest_chunk_${chunkIdx}`];
            chunkIdx++;
        }

        if (!itemManifest) {
            itemManifest = orderMetadata.compiled_manifest || 'No manifest data passed.';
        }

        let hasArmyShirt = false;
        let hasCustomization = false;
        let needsVideoReview = false;

        if (itemManifest.toLowerCase().includes('pending review') || itemManifest.includes('🔗')) {
            needsVideoReview = true;
        }

        // Upgraded metadata detection to scan full order manifest and consolidated summaries
        const metadataString = JSON.stringify(orderMetadata).toLowerCase();
        const manifestLower = itemManifest.toLowerCase();

        if (manifestLower.includes('army') || metadataString.includes('ba220') || metadataString.includes('bda-')) {
            hasArmyShirt = true;
        }

        if (manifestLower.includes('custom stamp:') || (orderMetadata.cart_stamps_summary && orderMetadata.cart_stamps_summary !== 'None')) {
            hasCustomization = true;
        }

        if (manifestLower.includes('pending review') || manifestLower.includes('graduation video link') || manifestLower.includes('🔗')) {
            needsVideoReview = true;
        }

        // Resolve active address records natively
        const activeAddressObject = session.shipping_details?.address || session.customer_details?.address;
        let formattedAddress = 'No Shipping Address Provided';
        let countryRegionTag = 'GB';

        if (activeAddressObject) {
            countryRegionTag = activeAddressObject.country?.toUpperCase() || 'GB';

            const addressSegments = [
                activeAddressObject.line1,
                activeAddressObject.line2,
                activeAddressObject.city,
                activeAddressObject.state,
                activeAddressObject.postal_code,
                countryRegionTag
            ].filter(segment => segment !== null && segment !== undefined && String(segment).trim() !== '');

            formattedAddress = addressSegments.join(', ');
        }

        const isInternational = countryRegionTag !== 'GB';

        // ✈️ AUTOMATED PRINTFUL ROUTING TRIGGER
        if (isInternational) {
            const printfulToken = process.env.PRINTFUL_ACCESS_TOKEN;
            const printfulStoreId = process.env.PRINTFUL_STORE_ID;
            const passportString = orderMetadata.printful_passport || '';

            if (printfulToken && passportString && activeAddressObject) {
                try {
                    console.log(`✈️ International Target Confirmed (${countryRegionTag}). Compiling Printful Draft Order...`);

                    // Intelligently map IDs vs SKUs for Printful API requirements
                    const printfulItemsPayload = passportString.split('|').map((entry: string) => {
                        const [itemSku, itemQty] = entry.split(':');
                        const cleanSku = (itemSku || '').replace(/^#/, '').trim();
                        const quantity = parseInt(itemQty || '1', 10);

                        // 1. Pure numbers -> Printful Sync Variant ID (Numeric)
                        if (/^\d+$/.test(cleanSku)) {
                            return { sync_variant_id: parseInt(cleanSku, 10), quantity };
                        }
                        // 2. Alphanumeric/Hex codes (e.g. 6a8d5ee9d4d0c7) -> Printful External Variant ID
                        if (/^[a-f0-9]{10,}$/i.test(cleanSku)) {
                            return { external_variant_id: cleanSku, quantity };
                        }
                        // 3. Text SKUs -> Printful Sync SKU
                        return { external_variant_id: cleanSku, quantity };
                    });

                    const printfulOrderBody = {
                        external_id: orderNumber,
                        store_id: printfulStoreId ? parseInt(printfulStoreId, 10) : undefined,
                        recipient: {
                            name: customerName,
                            address1: activeAddressObject.line1 || '',
                            address2: activeAddressObject.line2 || '',
                            city: activeAddressObject.city || '',
                            state_code: activeAddressObject.state || '',
                            country_code: countryRegionTag,
                            zip: activeAddressObject.postal_code || ''
                        },
                        items: printfulItemsPayload,
                        confirm: false // Draft mode safeguard
                    };

                    const printfulResponse = await fetch('https://api.printful.com/orders', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${printfulToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(printfulOrderBody)
                    });

                    if (printfulResponse.ok) {
                        const printfulData = await printfulResponse.json();
                        console.log(`✅ Printful Draft Order Created Successfully! ID: ${printfulData.result?.id}`);
                    } else {
                        const errText = await printfulResponse.text();
                        console.error('❌ Printful API rejected the draft creation request:', errText);
                    }
                } catch (printfulError) {
                    console.error('❌ Printful background communication tunnel exception:', printfulError);
                }
            } else {
                console.warn('⚠️ Printful bypass rule invoked: Missing access token parameters or passport metadata.');
            }
        }

        // Construct the master Trello card description layout
        let finalDescription = '';

        if (needsVideoReview) {
            finalDescription += `# 🎥 [ACTION REQUIRED: REVIEW GRADUATION VIDEO]\n`;
            finalDescription += `> **Max:** An unverified free milestone item is in this order. Check the manifest below for the video access link.\n\n`;
        }

        if (isInternational) {
            if (hasArmyShirt || hasCustomization) {
                finalDescription += `## ⚠️ INTERNATIONAL ORDER - ACTION REQUIRED IN PRINTFUL\n`;
                finalDescription += `> **Action Required:** Open the draft order in Printful to attach the custom design print file before confirming/syncing.\n\n`;
            } else {
                finalDescription += `## ✈️ INTERNATIONAL ORDER - PRINTFUL AUTOMATED (RECORD ONLY)\n`;
                finalDescription += `> **No Action Required:** Standard items sent directly to Printful as an automated draft order. Do not print locally.\n\n`;
            }
        } else {
            finalDescription += `## 🏠 DOMESTIC ORDER - WEZZL IN-HOUSE FULFILLMENT\n\n`;
        }

        // Calculate total paid amount from Stripe session
        const amountPaid = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
        const currencySymbol = session.currency?.toLowerCase() === 'gbp' ? '£' : '$';

        finalDescription += `### 👤 Customer Profile\n`;
        finalDescription += `**Order ID:** ${orderNumber}\n`;
        finalDescription += `**Completed At:** ${completionTimestamp}\n`;
        finalDescription += `**Name:** ${customerName}\n`;
        finalDescription += `**Email:** ${customerEmail}\n`;
        finalDescription += `**Total Paid:** ${currencySymbol}${amountPaid}\n\n`;
        finalDescription += `### 🚚 Distribution Info\n`;
        finalDescription += `**Address:** ${formattedAddress}\n\n`;
        finalDescription += itemManifest;

        // CONNECT TO PRODUCTION TRELLO BOARD KEYS
        const trelloApiKey = (process.env.TRELLO_API_KEY || '').trim();
        const trelloToken = (process.env.TRELLO_TOKEN || '').trim();
        const targetListId = (process.env.TRELLO_LIST_NEW_ORDERS || '').trim();
        const yellowLabelId = (process.env.TRELLO_LABEL_YELLOW || '').trim();
        const orangeLabelId = (process.env.TRELLO_LABEL_ORANGE || '').trim();
        const purpleLabelId = (process.env.TRELLO_LABEL_PURPLE || '').trim();
        const greenLabelId = (process.env.TRELLO_LABEL_GREEN || '').trim();
        const checkPrintfulLabelId = (process.env.TRELLO_LABEL_CHECK_PRINTFUL || '').trim();

        if (trelloApiKey && trelloToken && targetListId) {
            const prefix = isInternational ? `[INT-${countryRegionTag}]` : `[GB]`;
            const cardTitle = `${prefix} ${orderNumber} - ${customerName}`;

            const trelloUrl = new URL('https://api.trello.com/1/cards');
            trelloUrl.searchParams.append('key', trelloApiKey);
            trelloUrl.searchParams.append('token', trelloToken);
            trelloUrl.searchParams.append('idList', targetListId);
            trelloUrl.searchParams.append('name', cardTitle);
            trelloUrl.searchParams.append('desc', finalDescription);

            const labelsToAttach: string[] = [];

            // Yellow Label: Needs custom design file
            if ((hasCustomization || hasArmyShirt) && yellowLabelId) {
                labelsToAttach.push(yellowLabelId);
            }

            // Orange Label: In-house Army shirt (UK domestic only)
            if (hasArmyShirt && !isInternational && orangeLabelId) {
                labelsToAttach.push(orangeLabelId);
            }

            // Purple Label: Graduation video review
            if (needsVideoReview && purpleLabelId) {
                labelsToAttach.push(purpleLabelId);
            }

            // Grey Label: Check Printful order (All international orders)
            if (isInternational && checkPrintfulLabelId) {
                labelsToAttach.push(checkPrintfulLabelId);
            }

            console.log('🏷️ --- TRELLO LABEL DIAGNOSTIC LOG ---');
            console.log(`- Destination: ${countryRegionTag} (isInternational: ${isInternational})`);
            console.log(`- Army Shirt Detected: ${hasArmyShirt}`);
            console.log(`- Customization Detected: ${hasCustomization}`);
            console.log(`- TRELLO_LABEL_CHECK_PRINTFUL read value: "${checkPrintfulLabelId}"`);
            console.log(`- Labels to attach:`, labelsToAttach);

            if (labelsToAttach.length > 0) {
                trelloUrl.searchParams.append('idLabels', labelsToAttach.join(','));
            }

            try {
                const trelloResponse = await fetch(trelloUrl.toString(), { method: 'POST' });
                if (trelloResponse.ok) {
                    console.log(`✅ Success! Created Trello Card for ${customerName} with labels:`, labelsToAttach);
                } else {
                    const errTxt = await trelloResponse.text();
                    console.error('❌ Trello target rejected webhook request payload:', errTxt);
                }
            } catch (trelloErr) {
                console.error('❌ Trello asynchronous execution pipeline failure:', trelloErr);
            }
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}

export async function GET() {
    const mockFakePayload = {
        type: 'checkout.session.completed',
        data: {
            object: {
                id: 'cs_test_live_simulation_999',
                shipping_details: null,
                customer_details: {
                    name: 'International Printful Test Purchaser',
                    email: 'global.buyer@example.com',
                    address: {
                        line1: 'Prinsengracht 456',
                        line2: 'Apt 4B',
                        city: 'Amsterdam',
                        state: 'North Holland',
                        postal_code: '1016 HL',
                        country: 'NL'
                    }
                },
                metadata: {
                    printful_passport: 'BA220-MIL-GREEN-Medium:1',
                    manifest_chunk_0: `### 👑 Garment Production Manifest\n--- \n**Product:** The Busy Dad Army Shirt\n**Garment Code (SKU):** \`BA220-MIL-GREEN-Medium\`\n**Quantity:** 1\n**Variations:** Size: Medium (M) | Rank: GRADUATED_PRACTITIONER\n\n`,
                    item_0_id: 'bda-shirt-m',
                    item_0_sku: 'BA220-MIL-GREEN-Medium'
                }
            }
        }
    };

    const mockRequest = new Request('http://localhost:3000/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockFakePayload)
    });

    return await POST(mockRequest);
}