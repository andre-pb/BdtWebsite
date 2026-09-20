export const dynamic = "force-static";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { country, state, cart } = await request.json();

        if (!country || !cart || !Array.isArray(cart) || cart.length === 0) {
            return NextResponse.json({ error: 'Invalid payload or empty cart.' }, { status: 400 });
        }

        const printfulToken = process.env.PRINTFUL_ACCESS_TOKEN;
        const printfulStoreId = process.env.PRINTFUL_STORE_ID;

        if (!printfulToken) {
            return NextResponse.json({ ratePence: 850, rateFormatted: '£8.50' });
        }

        // Default state codes for countries that mandate them for rate calculations
        let stateCode = state;
        if (!stateCode) {
            if (country === 'US') stateCode = 'NY';
            else if (country === 'CA') stateCode = 'ON';
            else if (country === 'AU') stateCode = 'NSW';
        }

        // Map cart items for Printful package weight calculation
        const printfulItems = cart.map((item: any) => {
            const cleanSku = (item.supplierSku || '').replace(/^#/, '').trim();

            // 1. Pure numeric Printful Sync Variant ID
            if (/^\d+$/.test(cleanSku)) {
                return { sync_variant_id: parseInt(cleanSku, 10), quantity: item.quantity };
            }

            // 2. Hex / Alphanumeric External Variant ID
            if (/^[a-f0-9]{10,}$/i.test(cleanSku)) {
                return { external_variant_id: cleanSku, quantity: item.quantity };
            }

            // 3. Fallback to standard T-Shirt catalog weight (4011) for unsynced items
            return { variant_id: 4011, quantity: item.quantity };
        });

        const printfulResponse = await fetch('https://api.printful.com/shipping/rates', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${printfulToken}`,
                'Content-Type': 'application/json',
                ...(printfulStoreId ? { 'X-Printful-Store-Id': printfulStoreId } : {})
            },
            body: JSON.stringify({
                store_id: printfulStoreId ? parseInt(printfulStoreId, 10) : undefined,
                recipient: {
                    country_code: country,
                    ...(stateCode ? { state_code: stateCode } : {})
                },
                items: printfulItems,
                currency: 'GBP',
            }),
        });

        if (!printfulResponse.ok) {
            const errText = await printfulResponse.text();
            console.error('❌ Printful Rate API Error Details:', errText);
            return NextResponse.json({ ratePence: 850, rateFormatted: '£8.50' });
        }

        const data = await printfulResponse.json();
        const rates = data.result;

        if (rates && rates.length > 0) {
            const standardRate = parseFloat(rates[0].rate);
            const ratePence = Math.round(standardRate * 100);
            return NextResponse.json({ ratePence, rateFormatted: `£${standardRate.toFixed(2)}` });
        }

        return NextResponse.json({ ratePence: 850, rateFormatted: '£8.50' });

    } catch (error) {
        console.error('❌ Printful Live Rate Fetch Exception:', error);
        return NextResponse.json({ ratePence: 850, rateFormatted: '£8.50' });
    }
}