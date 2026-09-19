'use client';
import Script from 'next/script';
import React, { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export default function ShopPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isHoveringBag, setIsHoveringBag] = useState(false);
    const [isStoreReady, setIsStoreReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsStoreReady(true), 250);
        return () => clearTimeout(timer);
    }, []);

    const miniBagRef = useRef<HTMLDivElement>(null);

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

    // Beanie Configuration States
    const [beanieTier, setBeanieTier] = useState('NONE');
    const [beanieColor, setBeanieColor] = useState('BLACK');

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
        { tag: 'XS', fit: '34 - 36"' },
        { tag: 'S', fit: '36 - 38"' },
        { tag: 'M', fit: '38 - 40"' },
        { tag: 'L', fit: '41 - 43"' },
        { tag: 'XL', fit: '43 - 45"' },
        { tag: '2XL', fit: '46 - 47"' },
    ];

    // Enforce Reactive Form Constraints: If Vest/Tank is selected, lock fabric to performance poly
    useEffect(() => {
        if (garmentCut === 'VEST') {
            setFabricSpec('PERF');
        }
    }, [garmentCut]);

    // If Fabric Type is set back to Cotton manually, snap the style selection back to standard shirt profile
    useEffect(() => {
        if (fabricSpec === 'COTTON' && garmentCut === 'VEST') {
            setGarmentCut('SHIRT');
        }
    }, [fabricSpec, garmentCut]);

    // Ensure colors align seamlessly when hat silhouettes swap out
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

    // Level Assets Core Synchronizer Loop
    useEffect(() => {
        const prefix = levelTarget.replace(/\s*\(.*?\)\s*/g, "").trim();
        const parts = [prefix];
        if (logoStyle === "BDT") parts.push("BDT");
        if (fabricSpec === "PERF") parts.push("perf");
        if (garmentCut === "VEST") parts.push("vest");
        const prefixString = parts.join("_").replace(/__+/g, '_');

        const mockImages = [
            `/images/${prefixString}_1.jpg`,
            `/images/${prefixString}_2.jpg`,
            `/images/${prefixString}_3.jpg`,
            `/images/${prefixString}_4.jpg`
        ];
        setLevelAssets(mockImages);
        setLevelViewSrc(mockImages[0]);
    }, [levelTarget, logoStyle, fabricSpec, garmentCut]);

    // BDA & Casual Static Array Builders
    useEffect(() => {
        const mockBda = ['/images/BDA_1.jpg', '/images/BDA_2.jpg', '/images/BDA_3.jpg', '/images/BDA_4.jpg', '/images/BDA_5.jpg'];
        setBdaAssets(mockBda);
        setBdaViewSrc(mockBda[0]);

        const mockCasual = ['/images/casual_1.jpg', '/images/casual_2.jpg', '/images/casual_3.jpg', '/images/casual_4.jpg'];
        setCasualAssets(mockCasual);
        setCasualViewSrc(mockCasual[0]);
    }, []);

    // Beanie Asset Configuration Matrices
    useEffect(() => {
        if (beanieTier === 'NONE') {
            const fallbackList = ['/images/beanies_1.jpg', '/images/beanies_2.jpg'];
            setBeanieAssets(fallbackList);
            setBeanieViewSrc(fallbackList[0]);
        } else {
            const prefix = beanieTier === 'PREM' ? 'beanie_prem' : 'beanie_std';
            const contextualImages = [
                `/images/${prefix}_1.jpg`,
                `/images/${prefix}_2.jpg`,
                `/images/${prefix}_3.jpg`
            ];
            setBeanieAssets(contextualImages);
            setBeanieViewSrc(contextualImages[0]);
        }
    }, [beanieTier, beanieColor]);

    const handleImageError = (src: string) => {
        setBrokenImages(prev => ({ ...prev, [src]: true }));
    };

    const triggerGraduationEmail = () => {
        let body = `Hi Max,\n\nI have successfully completed the Graduation Tier parameters. My size is ${levelSize}.\n`;
        if (gradVideoUrl.trim() !== "") {
            body += `\nMy verification link: ${encodeURIComponent(gradVideoUrl.trim())}\n`;
        } else {
            body += "\n[Attach continuous video link here]\n";
        }
        window.location.href = `mailto:max@busydadtraining.com?subject=Graduation%20Verification%20Submission&body=${encodeURIComponent(body)}`;
    };

    const handleLevelShirtCartAction = () => {
        if (levelTarget === "Graduated") {
            setIsGraduationModalOpen(true);
        } else {
            const prefix = levelTarget.replace(/\s*\(.*?\)\s*/g, "").trim();
            const parts = [prefix];
            if (logoStyle === "BDT") parts.push("BDT");
            if (fabricSpec === "PERF") parts.push("perf");
            if (garmentCut === "VEST") parts.push("vest");
            const finalPrefix = parts.join("_").replace(/__+/g, '_');

            let generatedSku = fabricSpec === 'COTTON' ? 'GD005-PURPLE' : 'JC001-ELECTRIC-GREEN';
            if (garmentCut === 'VEST') generatedSku = 'JC015-ELECTRIC-GREEN';

            addItemToCart({
                id: `lvl-${levelTarget}-${logoStyle}-${fabricSpec}-${garmentCut}-${levelSize.replace(/\s+/g, '')}`,
                name: `Level Progress Gear (Level ${levelTarget})`,
                price: 29,
                size: levelSize,
                viewSrc: `/images/${finalPrefix}_1.jpg`,
                logoStyle,
                fabricSpec,
                garmentCut,
                supplierSku: `${generatedSku}-${levelSize.split(' ')[0]}`
            });
        }
    };

    const handleBdaCartAction = () => {
        const textStamped = bdaName.trim() === "" ? "None Stamped" : bdaName.trim();
        addItemToCart({
            id: `bda-${bdaBadge}-${bdaSize.replace(/\s+/g, '')}-${textStamped.replace(/\s+/g, '')}`,
            name: "The Busy Dad Army Shirt",
            price: 35,
            size: bdaSize,
            viewSrc: bdaAssets[0],
            badgeRank: bdaBadge,
            customText: textStamped,
            supplierSku: `GD005-MILITARY-GREEN-${bdaSize.split(' ')[0]}`
        });
    };

    const handlePremiumDropCartAction = () => {
        addItemToCart({
            id: `casual-${casualSize.replace(/\s+/g, '')}`,
            name: "DOWN Casual Premium Tee",
            price: 35,
            size: casualSize,
            viewSrc: '/images/casual_1.jpg',
            supplierSku: `SX001-ORGANIC-BLACK-${casualSize.split(' ')[0]}`
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

        const finalPrice = beanieTier === 'PREM' ? 18 : 14;
        const imgFallback = beanieTier === 'PREM' ? "/images/beanie_prem_1.jpg" : "/images/beanie_std_1.jpg";

        addItemToCart({
            id: `beanie-${beanieTier}-${beanieColor}`,
            name: finalTitle,
            price: finalPrice,
            size: `One Size (${beanieColor})`,
            viewSrc: imgFallback,
            supplierSku: `BC-${beanieTier}-${beanieColor}`,
            colorVariant: beanieColor
        });
    };

    const handleCheckoutRedirect = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(`❌ Checkout Generation Refused: ${data.error || 'Unknown parameter exception.'}`);
            }
        } catch (error) {
            console.error('Frontend Checkout Handshake Exception:', error);
            alert('❌ Failed to establish link communication with the payment processing systems.');
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
        setIsGraduationModalOpen(false);
        addItemToCart({
            id: `level-gear-G-backup-${levelSize.replace(/\s+/g, '')}`,
            name: "Graduated Progress Gear",
            price: 29,
            size: levelSize,
            viewSrc: '',
            supplierSku: `GD005-GOLD-${levelSize.split(' ')[0]}`
        });
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
                        .custom-scroll::-webkit-scrollbar { width: 6px; }
                        .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.01); border-radius: 8px; }
                        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.12); border-radius: 8px; }
                        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.25); }
                        
                        /* Centering alignment cushion for the free shipping ribbon text */
                        .tracking-widest.font-sans {
                            padding-top: 5px !important;
                            padding-bottom: 3px !important;
                        }
                        
                        /* Hard override forcing pointer hand cursors on all interactive triggers */
                        button, select, input, option, [onClick] {
                            cursor: pointer !important;
                        }
                    `}</style>



            <div
                className="w-full bg-[#070b16] border-b border-white/[0.03] text-center py-2 relative"
                style={{
                    zIndex: 60,
                    transition: 'opacity 0.4s ease',
                    opacity: isStoreReady ? 1 : 0
                }}
            >
                <p className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-widest font-sans" style={{ letterSpacing: '0.15em' }}>
                    📦 Free shipping on all orders
                </p>
            </div>


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
                    <div className="w-full border-b border-white/5 bg-[#0a0f1d]/40 backdrop-blur-md py-4 relative" style={{ zIndex: 40 }}>
                        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }} className="flex justify-end items-center w-full gap-6 relative">
                            <button onClick={() => alert('🔒 Connecting platform authentication components...')} className="font-sans font-semibold text-white tracking-wide border border-white/10 px-5 py-2 rounded-lg bg-[#0b1326] cursor-pointer transition hover:bg-white/5" style={{ fontSize: "0.80rem", letterSpacing: "0.03em" }}>
                                LOG IN / SIGN UP
                            </button>

                            <div onClick={(e) => { e.stopPropagation(); setIsCartOpen(!isCartOpen); }} className="relative inline-flex p-1 cursor-pointer items-center justify-center transition opacity hover:opacity-80" style={{ width: '42px', height: '42px' }}>
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                                <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: '#ef4444', color: 'white', fontSize: '11px', fontWeight: 900, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
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
                                                <span className="text-lg font-black text-white/90">£29</span>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1">Shipping Included</p>
                                            <p className="text-sm text-white/70 mt-3 leading-relaxed" style={{ paddingTop: '16px', paddingBottom: '20px' }}>The ultimate visual milestone tracker. Vests are available currently for Level 1, Level 2, and Graduation tiers in performance fabrics.</p>
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
                                                <select value={garmentCut} onChange={(e) => setGarmentCut(e.target.value)} style={inputStyle}>
                                                    <option value="SHIRT">Standard Tee</option>
                                                    {['1A', '1B', '1C', '1D', '2A', '2B', 'Graduated'].includes(levelTarget) && (
                                                        <option value="VEST">Vest/Tank</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div>
                                                <label style={labelStyle}>FABRIC TYPE</label>
                                                {garmentCut === 'VEST' ? (
                                                    <div style={{ ...inputStyle, paddingRight: '14px', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#090d1a' }} className="font-semibold text-blue-400 select-none">
                                                        135gsm Performance Poly
                                                    </div>
                                                ) : (
                                                    <select value={fabricSpec} onChange={(e) => setFabricSpec(e.target.value)} style={inputStyle}>
                                                        <option value="COTTON">190gsm 100% Pre-Shrunk Ringspun Cotton</option>
                                                        <option value="PERF">135gsm Performance Poly</option>
                                                    </select>
                                                )}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>GRAPHIC LOGO STYLE</label>
                                                <select value={logoStyle} onChange={(e) => setLogoStyle(e.target.value)} style={inputStyle}>
                                                    <option value="ORIGINAL">Original Busy Dad Training Variant</option>
                                                    <option value="BDT">BDT Crest Variant (Non-Dad Alternative)</option>
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
                                                <span className="text-lg font-black text-white/90">£35</span>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1">Customization & Shipping Included</p>
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
                                                <span className="text-lg font-black text-white/90">£35</span>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1">Shipping Included</p>
                                            <p className="text-sm text-white/70 mt-3 leading-relaxed" style={{ paddingTop: '16px', paddingBottom: '20px' }}>100% Organic compact ringspun cotton single Jersey (180gsm). A higher quality, premium shirt with a comfortable medium weight feel.</p>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <label style={{ ...labelStyle, marginBottom: 0 }}>SELECT GARMENT SIZE</label>
                                                    <button onClick={() => openSizeChartModal('premium')} className="text-xs font-bold text-[#3b82f6] hover:text-blue-400 hover:underline bg-transparent border-0 cursor-pointer flex items-center gap-1">📐 View Size Guide</button>
                                                </div>
                                                <select value={casualSize} onChange={(e) => setCasualSize(e.target.value)} style={inputStyle}>
                                                    {['XS', 'Small (S)', 'Medium (M)', 'Large (L)', 'Extra Large (XL)', '2XL'].map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={handlePremiumDropCartAction} className="font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg h-14 hover:bg-blue-500 transition shadow-[0_4px_14px_rgba(37,99,235,0.2)]">Add To Bag</button>
                                </div>
                            </div>

                            {/* Card 4: Official BDT Headwear */}
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
                                                    {beanieTier === 'NONE' ? '£14 - £18' : beanieTier === 'PREM' ? '£18' : '£14'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1">Shipping Included</p>
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
                                                    <option value="STD">Original Tight Knit Beanie (£14)</option>
                                                    <option value="PREM">Loose-knit Thinsulate beanie (£18)</option>
                                                </select>
                                            </div>
                                            {beanieTier !== 'NONE' && (
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
                                            )}
                                        </div>
                                    </div>
                                    <button onClick={handleBeanieCartAction} className="font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg h-14 hover:bg-blue-500 transition shadow-[0_4px_14px_rgba(37,99,235,0.2)]">Add To Bag</button>
                                </div>
                            </div>

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
                    {/* Header with explicit padding bottom */}
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <h4 className="text-sm font-black text-white uppercase tracking-wider">Your Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h4>
                        <button onClick={() => setIsCartOpen(false)} style={{ cursor: 'pointer' }} className="text-xs text-white/40 hover:text-white bg-transparent border-0 font-bold">CLOSE ✕</button>
                    </div>

                    {cart.length === 0 ? (
                        <div style={{ paddingTop: '48px', paddingBottom: '48px' }} className="text-center text-sm text-white/30 font-medium w-full">Your shopping bag is currently empty.</div>
                    ) : (
                        /* Explicit padding container pushing products away from header and footer lines */
                        <div style={{ paddingTop: '24px', paddingBottom: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        {item.viewSrc && !item.id.includes('beanie') && !item.id.includes('backup') ? (
                                            <img src={item.viewSrc} alt={item.name} className="w-20 h-20 object-contain rounded bg-black/40 border border-white/5" />
                                        ) : (
                                            <div className="w-10 h-10 bg-white/5 rounded flex flex-col items-center justify-center text-[8px] font-mono text-white/20 font-black tracking-tighter border border-white/5">BDT</div>
                                        )}
                                        <div>
                                            <p className="text-xs font-bold text-white leading-tight">{item.name}</p>
                                            <p className="text-[11px] text-white/40 mt-1">Size: {item.size}</p>
                                            {item.customText && (
                                                <p className="text-[10px] text-blue-400 font-mono mt-0.5 font-bold uppercase tracking-wide">ID: {item.customText}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-4">
                                        <p className="text-xs font-black text-white">£{item.price * item.quantity}</p>
                                        <button onClick={() => removeCartItem(item.id)} style={{ cursor: 'pointer' }} className="text-xs text-red-400/50 hover:text-red-400 bg-transparent border-0 p-1">✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    /* Clean Subtotal spacing layout */
                    <div className="pt-5 border-t border-white/5">
                        <div className="flex justify-between items-baseline mb-5">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Subtotal:</span>
                            <span className="text-lg font-black text-white">£{cartSubtotal}</span>
                        </div>
                        <button onClick={handleCheckoutRedirect} style={{ cursor: 'pointer' }} className="w-full font-sans font-extrabold text-white text-xs uppercase tracking-widest bg-blue-600 rounded-lg h-12 hover:bg-blue-500 transition border-0 shadow-lg">Proceed to Checkout</button>
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

                        {/* Streamlined header subtitle block */}
                        <p className="text-xs md:text-sm text-white/70 leading-relaxed max-w-[440px] mx-auto text-center" style={{ marginBottom: '28px' }}>
                            The Graduation Level garment cannot be casually purchased. Your first official piece is <span className="text-white font-extrabold">100% free</span>, provided as a badge of completion.
                        </p>

                        {/* RESTRUCTURED REQUIREMENT CONTAINER: Places verification terms cleanly into the context sequence */}
                        <div className="bg-[#050914] border border-white/5 rounded-xl text-left text-xs md:text-[13px] space-y-4 w-full shadow-inner" style={{ padding: '24px 20px', marginBottom: '32px' }}>
                            <div>
                                <p className="font-extrabold text-[#ffa085] uppercase tracking-wider text-[11px]" style={{ letterSpacing: "0.06em", marginBottom: '6px' }}>SUBMISSION RULE REQUIREMENT:</p>
                                <p className="leading-relaxed text-white/80 font-sans">• You must film a continuous, uncut workout video proving you have achieved full graduation metrics: 325 6-Counts AND 150 Navy Seals performed within the same week.</p>
                            </div>
                            <div className="pt-3 border-t border-white/5">
                                <p className="leading-relaxed text-white/80 font-sans font-medium">
                                    •Your submission will be personally reviewed by Max. Once verified, your order card will be approved and production will commence.
                                </p>
                            </div>
                        </div>

                        <div className="text-left w-full flex flex-col" style={{ marginBottom: '36px' }}>
                            <label className="block text-[9px] font-bold uppercase text-white/40 tracking-widest mb-2.5" style={{ letterSpacing: "0.06em" }}>OPTIONAL: PASTE VIDEO LINK DIRECTLY</label>
                            <input type="url" value={gradVideoUrl} onChange={(e) => setGradVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full bg-[#050912] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none" />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <button onClick={triggerGraduationEmail} style={{ backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', paddingTop: '16px', paddingBottom: '16px', borderRadius: '12px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.03em', cursor: 'pointer', border: '0', flex: 1 }}>Submit Entry via Email ↗</button>
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