import { prisma } from "@/lib/prisma";
import Image from "next/image";

// Definindo o tipo com base exata no seu model Produtos
type Produto = {
  id: string;
  nome: string;
  urlImagem: string | null;
  descricao: string | null;
  preco: number;
  categoria: string;
  genero: string | null;
  quantidade: number;
  createdAt: Date;
  updatedAt: Date;
};

export default async function ProdutosPage() {
  // Buscando os produtos diretamente do banco
  const produtos: Produto[] = await prisma.produtos.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Catálogo de Produtos</h1>

      {produtos.length === 0 ? (
        <p className="text-gray-500">Nenhum produto cadastrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div key={produto.id} className="border rounded-lg p-4 shadow-md bg-white flex flex-col">
              {/* Imagem do produto */}
              <div className="relative w-full h-48 mb-4 rounded-md overflow-hidden bg-gray-100">
                {produto.urlImagem ? (
                  <Image 
                    src={produto.urlImagem} 
                    alt={produto.nome} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Sem imagem
                  </div>
                )}
              </div>

              {/* Informações do Produto */}
              <h2 className="text-xl font-bold text-gray-800">{produto.nome}</h2>
              
              {produto.descricao && (
                <p className="text-sm text-gray-600 mt-1 flex-grow">{produto.descricao}</p>
              )}

              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-green-600">
                  R$ {produto.preco.toFixed(2)}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                  {produto.categoria}
                </span>
              </div>

              <div className="mt-2 text-xs text-gray-500 flex justify-between">
                {produto.genero && <span>Gênero: {produto.genero}</span>}
                <span>Estoque: {produto.quantidade} un.</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}