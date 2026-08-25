import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter 
} from "@/components/ui/sheet"
import { ShoppingBag, Heart, Search, Menu, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function Header() {
  const products = [
    {
      id: 1,
      name: "Camiseta Oversized Minimal",
      price: "R$ 149,90",
      image: "",
      tag: "Lançamento",
    },
    {
      id: 2,
      name: "Jaqueta Jeans Vintage",
      price: "R$ 329,90",
      image: "",
      tag: "Mais Vendido",
    },
    {
      id: 3,
      name: "Calça Alfaiataria Comfort",
      price: "R$ 219,90",
      image: "",
      tag: "-20%",
    },
    {
      id: 4,
      name: "Vestido Midi Floral",
      price: "R$ 279,90",
      image: "",
      tag: "Tendência",
    },
  ]

  const categories = [
    { name: "Feminino", image: "" },
    { name: "Masculino", image: "" },
    { name: "Acessórios", image: "" },
  ]

  // Itens simulados no carrinho
  const cartItems = [
    {
      id: 1,
      name: "Camiseta Oversized Minimal",
      price: 149.90,
      size: "M",
      quantity: 1,
      image: "",
    },
    {
      id: 3,
      name: "Calça Alfaiataria Comfort",
      price: 219.90,
      size: "38",
      quantity: 1,
      image: "",
    }
  ]

  // Cálculo automático do subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="text-xl font-bold tracking-tighter">
            MODA<span className="text-primary">LUXE</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="transition-colors hover:text-primary">Feminino</Link>
            <Link href="#" className="transition-colors hover:text-primary">Masculino</Link>
            <Link href="#" className="transition-colors hover:text-primary">Coleção 2026</Link>
            <Link href="#" className="transition-colors hover:text-primary text-muted-foreground">Sale</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar produtos..." className="pl-8 h-9 text-sm" />
          </div>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>

          {/* BARRA LATERAL DO CARRINHO (SHEET) */}
          <Sheet>
            {/* Usando asChild para que o SheetTrigger repasse as propriedades ao Button sem duplicar tags HTML */}
            <SheetTrigger >
              <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {cartItems.length}
                </span>
              </Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Seu Carrinho ({cartItems.length})</SheetTitle>
                <SheetDescription>
                  Revise seus itens selecionados antes de finalizar a compra.
                </SheetDescription>
              </SheetHeader>

              {/* Lista de Produtos do Carrinho */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center justify-between border-b pb-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">Sem foto</div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Tam: {item.size}</p>
                        <div className="flex items-center gap-2 pt-1">
                          <button type="button" className="h-6 w-6 border rounded flex items-center justify-center text-xs hover:bg-muted">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-medium">{item.quantity}</span>
                          <button type="button" className="h-6 w-6 border rounded flex items-center justify-center text-xs hover:bg-muted">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-sm font-bold">R$ {item.price.toFixed(2)}</span>
                        <button type="button" className="block ml-auto text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-2">
                    <ShoppingBag className="h-10 w-10 stroke-1" />
                    <p>Seu carrinho está vazio.</p>
                  </div>
                )}
              </div>

              {/* Rodapé do Carrinho com Subtotal e Checkout */}
              {cartItems.length > 0 && (
                <SheetFooter className="flex-col sm:flex-col border-t pt-4 space-y-3">
                  <div className="w-full space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Frete</span>
                      <span>Calculado no checkout</span>
                    </div>
                    <div className="flex justify-between font-bold text-base">
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Finalizar Compra
                  </Button>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header> 
  )
}