import Image from "next/image"
import Link from "next/link"
import { Heart, ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  // Produtos com imagens individuais (apenas com imagens válidas onde você deseja)
  const products = [
    {
      id: 1,
      name: "Camiseta Oversized Minimal",
      price: "R$ 149,90",
      image: "", // Sem imagem por enquanto
      tag: "Lançamento",
    },
    {
      id: 2,
      name: "Jaqueta Jeans Vintage",
      price: "R$ 329,90",
      image: "", // Sem imagem por enquanto
      tag: "Mais Vendido",
    },
    {
      id: 3,
      name: "Calça Alfaiataria Comfort",
      price: "R$ 219,90",
      image: "", // Sem imagem por enquanto
      tag: "-20%",
    },
    {
      id: 4,
      name: "Vestido Midi Floral",
      price: "R$ 279,90",
      image: "", // Sem imagem por enquanto
      tag: "Tendência",
    },
  ]

  // Apenas a categoria "Masculino" possui a foto. As outras estão com string vazia ("").
  const categories = [
    { name: "Feminino", image: "/feminino.webp" },
    { name: "Masculino", image: "/masculino.webp" },
    { name: "Acessórios", image: "/acessorio.avif" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top Bar com texto branco */}
      <div className="bg-primary text-white py-2 text-center text-xs font-medium tracking-wide">
        Frete grátis para todo o Brasil em compras acima de R$ 250 | Use o cupom <span className="underline font-bold">PRIMEIRACOMPRA</span>
      </div>

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
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-background/50 flex items-center justify-center">
            {/* Imagem principal do Hero alterada para string vazia ou outra de sua preferência */}
            <Image 
              src="/coleção2026.webp" 
              alt="Modelo vestindo roupas da coleção" 
              fill 
              className="object-cover"
              priority
            />
            <span className="text-xs text-muted-foreground z-0">Espaço para Foto Hero</span>
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
            <div key={index} className="group relative h-80 rounded-xl overflow-hidden shadow-md cursor-pointer bg-muted flex items-center justify-center">
              {/* Renderiza a imagem apenas se houver uma string válida no objeto */}
              {cat.image ? (
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <span className="text-xs text-muted-foreground">Sem foto ({cat.name})</span>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6 z-10">
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
              <div className="relative h-80 bg-muted overflow-hidden flex items-center justify-center">
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

                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">Foto do Produto</span>
                )}
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
              <li><Link href="#" className="hover:text-primary">Central de Ajuda</Link></li>
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