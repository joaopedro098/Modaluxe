"use client";

import { Masculino } from "@/(produtos)/Masculino/index";
import { size, Produto } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function ListaProdutos() {
  const produtos = Masculino;
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

        return (
          <div
            key={`${produto.name}-${index}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              width: "250px",
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "200px" }}>
              <Image
                src={produto.url}
                alt={produto.name}
                fill
                sizes="(max-width: 768px) 100vw, 250px"
                style={{ objectFit: "cover", borderRadius: "4px" }}
              />
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
                    // 2. Uso do Button do shadcn com variância dinâmica
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
        );
      })}
    </div>
  );
}