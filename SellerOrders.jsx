import { useEffect, useState } from "react";
import API from "../api/axios";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await API.get("/seller/orders");
    setOrders(data);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 Seller Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white shadow rounded-xl p-4">
              <p className="font-bold">Order ID: {o._id}</p>
              <p className="text-sm text-gray-500">Customer: {o.user?.email}</p>

              <div className="mt-2 space-y-2">
                {o.items.map((item, i) => (
                  <div key={i} className="border-t pt-2 flex gap-3 items-center">
                    <img
                      src={item.product?.images?.[0] || "https://via.placeholder.com/60"}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-bold">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.qty} | ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-2 text-sm">
                Payment: <b>{o.paymentStatus}</b> | Status: <b>{o.orderStatus}</b>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}