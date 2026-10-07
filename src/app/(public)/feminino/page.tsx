"use client";

import { BuyButton } from "@/components/ui/buy-button"; 
import { CartButton } from "@/components/ui/cart-button";
import { feminino } from "@/(produtos)/Feminino/index";
import { size, Produto } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ListaProdutos() {
  const produtos = feminino;
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState<Record<number, size>>({});

  const selecionarTamanho = (indexProduto: number, tamanho: size) => {
    setTamanhosSelecionados((prev) => ({
      ...prev,
      [indexProduto]: tamanho,
    }));
  };

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "20px" }}>
      {produtos.map((produto: Produto, index: number) => {
        const tamanhoAtual = tamanhosSelecionados[index];
        const temVariasImagens = Array.isArray(produto.url) && produto.url.length > 1;

        return (
          <div
            key={`${produto.name}-${index}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              width: "250px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* EXIBIÇÃO DA IMAGEM OU DO CARROSSEL */}
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                {temVariasImagens ? (
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full ml-0">
                      {produto.url.map((imgUrl: string, imgIdx: number) => (
                        <CarouselItem key={imgIdx} className="pl-0 relative w-full h-[200px]">
                          <Image
                            src={imgUrl}
                            alt={`${produto.name} - imagem ${imgIdx + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 250px"
                            style={{ objectFit: "cover", borderRadius: "4px" }}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-1 h-7 w-7" />
                    <CarouselNext className="right-1 h-7 w-7" />
                  </Carousel>
                ) : (
                  <Image
                    src={Array.isArray(produto.url) ? produto.url[0] : produto.url}
                    alt={produto.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 250px"
                    style={{ objectFit: "cover", borderRadius: "4px" }}
                  />
                )}
              </div>

              <h3 style={{ marginTop: "12px", marginBottom: "8px" }}>{produto.name}</h3>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "8px" }}>{produto.description}</p>
              
              <strong>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produto.value)}
              </strong>

              <div style={{ marginTop: "12px" }}>
                <p style={{ margin: "4px 0 8px 0", fontSize: "14px", fontWeight: 500 }}>
                  Tamanhos disponíveis:
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                  {produto.size.map((tamanho: size) => {
                    const isSelected = tamanhoAtual === tamanho;

                    return (
                      <Button
                        key={tamanho}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => selecionarTamanho(index, tamanho)}
                      >
                        {tamanho}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {tamanhoAtual && (
                <p style={{ marginTop: "12px", fontSize: "12px", color: "#28a745" }}>
                  Selecionado: <strong>{tamanhoAtual}</strong>
                </p>
              )}
            </div>

            {/* AÇÕES: ADICIONAR AO CARRINHO E COMPRAR AGORA */}
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <CartButton
                produto={produto}
                tamanhoSelecionado={tamanhoAtual}
              />

              <BuyButton disabled={!tamanhoAtual}>
                Comprar Agora
              </BuyButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}