import { ResRestDataSource } from "./RestDataSource";
import type { Producto } from "../components/ProductCard"; // o tu archivo de tipos

const API_URL = "https://localhost:5001/api/productos";

const productService = new ResRestDataSource<Producto>(API_URL);

export default productService;
