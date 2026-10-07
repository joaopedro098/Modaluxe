"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function BuyButton({ children, disabled, onClick, ...props }: BuyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Pega os dados brutos e o erro da sessão
  const { data: session, isPending, error } = authClient.useSession();

  // DEBUG no Console do Navegador (F12)
  console.log("🔍 DEBUG BETTER AUTH:", {
    session,
    isPending,
    error,
    userId: session?.user?.id,
  });

  const handleConfirmPurchase = () => {
    setIsOpen(false);
    toast.success("Compra realizada com sucesso!", {
      description: "Seu pedido foi processado e já está a caminho.",
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Interrompe qualquer envio de formulário padrão
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    if (isPending) {
      toast.info("Aguarde, verificando autenticação...");
      return;
    }

    // Se NÃO tiver o id do usuário no objeto da sessão
    if (!session?.user?.id) {
      console.warn("⚠️ Bloqueado: Usuário não autenticado.");
      toast.error("Você precisa estar logado para realizar uma compra!", {
        description: "Faça login para continuar.",
      });
      return; // Garante que NUNCA chegue no setIsOpen(true)
    }

    // Apenas se passou na validação acima
    setIsOpen(true);
  };

  return (
    <>
      <Button 
        type="button"
        onClick={handleClick} 
        disabled={disabled || isPending} 
        size="lg" 
        className="w-full"
        {...props}
      >
        {isPending ? "Verificando..." : children || "Comprar Agora"}
      </Button>

      {/* MODAL SÓ ABRE SE 'isOpen' FOR TRUE */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja terminar a compra?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a finalizar este pedido na nossa loja fictícia. Deseja confirmar a transação?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPurchase}>
              Sim, terminar compra
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}