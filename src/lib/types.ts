 // enum dos tamanhos das roupas
 export enum size {
  extraPequeno = "PP",
  Pequeno = "P", 
  Medio = "M",
  Grande = "G",
  ExtraGrande = "GG"
}

//interface de tipagem dos produtos 
 export interface Produto {
  name: string;
  size: size[];
  description: string;
  value: number;
  url : string
}
