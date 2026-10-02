"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Produto, size } from "@/lib/types";
import { toast } from "sonner";

interface CartButtonProps {
  produto: Produto;
  tamanhoSelecionado?: size;
}

export function CartButton({ produto, tamanhoSelecionado }: CartButtonProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (!tamanhoSelecionado) {
      toast.error("Por favor, selecione um tamanho!");
      return;
    }

    addToCart(produto, tamanhoSelecionado);
    toast.success(`${produto.name} (${tamanhoSelecionado}) adicionado ao carrinho!`);
  };

  return (
    <Button
      variant="outline"
      disabled={!tamanhoSelecionado}
      onClick={handleAdd}
      className="w-full"
    >
      {tamanhoSelecionado ? "Adicionar ao Carrinho" : "Selecione um tamanho"}
    </Button>
  );
}