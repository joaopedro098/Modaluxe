import {size, Produto}from "@/lib/types"
export const feminino: Produto[] = [
  {
    name: "Camiseta Básica",
    size: [size.Medio, size.extraPequeno, size.Grande , size.ExtraGrande],
    description: "Camiseta 100% algodão",
    value: 59.90,
    url: [""]
  },
  {
    name: "Calça Jeans",
    size: [size.Grande, size.Pequeno, size.Medio],
    description: "Calça jeans modelo slim",
    value: 129.90,
     url: [""]
  }
];