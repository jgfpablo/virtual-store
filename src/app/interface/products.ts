export interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  tamano: string[];
  images: string[];
  colores: string[];
}
