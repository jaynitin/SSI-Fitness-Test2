import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400">
      Loading...
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <img
          src={product.image || 'https://via.placeholder.com/600x400/111/fff?text=Program'}
          alt={product.name}
          className="rounded-lg w-full object-cover"
        />

        {/* Info */}
        <div>
          <p className="text-red-500 uppercase tracking-widest text-xs mb-2">{product.category}</p>
          <h1 className="text-4xl font-black uppercase text-white mb-4">{product.name}</h1>
          <p className="text-zinc-400 text-base leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-6">
            <span className="text-3xl font-black text-red-500">₹{product.price}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-red-600 text-white px-8 py-3 font-bold uppercase tracking-widest rounded hover:bg-red-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}