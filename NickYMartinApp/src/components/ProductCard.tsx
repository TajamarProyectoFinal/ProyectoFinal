import type { Producto } from "../types/product";

interface Props {
    producto: Producto;
}

const ProductCard: React.FC<Props> = ({ producto }) => {
    return (
        <div className="border p-4 rounded shadow">
            <img
                src={producto.mainImagenUrl || "https://via.placeholder.com/150"}
                alt={producto.nombre}
                className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p className="text-sm">{producto.descripcion}</p>
            <p className="text-blue-700 font-bold mt-1">{producto.precio} €</p>
        </div>
    );
};

export default ProductCard;
