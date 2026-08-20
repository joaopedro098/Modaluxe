import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, Search, Menu, ArrowRight, ShieldCheck, Truck, RefreshCw, Trash2, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription, 
  SheetFooter 
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  // Exemplo de produtos para a vitrine
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

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* 1. Top Bar */}
      <div className="bg-primary text-primary-content py-2 text-center text-xs font-medium tracking-wide">
        Frete grátis para todo o Brasil em compras acima de R$ 250 | Use o cupom <span className="underline font-bold">PRIMEIRACOMPRA</span>
      </div>

      {/* 2. Navbar */}
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
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Tam: {item.size}</p>
                          <div className="flex items-center gap-2 pt-1">
                            <button className="h-6 w-6 border rounded flex items-center justify-center text-xs hover:bg-muted">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-medium">{item.quantity}</span>
                            <button className="h-6 w-6 border rounded flex items-center justify-center text-xs hover:bg-muted">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <span className="text-sm font-bold">R$ {item.price.toFixed(2)}</span>
                          <button className="block ml-auto text-muted-foreground hover:text-destructive transition-colors">
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
                    <SheetTrigger >
                      <Button variant="outline" className="w-full" size="sm">
                        Continuar Comprando
                      </Button>
                    </SheetTrigger>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden bg-muted py-20 lg:py-32">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="outline" className="border-primary text-primary px-3 py-1 text-xs uppercase tracking-widest">
              Nova Coleção 2026
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Estilo e conforto para o seu dia a dia.
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Descubra peças essenciais que combinam sofisticação e modernidade. Renove seu guarda-roupa com as últimas tendências.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                Explorar Coleção <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Ver Ofertas
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src="" 
              alt="Modelo vestindo roupas da coleção" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* 4. Categorias em Destaque */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Compre por Categoria</h2>
          <p className="text-muted-foreground text-sm mt-2">Encontre exatamente o que você está procurando</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="group relative h-80 rounded-xl overflow-hidden shadow-md cursor-pointer">
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{cat.name}</h3>
                  <p className="text-xs text-gray-300 mt-1 flex items-center gap-1 group-hover:underline">
                    Ver produtos <ArrowRight className="h-3 w-3" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Vitrine de Produtos */}
      <section className="container mx-auto px-4 py-16 border-t">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Destaques da Semana</h2>
            <p className="text-muted-foreground text-sm mt-2">Os favoritos dos nossos clientes</p>
          </div>
          <Button variant="ghost" className="gap-1 text-sm font-semibold">
            Ver todos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-80 bg-muted overflow-hidden">
                <Badge className="absolute top-3 left-3 z-10 bg-background/80 text-foreground backdrop-blur-sm border-0 font-medium">
                  {product.tag}
                </Badge>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background/90 rounded-full h-8 w-8"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base">{product.price}</span>
                  <Button size="sm" variant="outline" className="h-8 text-xs cursor-pointer">
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. Seção de Benefícios */}
      <section className="bg-muted/50 border-t border-b py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Entrega Rápida e Segura</h4>
              <p className="text-xs text-muted-foreground mt-1">Enviamos para todo o país com rastreio em tempo real.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Primeira Troca Grátis</h4>
              <p className="text-xs text-muted-foreground mt-1">Até 30 dias para realizar trocas sem custos adicionais.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Compra 100% Segura</h4>
              <p className="text-xs text-muted-foreground mt-1">Seus dados protegidos e pagamento criptografado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Rodapé */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-tighter">MODALUXE</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Moda contemporânea com foco em qualidade, durabilidade e design exclusivo para todas as ocasiões.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Institucional</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Sobre Nós</Link></li>
              <li><Link href="#" className="hover:text-primary">Sustentabilidade</Link></li>
              <li><Link href="#" className="hover:text-primary">Trabalhe Conosco</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Atendimento</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="#" className="hover:text-internal">Central de Ajuda</Link></li>
              <li><Link href="#" className="hover:text-primary">Política de Trocas</Link></li>
              <li><Link href="#" className="hover:text-primary">Rastrear Pedido</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Newsletter</h4>
            <p className="text-xs text-muted-foreground">Receba ofertas exclusivas e novidades em primeira mão.</p>
            <div className="flex gap-2">
              <Input placeholder="Seu e-mail" className="h-9 text-xs" />
              <Button size="sm" className="h-9 text-xs">Assinar</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t pt-6 text-center text-xs text-muted-foreground">
          © 2026 MODALUXE. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}