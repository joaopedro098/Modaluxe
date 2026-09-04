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

export function BuyButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Função disparada quando o usuário confirma a compra no modal
  const handleConfirmPurchase = () => {
    setIsOpen(false)
    
    // Dispara a notificação no canto da tela
    toast.success("Compra realizada com sucesso!", {
      description: "Seu pedido foi processado e já está a caminho.",
    })
  }

  return (
    <>
      {/* Botão principal que o usuário clica */}
      <Button onClick={() => setIsOpen(true)} size="lg">
        Comprar Agora
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