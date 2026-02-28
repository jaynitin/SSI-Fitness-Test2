import { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    API.get('/orders/myorders', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-400">
      Loading your orders...
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <h1 className="text-4xl font-black uppercase tracking-widest text-white text-center mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-zinc-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-zinc-400 text-xs">Order ID: {order._id}</p>
                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${order.isPaid ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'}`}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </div>

              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-zinc-300 py-1 border-b border-zinc-800">
                  <span>{item.product?.name || 'Product'} × {item.quantity}</span>
                </div>
              ))}

              <div className="flex justify-between text-white font-bold mt-4">
                <span>Total</span>
                <span className="text-red-500">₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}