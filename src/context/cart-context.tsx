"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useSyncExternalStore } from "react";
import { Produto, size } from "@/lib/types";
import { authClient } from "@/lib/auth-client";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  size: size;
  quantity: number;
  image: string[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (produto: Produto, tamanho: size) => void;
  removeFromCart: (id: string | number, size: size) => void;
  updateQuantity: (id: string | number, size: size, quantity: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const emptySubscribe = () => () => {};

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  // Checa se está no navegador sem causar hydration error
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Estado do carrinho
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Controla o id do usuário atual carregado
  const [loadedUserId, setLoadedUserId] = useState<string | undefined>(undefined);

  // Sincronização síncrona quando o usuário muda/desloga
  if (userId !== loadedUserId) {
    setLoadedUserId(userId);
    if (typeof window !== "undefined" && userId) {
      try {
        const saved = localStorage.getItem(`cart_${userId}`);
        setCartItems(saved ? JSON.parse(saved) : []);
      } catch {
        setCartItems([]);
      }
    } else {
      // Se deslogou (userId é undefined), limpa a memória do carrinho
      setCartItems([]);
    }
  }

  // Persiste as alterações no localStorage quando o cartItems muda
  useEffect(() => {
    if (isClient && userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId, isClient]);

  const addToCart = (produto: Produto, tamanho: size) => {
    if (!userId) {
      alert("Por favor, faça login para adicionar itens ao seu carrinho!");
      return;
    }

    const formattedImages: string[] = Array.isArray(produto.url)
      ? produto.url
      : produto.url
      ? [produto.url]
      : [];

    setCartItems((prevItems) => {
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
          image: formattedImages,
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

  // Limpa o estado do carrinho e remove a chave do usuário no localStorage
  const clearCart = () => {
    setCartItems([]);
    if (userId && typeof window !== "undefined") {
      localStorage.removeItem(`cart_${userId}`);
    }
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
        clearCart,
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