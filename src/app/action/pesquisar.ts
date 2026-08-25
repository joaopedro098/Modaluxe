"use server";

import { prisma } from "./../../../lib/prisma"; // Ajuste o caminho do seu cliente prisma

export async function buscarProdutos(termo: string) {
  try {
    const produtos = await prisma.produtos.findMany({
      where: {
        nome: {
          contains: termo,
          mode: "insensitive", // Torna a busca case-insensitive (funciona em PostgreSQL)
        },
      },
      orderBy: {
        nome: 'asc', // Ordena os resultados alfabeticamente
      },
    });
    return produtos;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return [];
  }
}