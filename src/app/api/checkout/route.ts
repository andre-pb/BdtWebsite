import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

interface CartRequestItem {
    id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    unitAmount?: number;
    currency?: string;
    viewSrc?: string;
    customText?: string;
    badgeRank?: string;
    garmentCut?: string;
    fabricSpec?: string;
    logoStyle?: string;
    supplierSku?: string;
    submissionVideoUrl?: string;
}

export async function POST(request: Request) {
    try {
        const {
            cart,
            country = 'GB',
            currency = 'gbp',
            region = 'uk',
            shippingCostPence = 395
        } = await request.json();

        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return NextResponse.json({ error: 'Shopping bag data is empty.' }, { status: 400 });
        }

        const isUk = country === 'GB' || region === 'uk';
        const targetCurrency = (currency || 'gbp').toLowerCase();
        let trelloCardDescription = `### 👕 Garment Production Manifest\n`;

        const lineItems = cart.map((item: CartRequestItem) => {
            const descriptionParts = [`Size: ${item.size}`];
            if (item.logoStyle) descriptionParts.push(`Logo: ${item.logoStyle}`);
            if (item.garmentCut) descriptionParts.push(`Cut: ${item.garmentCut}`);

            if (item.fabricSpec) {
                let fabricLabel = item.fabricSpec;
                if (item.fabricSpec === 'PERF') {
                    fabricLabel = isUk ? 'Performance Poly' : '50/50 Blend';
                } else if (item.fabricSpec === 'COTTON') {
                    fabricLabel = 'Cotton';
                }
                descriptionParts.push(`Fabric: ${fabricLabel}`);
            }

            if (item.badgeRank) descriptionParts.push(`Rank: ${item.badgeRank}`);
            if (item.customText && item.customText !== 'None Stamped') {
                descriptionParts.push(`Custom Stamp: "${item.customText}"`);
            }

            trelloCardDescription += `--- \n`;
            trelloCardDescription += `**Product:** ${item.name}\n`;
            trelloCardDescription += `**Garment Code (SKU):** \`${item.supplierSku || 'N/A'}\`\n`;
            trelloCardDescription += `**Quantity:** ${item.quantity}\n`;
            trelloCardDescription += `**Variations:** ${descriptionParts.join(' | ')}\n`;

            if (item.submissionVideoUrl) {
                trelloCardDescription += `🔗 **Graduation Video Link:** ${item.submissionVideoUrl}\n`;
            }
            trelloCardDescription += `\n`;

            // Determine item currency and unit amount (cents/pence)
            const itemCurrency = (item.currency || targetCurrency).toLowerCase();
            const itemUnitAmount = item.unitAmount || Math.round(item.price * 100);

            return {
                price_data: {
                    currency: itemCurrency,
                    product_data: {
                        name: item.name,
                        description: `SKU: ${item.supplierSku || 'N/A'} | ${descriptionParts.join(' | ')}`,
                        images: item.viewSrc && item.viewSrc.startsWith('http') ? [item.viewSrc] : []
                    },
                    unit_amount: itemUnitAmount,
                },
                quantity: item.quantity,
            };
        });

        const compactedIds: string[] = [];
        const compactedSkus: string[] = [];
        const compactedStamps: string[] = [];
        const printfulPassportArray: string[] = [];

        cart.forEach((item, idx) => {
            compactedIds.push(`[${idx}]:${item.id}`);
            compactedSkus.push(`[${idx}]:${item.supplierSku || 'N/A'}`);
            printfulPassportArray.push(`${item.supplierSku || 'NOSKU'}:${item.quantity}`);
            if (item.customText && item.customText !== 'None Stamped') {
                compactedStamps.push(`[${idx}]:${item.customText}`);
            }
        });

        const manifestChunks: Record<string, string> = {};
        const chunkSize = 400;
        let chunkIndex = 0;
        for (let i = 0; i < trelloCardDescription.length; i += chunkSize) {
            manifestChunks[`manifest_chunk_${chunkIndex}`] = trelloCardDescription.substring(i, i + chunkSize);
            chunkIndex++;
        }

        const shippingTitle = region === 'global' ? 'Standard Delivery' : 'Royal Mail Standard (UK)';
        const uniqueSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
        const orderNumber = `BDT-${uniqueSuffix}`;

        const sessionConfiguration: Stripe.Checkout.SessionCreateParams = {
            client_reference_id: orderNumber,
            payment_intent_data: {
                description: `Order ${orderNumber}`,
            },
            line_items: lineItems,
            mode: 'payment',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: [country as any],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: shippingCostPence,
                            currency: targetCurrency
                        },
                        display_name: shippingTitle,
                    }
                }
            ],
            metadata: {
                order_number: orderNumber,
                total_items_count: String(cart.reduce((sum, i) => sum + i.quantity, 0)),
                cart_item_ids_summary: compactedIds.join(' | ').substring(0, 450),
                cart_skus_summary: compactedSkus.join(' | ').substring(0, 450),
                cart_stamps_summary: compactedStamps.length > 0 ? compactedStamps.join(' | ').substring(0, 450) : 'None',
                printful_passport: printfulPassportArray.join('|').substring(0, 450),
                ...manifestChunks
            },
            success_url: `${request.headers.get('origin')}/shop?success=true`,
            cancel_url: `${request.headers.get('origin')}/shop?canceled=true`,
        };

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
        const session = await stripe.checkout.sessions.create(sessionConfiguration);
        return NextResponse.json({ url: session.url });

    } catch (err) {
        const error = err as Error;
        console.error('❌ Stripe Checkout Handshake Error:', error);
        return NextResponse.json({ error: error.message || 'Internal processing anomaly.' }, { status: 500 });
    }
}