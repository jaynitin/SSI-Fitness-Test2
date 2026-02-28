import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-black border-b border-zinc-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-widest text-white uppercase">
        SSI Fitness
      </Link>

      {/* Nav Links */}
      <div className="flex gap-8 text-sm uppercase tracking-widest text-zinc-400">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/shop" className="hover:text-white transition">Shop</Link>
        {user && (
          <Link to="/myorders" className="hover:text-white transition">My Orders</Link>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative text-white">
          🛒
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm border border-zinc-600 px-3 py-1 rounded hover:border-white hover:text-white transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}