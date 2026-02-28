import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      // Razorpay integration goes here (covered in payments phase)
      alert('Razorpay checkout coming soon!');
    }
  };

  if (cart.length === 0) return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400">
      <p className="text-2xl mb-4">Your cart is empty</p>
      <button
        onClick={() => navigate('/shop')}
        className="bg-red-600 text-white px-6 py-3 rounded font-bold hover:bg-red-700 transition"
      >
        Browse Programs
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <h1 className="text-4xl font-black uppercase tracking-widest text-white text-center mb-10">
        Your Cart
      </h1>

      <div className="max-w-3xl mx-auto">
        {/* Cart Items */}
        {cart.map(item => (
          <div key={item._id} className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image || 'https://via.placeholder.com/80x80/111/fff'}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="text-white font-bold uppercase">{item.name}</p>
                <p className="text-zinc-500 text-sm">Qty: {item.qty}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-red-500 font-bold text-lg">₹{item.price * item.qty}</span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-zinc-500 hover:text-red-500 transition text-xl"
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        {/* Total & Checkout */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 mt-6">
          <div className="flex justify-between text-white text-xl font-bold mb-6">
            <span>Total</span>
            <span className="text-red-500">₹{total}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest text-lg rounded hover:bg-red-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}