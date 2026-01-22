import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const loadAll = async () => {
    const s = await API.get("/admin/stats");
    const o = await API.get("/admin/orders");
    const u = await API.get("/admin/users");

    setStats(s.data);
    setOrders(o.data);
    setUsers(u.data);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const updateOrderStatus = async (id) => {
    const status = prompt(
      "Enter status: placed / packed / shipped / out_for_delivery / delivered"
    );
    if (!status) return;

    await API.put(`/admin/orders/${id}/status`, { status });
    alert("Order status updated ✅");
    loadAll();
  };

  const approveReturn = async (id) => {
    await API.put(`/returns/${id}/approve`);
    alert("Return Approved ✅");
    loadAll();
  };

  const rejectReturn = async (id) => {
    await API.put(`/returns/${id}/reject`);
    alert("Return Rejected ❌");
    loadAll();
  };

  const refundOrder = async (id) => {
    await API.put(`/returns/${id}/refunded`);
    alert("Refund Done ✅");
    loadAll();
  };

  const updateRole = async (id) => {
    const role = prompt("Enter role: user / seller / admin");
    if (!role) return;
    await API.put(`/admin/users/${id}/role`, { role });
    alert("Role updated ✅");
    loadAll();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👑 Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Users</p>
            <p className="text-2xl font-extrabold">{stats.users}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Products</p>
            <p className="text-2xl font-extrabold">{stats.products}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Orders</p>
            <p className="text-2xl font-extrabold">{stats.orders}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Revenue</p>
            <p className="text-2xl font-extrabold">₹{stats.revenue}</p>
          </div>
        </div>
      )}

      {/* Orders */}
      <h2 className="text-xl font-bold mb-2">All Orders</h2>
      <div className="space-y-3 mb-8">
        {orders.map((o) => (
          <div key={o._id} className="bg-white shadow rounded-xl p-4">
            <p className="font-bold">Order: {o._id}</p>
            <p className="text-sm text-gray-500">
              User: {o.user?.email} | Payment: {o.paymentStatus} | Status:{" "}
              <b>{o.orderStatus}</b>
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => updateOrderStatus(o._id)}
                className="bg-yellow-400 px-3 py-2 rounded-lg font-bold"
              >
                Update Status
              </button>

              {o.returnRequest?.status === "requested" && (
                <>
                  <button
                    onClick={() => approveReturn(o._id)}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg font-bold"
                  >
                    Approve Return
                  </button>
                  <button
                    onClick={() => rejectReturn(o._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold"
                  >
                    Reject Return
                  </button>
                </>
              )}

              {o.returnRequest?.status === "approved" && (
                <button
                  onClick={() => refundOrder(o._id)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold"
                >
                  Refund Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Users */}
      <h2 className="text-xl font-bold mb-2">All Users</h2>
      <div className="space-y-3">
        {users.map((u) => (
          <div key={u._id} className="bg-white shadow rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-sm">Role: <b>{u.role}</b></p>
            </div>

            <button
              onClick={() => updateRole(u._id)}
              className="bg-slate-900 text-white px-3 py-2 rounded-lg font-bold"
            >
              Change Role
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}