import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/users/register', { name, email, password });
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-black uppercase text-white text-center mb-8 tracking-widest">
          Register
        </h1>

        {error && (
          <p className="bg-red-900/40 border border-red-700 text-red-400 text-sm p-3 rounded mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-900/40 border border-green-700 text-green-400 text-sm p-3 rounded mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Name', type: 'text', value: name, setter: setName, placeholder: 'Your name' },
            { label: 'Email', type: 'email', value: email, setter: setEmail, placeholder: 'you@example.com' },
            { label: 'Password', type: 'password', value: password, setter: setPassword, placeholder: '••••••••' },
          ].map(field => (
            <div key={field.label}>
              <label className="text-zinc-400 text-sm uppercase tracking-widest block mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={e => field.setter(e.target.value)}
                required
                className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded focus:outline-none focus:border-red-500 transition"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 font-black uppercase tracking-widest rounded hover:bg-red-700 transition mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-zinc-500 text-center text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-red-400 hover:text-red-300 transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}