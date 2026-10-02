"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Produto, size } from "@/lib/types";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  size: size;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (produto: Produto, tamanho: size) => void;
  removeFromCart: (id: string | number, size: size) => void;
  updateQuantity: (id: string | number, size: size, quantity: number) => void;
  totalQuantity: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (produto: Produto, tamanho: size) => {
    setCartItems((prevItems) => {
      // Verifica se o mesmo produto com o mesmo tamanho já está no carrinho
      const existingIndex = prevItems.findIndex(
        (item) => item.name === produto.name && item.size === tamanho
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prevItems,
        {
          id: `${produto.name}-${tamanho}`,
          name: produto.name,
          price: produto.value,
          size: tamanho,
          quantity: 1,
          image: produto.url || "",
        },
      ];
    });
  };

  const removeFromCart = (id: string | number, size: size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: string | number, size: size, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}