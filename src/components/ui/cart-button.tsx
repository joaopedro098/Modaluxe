"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Produto, size } from "@/lib/types";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface CartButtonProps {
  produto: Produto;
  tamanhoSelecionado?: size;
}

export function CartButton({ produto, tamanhoSelecionado }: CartButtonProps) {
  const { addToCart } = useCart();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const handleAdd = () => {
    if (!userId) {
      toast.error("Por favor, faça login para adicionar itens ao carrinho!");
      return;
    }

    if (!tamanhoSelecionado) {
      toast.error("Por favor, selecione um tamanho!");
      return;
    }

    addToCart(produto, tamanhoSelecionado);

    toast.success(`${produto.name} (${tamanhoSelecionado}) foi adicionado ao seu carrinho!`);
  };

  return (
    <Button
      variant="outline"
      onClick={handleAdd}
      className="w-full gap-2 transition-all active:scale-95 font-medium"
    >
      <ShoppingBag className="w-4 h-4" />
      Adicionar ao Carrinho
    </Button>
  );
}