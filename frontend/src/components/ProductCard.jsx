import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-red-600 transition-all duration-300 group">
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || 'https://via.placeholder.com/400x300/111/fff?text=Program'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-white font-bold text-lg uppercase tracking-wide hover:text-red-400 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-zinc-500 text-sm mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-red-500 font-bold text-xl">₹{product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-red-600 text-white text-sm px-4 py-2 rounded font-bold hover:bg-red-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}