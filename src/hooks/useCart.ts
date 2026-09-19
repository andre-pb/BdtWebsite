import { useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    customText?: string;
    badgeRank?: string;
    garmentCut?: string;
    fabricSpec?: string;
    logoStyle?: string;
    levelTarget?: string;
}

// Custom hook helper to handle shopping basket persistence across pages
export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Hydrate basket parameters from browser local storage safely on load
    useEffect(() => {
        const savedCart = localStorage.getItem('bdt_shop_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart storage data", e);
            }
        }
    }, []);

    const saveCart = (newCart: CartItem[]) => {
        setCart(newCart);
        localStorage.setItem('bdt_shop_cart', JSON.stringify(newCart));
    };

    const addItem = (item: Omit<CartItem, 'quantity'>) => {
        const existingIndex = cart.findIndex(i => i.id === item.id);
        if (existingIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingIndex].quantity += 1;
            saveCart(updatedCart);
        } else {
            saveCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeItem = (id: string) => {
        saveCart(cart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        saveCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
        cart,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice
    };
}