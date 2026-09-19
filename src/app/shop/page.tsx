'use client';
import Script from 'next/script';
import React, { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRINTFUL_CATALOG_HEX_IDS } from './printful-catalog';

interface CartItem {
    id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    viewSrc?: string;
    customText?: string;
    badgeRank?: string;
    garmentCut?: string;
    fabricSpec?: string;
    logoStyle?: string;
    supplierSku?: string;
    colorVariant?: string;
}

// 🌍 PRINTFUL HUB COUNTRIES (UK 1ST, USA 2ND, ALPHABETICAL AFTER)
const PRINTFUL_COUNTRIES = [
    { code: 'GB', flag: 'gb', name: 'United Kingdom', currency: 'GBP', symbol: '£', rate: 1.0 },
    { code: 'US', flag: 'us', name: 'United States', currency: 'USD', symbol: '$', rate: 1.20 },
    { code: 'AT', flag: 'at', name: 'Austria', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'AU', flag: 'au', name: 'Australia', currency: 'AUD', symbol: 'A$', rate: 1.90 },
    { code: 'BE', flag: 'be', name: 'Belgium', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'BG', flag: 'bg', name: 'Bulgaria', currency: 'BGN', symbol: 'lv', rate: 2.25 },
    { code: 'BR', flag: 'br', name: 'Brazil', currency: 'BRL', symbol: 'R$', rate: 7.00 },
    { code: 'CA', flag: 'ca', name: 'Canada', currency: 'CAD', symbol: 'CA$', rate: 1.65 },
    { code: 'HR', flag: 'hr', name: 'Croatia', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'CY', flag: 'cy', name: 'Cyprus', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'CZ', flag: 'cz', name: 'Czechia', currency: 'CZK', symbol: 'Kč', rate: 29.0 },
    { code: 'DK', flag: 'dk', name: 'Denmark', currency: 'DKK', symbol: 'kr.', rate: 8.60 },
    { code: 'EE', flag: 'ee', name: 'Estonia', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'FI', flag: 'fi', name: 'Finland', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'FR', flag: 'fr', name: 'France', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'DE', flag: 'de', name: 'Germany', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'GR', flag: 'gr', name: 'Greece', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'HU', flag: 'hu', name: 'Hungary', currency: 'HUF', symbol: 'Ft', rate: 450.0 },
    { code: 'IE', flag: 'ie', name: 'Ireland', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'IT', flag: 'it', name: 'Italy', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'JP', flag: 'jp', name: 'Japan', currency: 'JPY', symbol: '¥', rate: 195.0 },
    { code: 'LV', flag: 'lv', name: 'Latvia', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'LT', flag: 'lt', name: 'Lithuania', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'LU', flag: 'lu', name: 'Luxembourg', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'MT', flag: 'mt', name: 'Malta', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'MX', flag: 'mx', name: 'Mexico', currency: 'MXN', symbol: 'MEX$', rate: 23.0 },
    { code: 'NL', flag: 'nl', name: 'Netherlands', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'NO', flag: 'no', name: 'Norway', currency: 'NOK', symbol: 'kr', rate: 13.5 },
    { code: 'PL', flag: 'pl', name: 'Poland', currency: 'PLN', symbol: 'zł', rate: 5.00 },
    { code: 'PT', flag: 'pt', name: 'Portugal', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'RO', flag: 'ro', name: 'Romania', currency: 'RON', symbol: 'lei', rate: 5.75 },
    { code: 'SK', flag: 'sk', name: 'Slovakia', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'SI', flag: 'si', name: 'Slovenia', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'ES', flag: 'es', name: 'Spain', currency: 'EUR', symbol: '€', rate: 1.15 },
    { code: 'SE', flag: 'se', name: 'Sweden', currency: 'SEK', symbol: 'kr', rate: 13.0 },
    { code: 'CH', flag: 'ch', name: 'Switzerland', currency: 'CHF', symbol: 'CHF', rate: 1.12 },
];

export default function ShopPage() {
    const [gradDeclaration, setGradDeclaration] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isHoveringBag, setIsHoveringBag] = useState(false);
    const [isStoreReady, setIsStoreReady] = useState(false);
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

    // 🎯 SELECTED COUNTRY & PERSISTENCE STATE
    const [selectedCountry, setSelectedCountry] = useState<string>('GB');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const isUkOrder = selectedCountry === 'GB';
    const prevCountryRef = useRef<string>(selectedCountry);

    const countryDropdownRef = useRef<HTMLDivElement>(null);
    const miniBagRef = useRef<HTMLDivElement>(null);

    const activeCountryObj = PRINTFUL_COUNTRIES.find(c => c.code === selectedCountry) || PRINTFUL_COUNTRIES[0];

    // Helper to update selected country and persist it
    const handleSelectCountry = (code: string) => {
        setSelectedCountry(code);
        localStorage.setItem('bdt_shop_country', code);
        setIsCountryDropdownOpen(false);
    };

    // 💵 PSYCHOLOGICAL REGIONAL PRICING HELPER
    const getRegionalPrice = (gbpBase: number) => {
        const currency = activeCountryObj.currency;
        const symbol = activeCountryObj.symbol;

        if (currency === 'USD') {
            if (gbpBase === 24.99) return `${symbol}29.99`;
            if (gbpBase === 29.99) return `${symbol}34.99`;
            if (gbpBase === 14.00) return `${symbol}18.00`;
            if (gbpBase === 18.00) return `${symbol}22.00`;
        }

        if (currency === 'EUR') {
            if (gbpBase === 24.99) return `${symbol}28.99`;
            if (gbpBase === 29.99) return `${symbol}34.99`;
            if (gbpBase === 14.00) return `${symbol}16.00`;
            if (gbpBase === 18.00) return `${symbol}20.00`;
        }

        if (currency === 'CAD') {
            if (gbpBase === 24.99) return `${symbol}34.99`;
            if (gbpBase === 29.99) return `${symbol}39.99`;
            if (gbpBase === 14.00) return `${symbol}20.00`;
            if (gbpBase === 18.00) return `${symbol}24.00`;
        }

        if (currency === 'AUD') {
            if (gbpBase === 24.99) return `${symbol}39.99`;
            if (gbpBase === 29.99) return `${symbol}44.99`;
            if (gbpBase === 14.00) return `${symbol}22.00`;
            if (gbpBase === 18.00) return `${symbol}26.00`;
        }

        if (currency === 'GBP') {
            return `${symbol}${gbpBase.toFixed(2)}`;
        }

        const converted = gbpBase * activeCountryObj.rate;
        if (currency === 'JPY' || currency === 'HUF') {
            return `${symbol}${Math.round(converted).toLocaleString()}`;
        }
        return `${symbol}${converted.toFixed(2)}`;
    };
    useEffect(() => {
        const timer = setTimeout(() => setIsStoreReady(true), 250);
        return () => clearTimeout(timer);
    }, []);
    // Auto-detect or restore saved country on load
    useEffect(() => {
        const savedCountry = localStorage.getItem('bdt_shop_country');
        if (savedCountry && PRINTFUL_COUNTRIES.some(c => c.code === savedCountry)) {
            prevCountryRef.current = savedCountry;
            setSelectedCountry(savedCountry);
            return;
        }

        const detectUserCountry = async () => {
            try {
                const res = await fetch('https://ipapi.co/json/');
                if (res.ok) {
                    const data = await res.json();
                    const detectedCode = data.country_code;
                    const isSupported = PRINTFUL_COUNTRIES.some(c => c.code === detectedCode);
                    if (isSupported) {
                        prevCountryRef.current = detectedCode;
                        setSelectedCountry(detectedCode);
                    }
                }
            } catch (err) {
                // Silently fallback to UK if blocked
            }
        };
        detectUserCountry();
    }, []);

    // Close Country Dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
                setIsCountryDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 🛡️ REGIONAL CART SYNC & AUTO-PURGE GUARD
    useEffect(() => {
        if (!isMounted) return;

        const prevCountry = prevCountryRef.current;
        const wasUk = prevCountry === 'GB';
        const nowUk = selectedCountry === 'GB';

        // Only run when switching between UK and Non-UK regions
        if (wasUk !== nowUk && cart.length > 0) {
            let updatedCart = [...cart];
            let vestsOrBeaniesRemoved = false;
            let performanceSwapped = false;

            // 1. Purge UK-only items (Vests & Beanies) when leaving the UK
            if (!nowUk) {
                const initialLength = updatedCart.length;
                updatedCart = updatedCart.filter(item => item.garmentCut !== 'VEST' && !item.id.includes('beanie'));
                if (updatedCart.length < initialLength) {
                    vestsOrBeaniesRemoved = true;
                }
            }

            // 2. Recalculate SKUs and preview images for Level Progress Gear
            updatedCart = updatedCart.map(item => {
                const isLevelItem = item.id.startsWith('lvl-') || item.name.includes('Level Progress Gear');

                if (isLevelItem) {
                    // Extract level parameters from item ID or properties
                    const idParts = item.id.split('-');
                    const levelTarget = idParts[1] || '1A';
                    const logoStyle = item.logoStyle || 'ORIGINAL';
                    const fabricSpec = item.fabricSpec || 'COTTON';
                    const garmentCut = item.garmentCut || 'SHIRT';

                    if (fabricSpec === 'PERF') {
                        performanceSwapped = true;
                    }

                    // Extract size code (e.g., "Medium (M)" -> "M")
                    const sizeCode = item.size.includes('(')
                        ? item.size.split('(')[1].replace(')', '').trim()
                        : item.size.split(' ')[0].trim();

                    const levelCode = levelTarget.replace(/Level\s*/i, '').replace(/\s*\(.*?\)\s*/g, '').trim();

                    // Recalculate regional SKU
                    let newSku = '';
                    if (nowUk) {
                        newSku = `UK-${levelCode}-${fabricSpec}-${sizeCode}`;
                    } else {
                        const styleSuffix = logoStyle === 'BDT' ? 'BDT' : 'ORIGINAL';
                        const lookupKey = `${levelCode}_${fabricSpec}_${styleSuffix}`;
                        const productHexMap = PRINTFUL_CATALOG_HEX_IDS[lookupKey];
                        newSku = productHexMap ? (productHexMap[sizeCode] || 'MISSING_HEX_ID') : 'MISSING_PRODUCT_KEY';
                    }

                    // Recalculate regional mockup image source
                    let prefix = levelTarget.replace(/\s*\(.*?\)\s*/g, "").trim();
                    if (prefix === "Graduated") prefix = "G";
                    const parts = [prefix];
                    if (logoStyle === "BDT") parts.push("BDT");
                    if (fabricSpec === "PERF" && nowUk) parts.push("perf");
                    if (garmentCut === "VEST") parts.push("vest");
                    const finalPrefix = parts.join("_").replace(/__+/g, '_');
                    const newViewSrc = `/images/${finalPrefix}_1.jpg`;

                    return {
                        ...item,
                        supplierSku: newSku,
                        viewSrc: newViewSrc
                    };
                }

                // Sync Busy Dad Army Shirt SKUs across regions
                if (item.id.startsWith('bda-')) {
                    const sizeCode = item.size.includes('(')
                        ? item.size.split('(')[1].replace(')', '').trim()
                        : item.size.split(' ')[0].trim();
                    let newSku = '';
                    if (nowUk) {
                        newSku = `BA220-MIL-GREEN-${sizeCode}`;
                    } else {
                        const armyHexMap = PRINTFUL_CATALOG_HEX_IDS['ARMY'];
                        newSku = armyHexMap ? (armyHexMap[sizeCode] || 'MISSING_HEX_ID') : 'MISSING_PRODUCT_KEY';
                    }
                    return { ...item, supplierSku: newSku };
                }

                // Sync DOWN Casual Premium Tee SKUs across regions
                if (item.id.startsWith('casual-')) {
                    const sizeCode = item.size.includes('(')
                        ? item.size.split('(')[1].replace(')', '').trim()
                        : item.size.split(' ')[0].trim();
                    let newSku = '';
                    if (nowUk) {
                        newSku = `SX001-ORGANIC-BLACK-${sizeCode}`;
                    } else {
                        const downHexMap = PRINTFUL_CATALOG_HEX_IDS['DOWN'];
                        newSku = downHexMap ? (downHexMap[sizeCode] || 'MISSING_HEX_ID') : 'MISSING_PRODUCT_KEY';
                    }
                    return { ...item, supplierSku: newSku };
                }

                return item;
            });

            saveCart(updatedCart);

            // 3. Trigger User Notifications
            const notices: string[] = [];
            if (vestsOrBeaniesRemoved) {
                notices.push("• Vests/Beanies are not available in the selected region and have been removed from your bag.");
            }
            if (performanceSwapped) {
                if (nowUk) {
                    notices.push("• Your 186gsm 50/50 Cotton/Poly Blend shirt has been updated to the UK specification (135gsm Performance Poly).");
                } else {
                    notices.push("• Your 135gsm Performance Poly shirt has been updated to the international regional equivalent (186gsm 50/50 Cotton/Poly Blend)");
                }
            }

            if (notices.length > 0) {
                window.alert(`ℹ️ REGIONAL ITEM UPDATE:\n\n${notices.join("\n\n")}`);
            }
        }

        prevCountryRef.current = selectedCountry;
    }, [selectedCountry, isMounted]);



    // Gallery System States
    const [activeGalleryImages, setActiveGalleryImages] = useState<string[]>([]);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const [activeViewportId, setActiveViewportId] = useState('');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxSrc, setLightboxSrc] = useState('');

    // Dropdown Selection States
    const [levelTarget, setLevelTarget] = useState('1A');
    const [logoStyle, setLogoStyle] = useState('ORIGINAL');
    const [fabricSpec, setFabricSpec] = useState('COTTON');
    const [garmentCut, setGarmentCut] = useState('SHIRT');
    const [levelSize, setLevelSize] = useState('Medium (M)');
    const [bdaName, setBdaName] = useState('');
    const [bdaBadge, setBdaBadge] = useState('PRACTITIONER');
    const [bdaSize, setBdaSize] = useState('Medium (M)');
    const [casualSize, setCasualSize] = useState('Medium (M)');

    // Auto-reset Vest selection for Levels 3A, 3B, 4A, & 4B
    useEffect(() => {
        if (['3A', '3B', '4A', '4B'].includes(levelTarget) && garmentCut === 'VEST') {
            setGarmentCut('SHIRT');
        }
    }, [levelTarget, garmentCut]);

    // Beanie Configuration States
    const [beanieTier, setBeanieTier] = useState('NONE');
    const [beanieColor, setBeanieColor] = useState('BLACK');
    const [beanieLogoStyle, setBeanieLogoStyle] = useState('ORIGINAL');

    // Modals Visibility
    const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
    const [sizeModalTitle, setSizeModalTitle] = useState('Garment Size Chart');
    const [sizeModalType, setSizeModalType] = useState('level');
    const [isGraduationModalOpen, setIsGraduationModalOpen] = useState(false);
    const [gradVideoUrl, setGradVideoUrl] = useState('');

    // Static Gallery Assets Lists
    const [levelAssets, setLevelAssets] = useState<string[]>([]);
    const [bdaAssets, setBdaAssets] = useState<string[]>([]);
    const [casualAssets, setCasualAssets] = useState<string[]>([]);
    const [beanieAssets, setBeanieAssets] = useState<string[]>([]);

    // Viewport Source Syncs
    const [levelViewSrc, setLevelViewSrc] = useState('');
    const [bdaViewSrc, setBdaViewSrc] = useState('');
    const [casualViewSrc, setCasualViewSrc] = useState('');
    const [beanieViewSrc, setBeanieViewSrc] = useState('');

    const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

    // Order Status Modals Interceptors
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const standardSizeRows = [
        { tag: 'S', fit: '36 - 38"' },
        { tag: 'M', fit: '38 - 40"' },
        { tag: 'L', fit: '41 - 43"' },
        { tag: 'XL', fit: '43 - 45"' },
        { tag: '2XL', fit: '46 - 48"' },
    ];

    const premiumSizeRows = [
        { tag: 'S', fit: '36 - 38"' },
        { tag: 'M', fit: '38 - 40"' },
        { tag: 'L', fit: '41 - 43"' },
        { tag: 'XL', fit: '43 - 45"' },
        { tag: '2XL', fit: '46 - 47"' },
    ];

    // Enforce Reactive Form Constraints
    useEffect(() => {
        if (garmentCut === 'VEST') {
            setFabricSpec('PERF');
        }
    }, [garmentCut]);

    useEffect(() => {
        if (!isUkOrder && garmentCut === 'VEST') {
            setGarmentCut('SHIRT');
            setFabricSpec('COTTON');
        }
    }, [isUkOrder, garmentCut]);

    useEffect(() => {
        if (fabricSpec === 'COTTON' && garmentCut === 'VEST') {
            setGarmentCut('SHIRT');
        }
    }, [fabricSpec]);

    useEffect(() => {
        if (beanieTier === 'PREM' && beanieColor === 'WHITE') {
            setBeanieColor('GRAPHITE');
        }
        if (beanieTier === 'STD' && beanieColor === 'GRAPHITE') {
            setBeanieColor('BLACK');
        }
    }, [beanieTier, beanieColor]);

    useEffect(() => {
        if (!isCartOpen) return;
        const handleScroll = () => {
            if (!isHoveringBag) setIsCartOpen(false);
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (miniBagRef.current && !miniBagRef.current.contains(event.target as Node)) {
                setIsCartOpen(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartOpen, isHoveringBag]);

    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('bdt_shop_cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                if (Array.isArray(parsed)) setCart(parsed);
            } catch { }
        }
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('success') === 'true') {
            setShowSuccessModal(true);
            setCart([]);
            localStorage.removeItem('bdt_shop_cart');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        if (queryParams.get('canceled') === 'true') {
            setShowCancelModal(true);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const saveCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('bdt_shop_cart', JSON.stringify(newCart));
    };

    const addItemToCart = (item: Omit<CartItem, 'quantity'>) => {
        const existingIndex = cart.findIndex(i => i.id === item.id);
        if (existingIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingIndex].quantity += 1;
            saveCart(updatedCart);
        } else {
            saveCart([...cart, { ...item, quantity: 1 }]);
        }
        setIsCartOpen(true);
    };

    const removeCartItem = (id: string) => {
        saveCart(cart.filter(item => item.id !== id));
    };

    useEffect(() => {
        let prefix = levelTarget.replace(/\s*\(.*?\)\s*/g, "").trim();
        if (prefix === "Graduated") prefix = "G";
        const parts = [prefix];
        if (logoStyle === "BDT") parts.push("BDT");
        if (fabricSpec === "PERF" && isUkOrder) parts.push("perf"); // 👈 Only use performance mockup images in the UK
        if (garmentCut === "VEST") parts.push("vest");
        const prefixString = parts.join("_").replace(/__+/g, '_');

        const mockImages = [
            `/images/${prefixString}_1.jpg`,
            `/images/${prefixString}_2.jpg`,
            `/images/${prefixString}_3.jpg`,
            `/images/${prefixString}_4.jpg`,
            `/images/${prefixString}_5.jpg`
        ];
        setLevelAssets(mockImages);
        setLevelViewSrc(mockImages[0]);
    }, [levelTarget, logoStyle, fabricSpec, garmentCut, isUkOrder]); // 👈 Added isUkOrder dependency

    useEffect(() => {
        const mockBda = ['/images/BDA_1.jpg', '/images/BDA_2.jpg', '/images/BDA_3.jpg', '/images/BDA_4.jpg', '/images/BDA_5.jpg'];
        setBdaAssets(mockBda);
        setBdaViewSrc(mockBda[0]);

        const mockCasual = ['/images/casual_1.jpg', '/images/casual_2.jpg', '/images/casual_3.jpg', '/images/casual_4.jpg'];
        setCasualAssets(mockCasual);
        setCasualViewSrc(mockCasual[0]);
    }, []);

    useEffect(() => {
        if (beanieTier === 'NONE') {
            const fallbackList = ['/images/beanies_1.jpg', '/images/beanies_2.jpg'];
            setBeanieAssets(fallbackList);
            setBeanieViewSrc(fallbackList[0]);
        } else {
            let list: string[] = [];
            if (beanieTier === 'PREM') {
                list = [1, 2, 3, 4, 5].map(i => `/images/beanie_prem_${i}.jpg`);
            } else {
                const styleTag = beanieLogoStyle === 'BDT' ? '_BDT' : '';
                const colorTag = beanieColor.toLowerCase();
                list = [1, 2, 3, 4, 5].map(i => `/images/beanie_std${styleTag}_${colorTag}_${i}.jpg`);
            }
            setBeanieAssets(list);
            setBeanieViewSrc(list[0]);
        }
    }, [beanieTier, beanieColor, beanieLogoStyle]);

    const handleImageError = (src: string) => {
        if (src) {
            setBrokenImages(prev => ({ ...prev, [src]: true }));
        }
    };

    const triggerGraduationEmail = () => {
        const videoInput = gradVideoUrl.trim();

        if (videoInput === "" || (!videoInput.startsWith("http://") && !videoInput.startsWith("https://"))) {
            window.alert(
                "❌ VALID ACCESS LINK REQUIRED:\n\n" +
                "You must provide a valid shareable web link to your workout files (YouTube, Vimeo, Google Drive, Dropbox, WeTransfer, etc.).\n\n" +
                "Please upload your video files to one of these platforms and copy/paste the sharing URL below."
            );
            return;
        }

        if (!gradDeclaration) {
            window.alert("❌ Please check the declaration box to certify your metrics before proceeding.");
            return;
        }

        addItemToCart({
            id: `level-gear-G-free-review-${levelSize.replace(/\s+/g, '')}`,
            name: "Graduation Progress Gear (Pending Review)",
            price: 0,
            size: levelSize,
            viewSrc: '',
            supplierSku: `BA220-GOLD-${levelSize.split(' ')[0]}`,
            holdForReview: true,
            submissionVideoUrl: videoInput
        } as any);

        setGradVideoUrl("");
        setGradDeclaration(false);
        setIsGraduationModalOpen(false);
    };

    const handleLevelShirtCartAction = () => {
        if (levelTarget === "Graduated") {
            setIsGraduationModalOpen(true);
        } else {
            const prefix = levelTarget.replace(/\s*\(.*?\)\s*/g, "").trim();
            const parts = [prefix];
            if (logoStyle === "BDT") parts.push("BDT");
            if (fabricSpec === "PERF" && isUkOrder) parts.push("perf"); // 👈 Only use performance mockup for UK cart items
            if (garmentCut === "VEST") parts.push("vest");
            const finalPrefix = parts.join("_").replace(/__+/g, '_');

            // 1. Extract clean level code (e.g., "1A", "2B", "G")
            const levelCode = levelTarget.replace(/Level\s*/i, '').replace(/\s*\(.*?\)\s*/g, '').trim();

            // 2. Extract clean size letter (e.g., "Medium (M)" -> "M")
            const sizeCode = levelSize.includes('(')
                ? levelSize.split('(')[1].replace(')', '').trim()
                : levelSize;

            let generatedSku = '';

            if (selectedCountry === 'GB') {
                // UK domestic in-house printing SKU
                generatedSku = `UK-${levelCode}-${fabricSpec}-${sizeCode}`;
            } else {
                // International Printful SKU resolution across all 42 products
                const styleSuffix = logoStyle === 'BDT' ? 'BDT' : 'ORIGINAL';
                const lookupKey = `${levelCode}_${fabricSpec}_${styleSuffix}`;
                const productHexMap = PRINTFUL_CATALOG_HEX_IDS[lookupKey];

                generatedSku = productHexMap ? (productHexMap[sizeCode] || 'MISSING_HEX_ID') : 'MISSING_PRODUCT_KEY';
            }

            addItemToCart({
                id: `lvl-${levelTarget}-${logoStyle}-${fabricSpec}-${garmentCut}-${levelSize.replace(/\s+/g, '')}`,
                name: `Level Progress Gear (Level ${levelTarget})`,
                price: 24.99,
                size: levelSize,
                viewSrc: `/images/${finalPrefix}_1.jpg`,
                logoStyle,
                fabricSpec,
                garmentCut,
                supplierSku: generatedSku
            });
        }
    };

    const handleBdaCartAction = () => {
        const textStamped = bdaName.trim();

        if (textStamped === "") {
            const proceedWithoutName = window.confirm(
                "⚠️ NO CUSTOM NAME ENTERED:\n\n" +
                "You haven't entered any text for your custom identity stamp. If you proceed, " +
                "your Army Shirt will be printed without a custom name detail on the garment.\n\n" +
                "Click 'OK' to add it to your bag anyway, or click 'Cancel' to go back and enter your name."
            );

            if (!proceedWithoutName) return;
        }

        // --- BUSY DAD ARMY SHIRT HANDLER ---
        const bdaSizeCode = bdaSize.includes('(')
            ? bdaSize.split('(')[1].replace(')', '').trim()
            : bdaSize.split(' ')[0].trim();

        const finalStampText = textStamped === "" ? "None Stamped" : textStamped;

        let bdaSku = '';
        if (selectedCountry === 'GB') {
            bdaSku = `BA220-MIL-GREEN-${bdaSizeCode}`;
        } else {
            const armyHexMap = PRINTFUL_CATALOG_HEX_IDS['ARMY'];
            bdaSku = armyHexMap ? (armyHexMap[bdaSizeCode] || 'MISSING_HEX_ID') : 'MISSING_PRODUCT_KEY';
        }

        addItemToCart({
            id: `bda-${bdaBadge}-${bdaSize.replace(/\s+/g, '')}-${finalStampText.replace(/\s+/g, '')}`,
            name: "The Busy Dad Army Shirt",
            price: 29.99,
            size: bdaSize,
            viewSrc: bdaAssets[0],
            badgeRank: bdaBadge,
            customText: finalStampText,
            supplierSku: bdaSku
        });
    };

    // --- DOWN CASUAL PREMIUM TEE HANDLER ---
    const handlePremiumDropCartAction = () => {
        const casualSizeCode = casualSize.includes('(')
            ? casualSize.split('(')[1].replace(')', '').trim()
            : casualSize.split(' ')[0].trim();

        let casualSku = '';
        if (selectedCountry === 'GB') {
            casualSku = `SX001-ORGANIC-BLACK-${casualSizeCode}`;
        } else {
            const downHexMap = PRINTFUL_CATALOG_HEX_IDS['DOWN'];
            casualSku = downHexMap ? (downHexMap[casualSizeCode] || 'MISSING_HEX_ID') : 'MISSING_PRODUCT_KEY';
        }

        addItemToCart({
            id: `casual-${casualSize.replace(/\s+/g, '')}`,
            name: "DOWN Casual Premium Tee",
            price: 29.99,
            size: casualSize,
            viewSrc: '/images/casual_1.jpg',
            supplierSku: casualSku
        });
    };

    const handleBeanieCartAction = () => {
        if (beanieTier === 'NONE') {
            alert('❌ Please select a beanie type configuration before adding to your bag.');
            return;
        }
        const finalTitle = beanieTier === 'PREM'
            ? "Loose-knit Thinsulate beanie"
            : "Original Tight Knit Beanie";

        const finalPrice = beanieTier === 'PREM' ? 18.00 : 14.00;

        addItemToCart({
            id: `beanie-${beanieTier}-${beanieLogoStyle}-${beanieColor}`,
            name: finalTitle,
            price: finalPrice,
            size: `One Size (${beanieColor})`,
            viewSrc: beanieViewSrc,
            supplierSku: `BC-${beanieTier}-${beanieLogoStyle}-${beanieColor}`,
            colorVariant: beanieColor,
            logoStyle: beanieLogoStyle
        });
    };

    // 🚀 CHECKOUT HANDSHAKE (WITH REFINED BUTTON TEXT)
    const handleCheckoutRedirect = async () => {
        setIsProcessingCheckout(true);
        try {
            let calculatedShippingPence = 395; // £3.95 Standard Royal Mail for UK

            if (!isUkOrder) {
                try {
                    const rateResponse = await fetch('/api/shipping-rates', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ country: selectedCountry, cart }),
                    });

                    if (rateResponse.ok) {
                        const rateData = await rateResponse.json();
                        calculatedShippingPence = rateData.ratePence || 850;
                    } else {
                        calculatedShippingPence = 850; // £8.50 fallback
                    }
                } catch (rateErr) {
                    console.warn('⚠️ Could not fetch live rate, falling back to standard international rate:', rateErr);
                    calculatedShippingPence = 850; // £8.50 fallback
                }
            }

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cart,
                    country: selectedCountry,
                    region: isUkOrder ? 'uk' : 'global',
                    shippingCostPence: calculatedShippingPence
                }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(`❌ Checkout Generation Refused: ${data.error || 'Unknown parameter exception.'}`);
            }
        } catch (error) {
            console.error('Frontend Checkout Handshake Exception:', error);
            alert('❌ Failed to establish link communication with payment systems.');
        } finally {
            setIsProcessingCheckout(false);
        }
    };

    const openZoomModal = (viewportId: string, currentSrc: string, galleryList: string[]) => {
        if (!currentSrc || brokenImages[currentSrc]) return;
        setActiveViewportId(viewportId);
        setActiveGalleryImages(galleryList.filter(img => !brokenImages[img]));
        const matchedIndex = galleryList.filter(img => !brokenImages[img]).indexOf(currentSrc);
        setCurrentGalleryIndex(matchedIndex >= 0 ? matchedIndex : 0);
        setLightboxSrc(currentSrc);
        setIsLightboxOpen(true);
    };

    const navigateLightbox = (direction: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeGalleryImages.length <= 1) return;
        let nextIndex = currentGalleryIndex + direction;
        if (nextIndex >= activeGalleryImages.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = activeGalleryImages.length - 1;
        setCurrentGalleryIndex(nextIndex);
        const newSrc = activeGalleryImages[nextIndex];
        setLightboxSrc(newSrc);
        if (activeViewportId === 'view-level') setLevelViewSrc(newSrc);
        if (activeViewportId === 'view-army') setBdaViewSrc(newSrc);
        if (activeViewportId === 'view-casual') setCasualViewSrc(newSrc);
        if (activeViewportId === 'view-beanie') setBeanieViewSrc(newSrc);
    };

    const openSizeChartModal = (type: string) => {
        setSizeModalType(type);
        if (type === 'premium') {
            setSizeModalTitle("DOWN Premium Shirt Dimensions");
        } else if (type === 'bda') {
            setSizeModalTitle("Busy Dad Army Size Guide");
        } else {
            setSizeModalTitle("Level Progress Size Guide");
        }
        setIsSizeModalOpen(true);
    };

    const bypassGraduationLock = () => {
        const userInput = window.prompt("🔑 ENTER GRADUATE ACCESS CODE:\n\nThis item is reserved for verified graduates. Please enter your clearance code to proceed:");

        if (userInput === null) return;

        if (userInput.trim().toUpperCase() === "BDTGRAD2026") {
            setIsGraduationModalOpen(false);
            addItemToCart({
                id: `level-gear-G-backup-${levelSize.replace(/\s+/g, '')}`,
                name: "Graduated Progress Gear",
                price: 24.99,
                size: levelSize,
                viewSrc: '',
                supplierSku: `GD005-GOLD-${levelSize.split(' ')[0]}`
            });
        } else {
            window.alert("❌ INVALID CODE:\n\nThe code entered is incorrect. Access denied. If you have completed graduation requirements, please submit your video entry via email for manual review.");
        }
    };

    const cardStyle = {
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    };

    const inputStyle = {
        backgroundColor: '#090d1a',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        color: '#ffffff',
        width: '100%',
        padding: '12px 14px',
        fontSize: '0.90rem',
        outline: 'none',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.70rem',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: '6px',
    };

    const thumbnailContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        marginTop: '16px',
        flexWrap: 'wrap' as const,
        width: '100%'
    };

    const countryButtonStyle = {
        backgroundColor: '#0b1326',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '12px',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.2s ease',
    };

    const countryDropdownPanelStyle = {
        position: 'absolute' as const,
        top: 'calc(100% + 8px)',
        right: '0px',
        width: '230px',
        backgroundColor: '#15203b',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '14px',
        padding: '8px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
        zIndex: 999999,
    };

    const countryListScrollStyle = {
        maxHeight: '240px',
        overflowY: 'auto' as const,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '2px',
        paddingRight: '2px',
    };

    const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!isMounted) {
        return (
            <div className="w-full min-h-screen font-sans" style={{ backgroundColor: "#0b1326" }} />
        );
    }

    return (
        <div className="w-full min-h-screen text-[#dae2fd] flex flex-col justify-between animate-none" style={{ backgroundColor: "#0b1326" }}>

            <style jsx global>{`
                .custom-scroll::-webkit-scrollbar { width: 5px; }
                .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 8px; }
                .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 8px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
                
                button, select, input, option, [onClick] {
                    cursor: pointer !important;
                }
            `}</style>

            <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" strategy="afterInteractive" />
            <Header />

            <div
                style={{
                    paddingTop: "140px",
                    transition: 'opacity 0.4s ease',
                    opacity: isStoreReady ? 1 : 0
                }}
                className="w-full flex grow flex-col justify-between"
            >
                <div>
                    {/* Sub-header Bar */}
                    <div className="w-full border-b border-white/5 bg-[#0a0f1d]/40 backdrop-blur-md py-3 relative" style={{ zIndex: 40 }}>
                        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }} className="flex justify-end items-center w-full gap-4 relative">

                            {/* 📍 CUSTOM COUNTRY DROPDOWN */}
                            <div className="relative" ref={countryDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                    style={countryButtonStyle}
                                >
                                    <img
                                        src={`https://flagcdn.com/w20/${activeCountryObj.flag}.png`}
                                        alt=""
                                        style={{ width: '18px', height: '13px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
                                    />
                                    <span style={{ fontSize: '0.80rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap' }}>
                                        {activeCountryObj.name}
                                    </span>
                                    <span style={{ fontSize: '0.60rem', color: 'rgba(255, 255, 255, 0.4)', marginLeft: '2px' }}>▼</span>
                                </button>

                                {isCountryDropdownOpen && (
                                    <div style={countryDropdownPanelStyle}>
                                        <div style={countryListScrollStyle} className="custom-scroll">
                                            {PRINTFUL_COUNTRIES.map((c) => (
                                                <div
                                                    key={c.code}
                                                    onClick={() => handleSelectCountry(c.code)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '8px 10px',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        backgroundColor: selectedCountry === c.code ? 'rgba(59, 130, 246, 0.25)' : 'transparent',
                                                        color: selectedCountry === c.code ? '#60a5fa' : 'rgba(255, 255, 255, 0.85)',
                                                        transition: 'all 0.15s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        if (selectedCountry !== c.code) {
                                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                                                            e.currentTarget.style.color = '#ffffff';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (selectedCountry !== c.code) {
                                                            e.currentTarget.style.backgroundColor = 'transparent';
                                                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                                                        }
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                                                        <img
                                                            src={`https://flagcdn.com/w20/${c.flag}.png`}
                                                            alt=""
                                                            style={{ width: '18px', height: '13px', objectFit: 'cover', borderRadius: '2px', flexShrink: 0 }}
                                                        />
                                                        <span style={{ fontSize: '0.80rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                                                            {c.name}
                                                        </span>
                                                    </div>
                                                    {selectedCountry === c.code && (
                                                        <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 800, marginLeft: '8px', flexShrink: 0 }}>✓</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Shopping Bag Trigger Icon */}
                            <div onClick={(e) => { e.stopPropagation(); setIsCartOpen(!isCartOpen); }} className="relative inline-flex p-1 cursor-pointer items-center justify-center transition opacity hover:opacity-80" style={{ width: '42px', height: '42px' }}>
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 900, width: '20px', height: '20px', borderRadius: '50%', display: cartItemsCount > 0 ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                    {cartItemsCount}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }} className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch">

                            {/* Card 1: Level Progress Gear */}
                            <div style={cardStyle} className="transition hover:border-white/10 duration-200">
                                <div>
                                    <div onClick={() => openZoomModal('view-level', levelViewSrc, levelAssets)} className="relative bg-[#090d1a] h-[340px] w-full flex flex-col items-center justify-center overflow-hidden rounded-lg cursor-pointer border border-white/[0.02]">
                                        {levelViewSrc && !brokenImages[levelViewSrc] ? (
                                            <img src={levelViewSrc} alt="Level Progress" className="max-w-full max-h-full object-contain block" onError={() => handleImageError(levelViewSrc)} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 select-none">
                                                <div className="text-4xl opacity-[0.03] font-black tracking-widest">BDT</div>
                                                <div className="text-xs font-mono text-white/30 uppercase tracking-widest font-bold">Image Pending</div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={thumbnailContainerStyle}>
                                        {levelAssets.map((img) => !brokenImages[img] && (
                                            <img key={img} src={img} alt="Thumb" className={`rounded-lg object-contain cursor-pointer border transition ${img === levelViewSrc ? 'border-[#3b82f6] scale-105 opacity-100' : 'border-white/5 opacity-40'}`} style={{ width: '48px', height: '48px', backgroundColor: '#090d1a' }} onClick={() => setLevelViewSrc(img)} onError={() => handleImageError(img)} />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <div style={{ flexGrow: 1 }}>
                                        <div className="mb-6">
                                            <div className="flex justify-between items-baseline w-full">
                                                <h3 className="text-lg font-bold text-white tracking-tight">Level Progress Gear</h3>
                                                <span className="text-lg font-black text-white/90">{getRegionalPrice(24.99)}</span>
                                            </div>
                                            <p className="text-sm text-white/70 mt-3 leading-relaxed" style={{ paddingTop: '12px', paddingBottom: '20px' }}>
                                                The ultimate visual milestone tracker. Wear your progress with pride as you advance through the program.
                                            </p>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <label style={labelStyle}>SELECT CURRENT LEVEL</label>
                                                <select value={levelTarget} onChange={(e) => setLevelTarget(e.target.value)} style={inputStyle}>
                                                    {['1A', '1B', '1C', '1D', '2A', '2B', '3A', '3B', '4A', '4B', 'Graduated'].map(lvl => (
                                                        <option key={lvl} value={lvl}>{lvl === 'Graduated' ? 'Graduated' : `Level ${lvl}`}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label style={labelStyle}>GEAR STYLE</label>
                                                {!isUkOrder || ['3A', '3B', '4A', '4B'].includes(levelTarget) ? (
                                                    <div style={{ ...inputStyle, border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#090d1a' }} className="font-semibold text-white/80 select-none">
                                                        Standard Tee
                                                    </div>
                                                ) : (
                                                    <select value={garmentCut} onChange={(e) => setGarmentCut(e.target.value)} style={inputStyle}>
                                                        <option value="SHIRT">Standard Tee</option>
                                                        <option value="VEST">Vest/Tank</option>
                                                    </select>
                                                )}
                                            </div>

                                            <div>
                                                <label style={labelStyle}>FABRIC TYPE</label>
                                                {garmentCut === 'VEST' ? (
                                                    <div style={{ ...inputStyle, paddingRight: '14px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#090d1a' }} className="font-semibold text-blue-400 select-none">
                                                        135gsm Performance Poly
                                                    </div>
                                                ) : (
                                                    <select
                                                        value={fabricSpec}
                                                        onChange={(e) => setFabricSpec(e.target.value)}
                                                        style={{ ...inputStyle, color: '#ffffff' }}
                                                    >
                                                        <option value="COTTON" style={{ color: '#ffffff', backgroundColor: '#090d1a' }}>
                                                            190gsm 100% Pre-Shrunk Ringspun Cotton
                                                        </option>
                                                        <option value="PERF" style={{ color: '#ffffff', backgroundColor: '#090d1a' }}>
                                                            {selectedCountry === 'GB'
                                                                ? '135gsm Performance Poly'
                                                                : '186gsm 50/50 Cotton/Poly Blend'}
                                                        </option>
                                                    </select>
                                                )}
                                            </div>

                                            <div>
                                                <label style={labelStyle}>GRAPHIC LOGO STYLE</label>
                                                <select value={logoStyle} onChange={(e) => setLogoStyle(e.target.value)} style={inputStyle}>
                                                    <option value="ORIGINAL">Original Busy Dad Training</option>
                                                    <option value="BDT">BDT </option>
                                                </select>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label style={{ ...labelStyle, marginBottom: 0 }}>SELECT GARMENT SIZE</label>
                                                    <button onClick={() => openSizeChartModal('level')} className="text-xs font-bold text-[#3b82f6] hover:text-blue-400 hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1">📐 View Size Guide</button>
                                                </div>
                                                <select value={levelSize} onChange={(e) => setLevelSize(e.target.value)} style={inputStyle}>
                                                    {['Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)', '2XL'].map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleLevelShirtCartAction} style={levelTarget === 'Graduated' ? { background: 'linear-gradient(to right, #e65c00, #F93D2A, #ff8c00)' } : {}} className={levelTarget === 'Graduated' ? "w-full font-sans font-black text-white text-xs uppercase tracking-widest rounded-lg h-14 cursor-pointer border-0 shadow-[0_4px_15px_rgba(249,61,42,0.3)] transition hover:opacity-90" : "font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg w-full h-14 hover:bg-blue-500 transition shadow-[0_4px_14px_rgba(37,99,235,0.2)]"}>
                                        {levelTarget === 'Graduated' ? 'Claim Free Graduation Shirt' : 'Add To Bag'}
                                    </button>
                                </div>
                            </div>

                            {/* Card 2: Busy Dad Army Shirt */}
                            <div style={cardStyle} className="transition hover:border-white/10 duration-200">
                                <div>
                                    <div onClick={() => openZoomModal('view-army', bdaViewSrc, bdaAssets)} className="relative bg-[#090d1a] h-[340px] w-full flex flex-col items-center justify-center overflow-hidden rounded-lg cursor-pointer border border-white/[0.02]">
                                        {bdaViewSrc && !brokenImages[bdaViewSrc] ? (
                                            <img src={bdaViewSrc} alt="Busy Dad Army Shirt" className="max-w-full max-h-full object-contain block" onError={() => handleImageError(bdaViewSrc)} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 select-none">
                                                <div className="text-4xl opacity-[0.03] font-black tracking-widest">BDT</div>
                                                <div className="text-xs font-mono text-white/30 uppercase tracking-widest font-bold">Image Pending</div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={thumbnailContainerStyle}>
                                        {bdaAssets.map((img) => !brokenImages[img] && (
                                            <img key={img} src={img} alt="Thumb" className={`rounded-lg object-contain cursor-pointer border transition ${img === bdaViewSrc ? 'border-[#3b82f6] scale-105 opacity-100' : 'border-white/5 opacity-40'}`} style={{ width: '48px', height: '48px', backgroundColor: '#090d1a' }} onClick={() => setBdaViewSrc(img)} onError={() => handleImageError(img)} />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <div style={{ flexGrow: 1 }}>
                                        <div className="mb-6">
                                            <div className="flex justify-between items-baseline w-full">
                                                <h3 className="text-lg font-bold text-white tracking-tight">The Busy Dad Army Shirt</h3>
                                                <span className="text-lg font-black text-white/90">{getRegionalPrice(29.99)}</span>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1">Customization Included</p>
                                            <p className="text-sm text-white/70 mt-3 leading-relaxed" style={{ paddingTop: '16px', paddingBottom: '20px' }}>Official uniform of the global collective. Get your name stamped and represent the army.</p>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <label style={labelStyle}>CUSTOM IDENTITY TEXT</label>
                                                <input type="text" value={bdaName} onChange={(e) => setBdaName(e.target.value)} placeholder="Enter Name or Initials (e.g. M.Edwards)" style={inputStyle} />
                                            </div>
                                            <div>
                                                <label style={labelStyle}>RANKING BADGE</label>
                                                <select value={bdaBadge} onChange={(e) => setBdaBadge(e.target.value)} style={inputStyle}>
                                                    <option value="PRACTITIONER">Practitioner</option>
                                                    <option value="1A_PRACTITIONER">Level 1A Practitioner</option>
                                                    <option value="1B_PRACTITIONER">Level 1B Practitioner</option>
                                                    <option value="1C_PRACTITIONER">Level 1C Practitioner</option>
                                                    <option value="1D_PRACTITIONER">Level 1D Practitioner</option>
                                                    <option value="2A_PRACTITIONER">Level 2A Practitioner</option>
                                                    <option value="2B_PRACTITIONER">Level 2B Practitioner</option>
                                                    <option value="3A_PRACTITIONER">Level 3A Practitioner</option>
                                                    <option value="3B_PRACTITIONER">Level 3B Practitioner</option>
                                                    <option value="4A_PRACTITIONER">Level 4A Practitioner</option>
                                                    <option value="4B_PRACTITIONER">Level 4B Practitioner</option>
                                                    <option value="GRADUATED_PRACTITIONER">G Practitioner</option>
                                                </select>
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label style={{ ...labelStyle, marginBottom: 0 }}>SELECT GARMENT SIZE</label>
                                                    <button onClick={() => openSizeChartModal('bda')} className="text-xs font-bold text-[#3b82f6] hover:text-blue-400 hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1">📐 View Size Guide</button>
                                                </div>
                                                <select value={bdaSize} onChange={(e) => setBdaSize(e.target.value)} style={inputStyle}>
                                                    {['Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)', '2XL'].map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handleBdaCartAction} className="font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg h-14 hover:bg-blue-500 transition shadow-[0_4px_14px_rgba(37,99,235,0.2)]">Add Custom Order</button>
                                </div>
                            </div>

                            {/* Card 3: DOWN Casual Premium Tee */}
                            <div style={cardStyle} className="transition hover:border-white/10 duration-200">
                                <div>
                                    <div onClick={() => openZoomModal('view-casual', casualViewSrc, casualAssets)} className="relative bg-[#090d1a] h-[340px] w-full flex flex-col items-center justify-center overflow-hidden rounded-lg cursor-pointer border border-white/[0.02]">
                                        {casualViewSrc && !brokenImages[casualViewSrc] ? (
                                            <img src={casualViewSrc} alt="DOWN Casual Premium Tee" className="max-w-full max-h-full object-contain block" onError={() => handleImageError(casualViewSrc)} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 select-none">
                                                <div className="text-4xl opacity-[0.03] font-black tracking-widest">BDT</div>
                                                <div className="text-xs font-mono text-white/30 uppercase tracking-widest font-bold">Image Pending</div>
                                            </div>
                                        )}
                                    </div>
                                    <div style={thumbnailContainerStyle}>
                                        {casualAssets.map((img) => !brokenImages[img] && (
                                            <img key={img} src={img} alt="Thumb" className={`rounded-md object-contain cursor-pointer border transition ${img === casualViewSrc ? 'border-[#3b82f6] scale-105 opacity-100' : 'border-white/5 opacity-40'}`} style={{ width: '44px', height: '44px', backgroundColor: '#090d1a' }} onClick={() => setCasualViewSrc(img)} onError={() => handleImageError(img)} />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                    <div style={{ flexGrow: 1 }}>
                                        <div className="mb-6">
                                            <div className="flex justify-between items-baseline w-full">
                                                <h3 className="text-lg font-bold text-white tracking-tight">DOWN Casual Premium Tee</h3>
                                                <span className="text-lg font-black text-white/90">{getRegionalPrice(29.99)}</span>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1">Premium Organic Cotton</p>
                                            <p className="text-sm text-white/70 mt-3 leading-relaxed" style={{ paddingTop: '16px', paddingBottom: '20px' }}>100% Organic compact ringspun cotton single Jersey (180gsm). A higher quality, premium shirt with a comfortable medium weight feel.</p>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label style={{ ...labelStyle, marginBottom: 0 }}>SELECT GARMENT SIZE</label>
                                                    <button onClick={() => openSizeChartModal('premium')} className="text-xs font-bold text-[#3b82f6] hover:text-blue-400 hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1">📐 View Size Guide</button>
                                                </div>
                                                <select value={casualSize} onChange={(e) => setCasualSize(e.target.value)} style={inputStyle}>
                                                    {['Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)', '2XL'].map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handlePremiumDropCartAction} className="font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg h-14 hover:bg-blue-500 transition shadow-[0_4px_14px_rgba(37,99,235,0.2)]">Add To Bag</button>
                                </div>
                            </div>

                            {/* Card 4: Official BDT Headwear (UK-ONLY EXCLUSIVE) */}
                            {isUkOrder && (
                                <div style={cardStyle} className="transition hover:border-white/10 duration-200">
                                    <div>
                                        <div onClick={() => openZoomModal('view-beanie', beanieViewSrc, beanieAssets)} className="relative bg-[#090d1a] h-[340px] w-full flex flex-col items-center justify-center overflow-hidden rounded-lg cursor-pointer border border-white/[0.02]">
                                            {beanieViewSrc && !brokenImages[beanieViewSrc] ? (
                                                <img src={beanieViewSrc} alt="BDT Headwear" className="max-w-full max-h-full object-contain block" onError={() => handleImageError(beanieViewSrc)} />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center space-y-2 text-center p-4 select-none">
                                                    <div className="text-4xl opacity-[0.03] font-black tracking-widest">BDT</div>
                                                    <div className="text-xs font-mono text-white/30 uppercase tracking-widest font-bold">Image Pending</div>
                                                </div>
                                            )}
                                        </div>
                                        <div style={thumbnailContainerStyle}>
                                            {beanieAssets.map((img) => !brokenImages[img] && (
                                                <img key={img} src={img} alt="Thumb" className={`rounded-md object-contain cursor-pointer border transition ${img === beanieViewSrc ? 'border-[#3b82f6] scale-105 opacity-100' : 'border-white/5 opacity-40'}`} style={{ width: '44px', height: '44px', backgroundColor: '#090d1a' }} onClick={() => setBeanieViewSrc(img)} onError={() => handleImageError(img)} />
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <div style={{ flexGrow: 1 }}>
                                            <div className="mb-6">
                                                <div className="flex justify-between items-baseline w-full">
                                                    <h3 className="text-lg font-bold text-white tracking-tight">Official BDT Headwear</h3>
                                                    <span className="text-lg font-black text-white/90">
                                                        {beanieTier === 'NONE' ? `${getRegionalPrice(14.00)} - ${getRegionalPrice(18.00)}` : beanieTier === 'PREM' ? getRegionalPrice(18.00) : getRegionalPrice(14.00)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white/70 mt-3 leading-relaxed" style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                                                    {beanieTier === 'PREM'
                                                        ? 'Soft-touch double layer loose knit "Thinsulate" beanie that includes a thermal Thinsulate™ lining and offers plenty of warmth for chilly temperatures.'
                                                        : beanieTier === 'STD'
                                                            ? 'Double layered original tight knit beanie.'
                                                            : 'Keep your bonce warm'}
                                                </p>
                                            </div>
                                            <div className="space-y-4 mb-6">
                                                <div>
                                                    <label style={labelStyle}>SELECT BEANIE TYPE</label>
                                                    <select value={beanieTier} onChange={(e) => setBeanieTier(e.target.value)} style={inputStyle}>
                                                        <option value="NONE">-- Choose Beanie Variant --</option>
                                                        <option value="STD">Original Tight Knit Beanie ({getRegionalPrice(14.00)})</option>
                                                        <option value="PREM">Loose-knit Thinsulate beanie ({getRegionalPrice(18.00)})</option>
                                                    </select>
                                                </div>

                                                {beanieTier !== 'NONE' && (
                                                    <>
                                                        <div>
                                                            <label style={labelStyle}>GRAPHIC LOGO STYLE</label>
                                                            <select value={beanieLogoStyle} onChange={(e) => setBeanieLogoStyle(e.target.value)} style={inputStyle}>
                                                                <option value="ORIGINAL">Original Busy Dad Training</option>
                                                                <option value="BDT">BDT</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label style={labelStyle}>SELECT COLOUR</label>
                                                            <select value={beanieColor} onChange={(e) => setBeanieColor(e.target.value)} style={inputStyle}>
                                                                {beanieTier === 'STD' ? (
                                                                    <>
                                                                        <option value="BLACK">Black</option>
                                                                        <option value="WHITE">White</option>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <option value="GRAPHITE">Graphite Grey</option>
                                                                        <option value="BLACK">Black</option>
                                                                    </>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={handleBeanieCartAction} className="font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg h-14 hover:bg-blue-500 transition shadow-[0_4px_14px_rgba(37,99,235,0.2)]">Add To Bag</button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {/* Slide-out Cart Panel Container */}
            <div
                ref={miniBagRef}
                onMouseEnter={() => setIsHoveringBag(true)}
                onMouseLeave={() => setIsHoveringBag(false)}
                style={{
                    position: 'fixed',
                    top: '110px',
                    right: '24px',
                    boxShadow: '0 35px 80px rgba(0,0,0,0.85)',
                    zIndex: 999999,
                    padding: '30px 24px 26px 24px',
                    width: 'calc(100vw - 32px)',
                    maxHeight: '70vh',
                    backgroundColor: '#15203b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transitionProperty: 'all',
                    transitionDuration: '400ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    display: isStoreReady ? 'flex' : 'none'
                }}
                className={`rounded-xl flex flex-col justify-between custom-scroll md:max-w-[410px] overflow-y-auto transform transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">Your Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h4>
                        <button onClick={() => setIsCartOpen(false)} style={{ cursor: 'pointer' }} className="text-xs text-white/40 hover:text-white bg-transparent border-0 font-bold">CLOSE ✕</button>
                    </div>

                    {cart.length === 0 ? (
                        <div style={{ paddingTop: '48px', paddingBottom: '48px' }} className="text-center text-sm text-white/30 font-medium w-full">Your shopping bag is currently empty.</div>
                    ) : (
                        <div style={{ paddingTop: '24px', paddingBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        {item.viewSrc && !brokenImages[item.viewSrc] && !item.id.includes('backup') ? (
                                            <img
                                                src={item.viewSrc}
                                                alt={item.name}
                                                onError={() => handleImageError(item.viewSrc || '')}
                                                className="w-16 h-16 object-contain rounded bg-black/40 border border-white/5 flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-white/5 rounded flex flex-col items-center justify-center text-[10px] font-mono text-white/30 font-black tracking-tighter border border-white/5 flex-shrink-0">
                                                BDT
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-xs font-bold text-white leading-tight">{item.name}</p>

                                            <p className="text-[11px] text-white/50 mt-1 font-medium">
                                                Size: {item.size} {item.quantity > 1 ? `| Qty: ${item.quantity}` : ''}
                                            </p>

                                            {item.garmentCut && (
                                                <p className="text-[10px] text-white/40 mt-0.5 font-sans">
                                                    Style: {item.garmentCut === 'VEST' ? 'Vest/Tank' : 'Standard Tee'}
                                                    {item.fabricSpec ? ` | ${item.fabricSpec === 'PERF' ? (selectedCountry === 'GB' ? 'Performance Poly' : '50/50 Blend') : 'Cotton'}` : ''}
                                                </p>
                                            )}
                                            {item.logoStyle && (
                                                <p className="text-[10px] text-white/40 mt-0.5 font-sans">Logo: {item.logoStyle}</p>
                                            )}
                                            {item.badgeRank && (
                                                <p className="text-[10px] text-white/40 mt-0.5 font-sans font-medium">Rank: {item.badgeRank.replace(/_/g, ' ')}</p>
                                            )}
                                            {item.customText && (
                                                <p className="text-[10px] text-blue-400 font-mono mt-0.5 font-bold uppercase tracking-wide">ID: {item.customText}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-3">
                                        <div>
                                            <p className="text-xs font-black text-white">{getRegionalPrice(item.price * item.quantity)}</p>
                                            {item.quantity > 1 && (
                                                <p className="text-[10px] text-white/40 font-mono mt-0.5">({item.quantity} × {getRegionalPrice(item.price)})</p>
                                            )}
                                        </div>
                                        <button onClick={() => removeCartItem(item.id)} style={{ cursor: 'pointer' }} className="text-xs text-red-400/50 hover:text-red-400 bg-transparent border-0 p-1">✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="pt-5 border-t border-white/5">
                        <div className="flex justify-between items-baseline mb-5">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Subtotal:</span>
                            <span className="text-lg font-black text-white">{getRegionalPrice(cartSubtotal)}</span>
                        </div>
                        <button
                            onClick={handleCheckoutRedirect}
                            disabled={isProcessingCheckout}
                            style={{ cursor: isProcessingCheckout ? 'wait' : 'pointer' }}
                            className="w-full font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg h-12 hover:bg-blue-500 transition border-0 shadow-lg disabled:opacity-50"
                        >
                            {/* 🎯 REFINED BUTTON TEXT */}
                            {isProcessingCheckout ? 'Calculating Shipping...' : 'Proceed to Checkout'}
                        </button>
                        {cart.some(item => (item as any).holdForReview) && (
                            <p className="text-[11px] text-amber-400 font-medium leading-normal mt-3 text-center px-2">
                                ⚠️ NOTE: Because your bag contains unverified Graduation Gear, your entire order will be held in review until your graduation video is manually approved by Max.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Lightbox Overlays */}
            {isLightboxOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] flex items-center justify-center p-4" onClick={() => setIsLightboxOpen(false)} style={{ cursor: 'zoom-out' }}>
                    <button onClick={(e) => navigateLightbox(-1, e)} className="absolute left-4 text-white bg-black/40 hover:bg-white/20 text-2xl font-bold w-12 h-16 rounded-lg border-0 cursor-pointer">◀</button>
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <img src={lightboxSrc} alt="Zoom View" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                    </div>
                    <button onClick={(e) => navigateLightbox(1, e)} className="absolute right-4 text-white bg-black/40 hover:bg-white/20 text-2xl font-bold w-12 h-16 rounded-lg border-0 cursor-pointer">▶</button>
                </div>
            )}

            {/* Size Charts Modals */}
            {isSizeModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4" onClick={() => setIsSizeModalOpen(false)}>
                    <div className="bg-[#0b1326] border border-white/10 rounded-2xl max-w-md w-full p-6 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsSizeModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg bg-transparent border-0 cursor-pointer">✕</button>
                        <h4 className="text-lg font-black text-white uppercase tracking-tight mb-4 text-center">{sizeModalTitle}</h4>
                        <div className="overflow-hidden border border-white/10 rounded-xl bg-black/20">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-white/5 text-[#b6c4ff] font-bold border-b border-white/10">
                                        <th className="p-3">Tag Size</th>
                                        <th className="p-3">To Fit Chest (Inches)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 divide-y divide-white/10">
                                    {(sizeModalType === 'premium' ? premiumSizeRows : standardSizeRows).map(row => (
                                        <tr key={row.tag}>
                                            <td className="p-3 font-mono text-[#b6c4ff]">{row.tag}</td>
                                            <td className="p-3">{row.fit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Graduation Modal */}
            {isGraduationModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4" onClick={() => setIsGraduationModalOpen(false)}>
                    <div className="bg-[#0b1326] border border-white/10 rounded-2xl w-full max-w-[540px] relative shadow-2xl flex flex-col items-center text-center animate-none" style={{ padding: '40px 32px' }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setIsGraduationModalOpen(false)} className="absolute top-5 right-5 text-white/30 hover:text-white transition font-light text-xl bg-transparent border-0 cursor-pointer p-1">✕</button>

                        <div className="relative flex items-center justify-center flex-shrink-0" style={{ marginBottom: '24px', width: '48px', height: '48px' }}>
                            <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="url(#modalCapGradient)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_4px_10px_rgba(99,102,241,0.25)]">
                                <defs>
                                    <linearGradient id="modalCapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#a5b4fc" />
                                        <stop offset="60%" stopColor="#818cf8" />
                                        <stop offset="100%" stopColor="#c084fc" />
                                    </linearGradient>
                                </defs>
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                            </svg>
                        </div>

                        <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider font-sans text-center" style={{ letterSpacing: "0.04em", marginBottom: '24px' }}>Earning Your Graduation Gear</h4>

                        <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-[440px] mx-auto text-center" style={{ marginBottom: '28px' }}>
                            The Graduation Level garment cannot be casually purchased. Your first official piece is <span className="text-white font-extrabold">100% free</span>, provided as a badge of completion.
                        </p>

                        <div className="bg-[#050914] border border-white/5 rounded-xl text-left text-xs md:text-[13px] space-y-4 w-full shadow-inner" style={{ padding: '24px 20px', marginBottom: '24px' }}>
                            <div>
                                <p className="font-extrabold text-[#ffa085] uppercase tracking-wider text-[11px]" style={{ letterSpacing: "0.06em", marginBottom: '6px' }}>SUBMISSION RULE REQUIREMENT:</p>
                                <p className="leading-relaxed text-white/80 font-sans">• You must film a continuous, uncut 6-count workout video **plus** another continuous, uncut Navy Seal workout video, both recorded within the same week, proving you have achieved full graduation metrics (325 6-Counts AND 150 Navy Seals).</p>
                            </div>
                            <div className="pt-3 border-t border-white/5">
                                <p className="leading-relaxed text-white/80 font-sans font-medium">
                                    • Your submission files will be personally reviewed by Max. Once verified, your order will be approved and production will commence.
                                </p>
                            </div>
                        </div>

                        <div className="w-full text-left bg-white/[0.02] border border-white/10 rounded-xl flex items-start gap-3.5 transition-all duration-200" style={{ padding: '16px', marginBottom: '24px', borderColor: gradDeclaration ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255,255,255,0.1)' }}>
                            <input
                                type="checkbox"
                                id="gradCertify"
                                checked={gradDeclaration}
                                onChange={(e) => setGradDeclaration(e.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-white/20 bg-[#050912] text-blue-600 focus:ring-0 cursor-pointer"
                            />
                            <label htmlFor="gradCertify" className="text-xs text-white/70 leading-normal font-sans select-none cursor-pointer">
                                <strong className="text-white block mb-0.5 font-semibold">I certify my graduation metrics are real</strong>
                                I have completed the graduation level 6 counts & navy seals and understand that my order will be cancelled if I fail to provide verifiable video proof.
                            </label>
                        </div>

                        <div className="text-left w-full flex flex-col" style={{ marginBottom: '32px' }}>
                            <label className="block text-[9px] font-bold uppercase text-white/40 tracking-widest mb-2.5" style={{ letterSpacing: "0.06em" }}>
                                PASTE ACCESS LINK (YOUTUBE, DROPBOX, GOOGLE DRIVE, WETRANSFER, ETC.)
                            </label>
                            <input
                                type="url"
                                value={gradVideoUrl}
                                onChange={(e) => setGradVideoUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-[#050912] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500/50"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button
                                onClick={triggerGraduationEmail}
                                disabled={!gradDeclaration}
                                style={{
                                    backgroundColor: gradDeclaration ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                                    color: gradDeclaration ? 'white' : 'rgba(255,255,255,0.2)',
                                    fontWeight: 'bold',
                                    paddingTop: '16px',
                                    paddingBottom: '16px',
                                    borderRadius: '12px',
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.03em',
                                    cursor: gradDeclaration ? 'pointer' : 'not-allowed',
                                    border: '0',
                                    flex: 1,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Add Free Shirt to Bag
                            </button>
                            <button onClick={bypassGraduationLock} style={{ backgroundColor: 'transparent', color: 'rgba(255,255,255,0.7)', fontWeight: 'bold', paddingTop: '16px', paddingBottom: '16px', borderRadius: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.03em', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>I Am Already Confirmed (Buy Backup)</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
                    <div className="bg-[#0b1326] border border-white/10 rounded-2xl w-full max-w-sm relative shadow-2xl flex flex-col items-center text-center" style={{ padding: '44px 32px' }}>
                        <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center text-3xl border border-green-500/20 animate-pulse" style={{ marginBottom: '28px' }}>✓</div>
                        <h4 className="text-xl font-black text-white uppercase tracking-wider" style={{ marginBottom: '14px' }}>Order Confirmed!</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-sans" style={{ marginBottom: '36px' }}>A confirmation email has been sent to your inbox.</p>
                        <button onClick={() => setShowSuccessModal(false)} className="font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg w-44 h-14 hover:bg-blue-500 transition shadow-[0_4px_14px_rgba(37,99,235,0.2)]">Continue</button>
                    </div>
                </div>
            )}

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
                    <div className="bg-[#0b1326] border border-white/10 rounded-2xl w-full max-w-sm relative shadow-2xl flex flex-col items-center text-center" style={{ padding: '44px 32px' }}>
                        <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center text-2xl border border-amber-500/20" style={{ marginBottom: '28px' }}>✕</div>
                        <h4 className="text-xl font-black text-white uppercase tracking-wider" style={{ marginBottom: '14px' }}>Checkout Cancelled</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-sans" style={{ marginBottom: '36px' }}>Your session transaction was aborted, but your shopping bag has been saved safely. Ready when you are!</p>
                        <button onClick={() => setShowCancelModal(false)} className="font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-white/10 rounded-lg w-44 h-14 hover:bg-white/20 transition">Return</button>
                    </div>
                </div>
            )}
        </div>
    );
}