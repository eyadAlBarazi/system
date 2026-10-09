"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartKey, setCartKey] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function loadUserCart() {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const user = res.ok ? await res.json() : null;
        const nextCartKey = `cart:${user?._id || "guest"}`;
        const saved = localStorage.getItem(nextCartKey);

        if (cancelled) {
          return;
        }

        setCartKey(nextCartKey);
        setCart(saved ? JSON.parse(saved) : []);
      } catch (error) {
        console.error("فشل تحميل السلة:", error);
        if (cancelled) {
          return;
        }
        setCartKey("cart:guest");
        setCart([]);
      } finally {
        if (!cancelled) {
          setIsLoaded(true);
        }
      }
    }

    loadUserCart();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (isLoaded && cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, cartKey, isLoaded]);

  function addToCart(product) {
    const id = product?._id ?? product?.id;
    if (id == null) return;

    setCart((prev) => {
      const exists = prev.some((item) => (item._id ?? item.id) == id);

      if (exists) {
        return prev.map((item) =>
          (item._id ?? item.id) == id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => (item._id ?? item.id) != id));
  }

  
  function clearCart({ preserveStorage = false } = {}) {
    setCart([]);
    if (preserveStorage) {
      setCartKey(null);
    } else if (cartKey) {
      localStorage.removeItem(cartKey);
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}