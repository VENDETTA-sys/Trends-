import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    street: "",
    landmark: "",
    type: "home"
  });

  const loadAddresses = async () => {
    const { data } = await API.get("/addresses/my");
    setAddresses(data);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const addAddress = async () => {
    try {
      await API.post("/addresses", form);
      alert("Address added ✅");
      setForm({
        fullName: "",
        phone: "",
        pincode: "",
        city: "",
        state: "",
        street: "",
        landmark: "",
        type: "home"
      });
      loadAddresses();
    } catch (err) {
      alert(err.response?.data?.message || "Address add failed");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📍 My Addresses</h1>

      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="font-bold mb-2">Add New Address</h2>

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Pincode"
          value={form.pincode}
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
        />

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="State"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Street"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
        />

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Landmark"
          value={form.landmark}
          onChange={(e) => setForm({ ...form, landmark: e.target.value })}
        />

        <select
          className="border p-2 rounded-lg w-full mb-3"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="home">Home</option>
          <option value="work">Work</option>
        </select>

        <button
          onClick={addAddress}
          className="bg-yellow-400 px-4 py-2 rounded-lg font-bold w-full"
        >
          Save Address
        </button>
      </div>

      {addresses.map((a) => (
        <div key={a._id} className="bg-white shadow rounded-xl p-4 mb-3">
          <p className="font-bold">{a.fullName}</p>
          <p className="text-sm text-gray-600">{a.street}, {a.city}, {a.state}</p>
          <p className="text-sm">Pincode: {a.pincode}</p>
          <p className="text-sm">Phone: {a.phone}</p>
        </div>
      ))}
    </div>
  );
}