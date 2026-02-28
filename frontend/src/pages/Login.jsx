import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/users/login', { email, password });
      login(res.data); // saves token + name to context & localStorage
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-black uppercase text-white text-center mb-8 tracking-widest">
          Login
        </h1>

        {error && (
          <p className="bg-red-900/40 border border-red-700 text-red-400 text-sm p-3 rounded mb-6">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-zinc-400 text-sm uppercase tracking-widest block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-zinc-400 text-sm uppercase tracking-widest block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 font-black uppercase tracking-widest rounded hover:bg-red-700 transition mt-2"
          >
            Login
          </button>
        </form>

        <p className="text-zinc-500 text-center text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-400 hover:text-red-300 transition">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}