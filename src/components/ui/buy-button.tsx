"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

// Permite receber todas as propriedades padrão do HTML button (disabled, onClick, children, etc.)
export interface BuyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export function BuyButton({ children, disabled, onClick, ...props }: BuyButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Função disparada quando o usuário confirma a compra no modal
  const handleConfirmPurchase = () => {
    setIsOpen(false)
    
    // Dispara a notificação no canto da tela
    toast.success("Compra realizada com sucesso!", {
      description: "Seu pedido foi processado e já está a caminho.",
    })
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Se foi passado um onClick customizado via prop, executa ele
    if (onClick) {
      onClick(e)
    }
    // Abre o modal de confirmação
    setIsOpen(true)
  }

  return (
    <>
      {/* Botão principal repassando o estado de disabled, texto dinâmico (children) e estilo */}
      <Button 
        onClick={handleClick} 
        disabled={disabled} 
        size="lg" 
        className="w-full"
        {...props}
      >
        {children || "Comprar Agora"}
      </Button>

      {/* Janela de Confirmação (Alert Dialog) */}
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
  )
}