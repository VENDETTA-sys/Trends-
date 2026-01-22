import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const { data } = await API.get("/orders/my");
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const requestReturn = async (id) => {
    const reason = prompt("Enter return reason:");
    if (!reason) return;

    try {
      await API.post(`/returns/${id}/request`, { reason });
      alert("Return requested ✅");
      loadOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Return request failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white shadow rounded-xl p-4">
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <p className="font-bold">Order ID: {o._id}</p>
                  <p className="text-sm text-gray-500">
                    Payment: {o.paymentStatus} | Status: {o.orderStatus}
                  </p>
                </div>
                <p className="font-extrabold text-blue-600">₹{o.totalPrice}</p>
              </div>

              <div className="mt-3 space-y-2">
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

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => requestReturn(o._id)}
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Request Return
                </button>

                <span className="text-sm px-3 py-2 rounded-lg bg-gray-100">
                  Return Status: <b>{o.returnRequest?.status || "none"}</b>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}