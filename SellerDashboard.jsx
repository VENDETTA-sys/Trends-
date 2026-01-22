import { useEffect, useState } from "react";
import API from "../api/axios";

export default function SellerDashboard() {
  const [analytics, setAnalytics] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    stock: 10
  });

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const loadAnalytics = async () => {
    const { data } = await API.get("/seller/analytics");
    setAnalytics(data);
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const uploadImages = async (files) => {
    setUploading(true);
    try {
      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append("images", files[i]);
      }

      const { data } = await API.post("/upload/multiple", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setImages(data.images);
      alert("Images uploaded ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    }
    setUploading(false);
  };

  const createProduct = async () => {
    try {
      await API.post("/products", {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        images,
        rating: 4.5,
        numReviews: 10,
        tags: ["trending"]
      });

      alert("Product created ✅");
      setForm({ name: "", description: "", price: "", category: "Men", stock: 10 });
      setImages([]);
      loadAnalytics();
    } catch (err) {
      alert(err.response?.data?.message || "Product create failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛍️ Seller Dashboard</h1>

      {analytics && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Total Sales</p>
            <p className="text-2xl font-extrabold">₹{analytics.totalSales}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Orders</p>
            <p className="text-2xl font-extrabold">{analytics.totalOrders}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Products</p>
            <p className="text-2xl font-extrabold">{analytics.totalProducts}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-bold mb-3">➕ Upload New Product</h2>

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <select
          className="border p-2 rounded-lg w-full mb-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option>Men</option>
          <option>Women</option>
          <option>Shoes</option>
          <option>Accessories</option>
        </select>

        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        <input
          type="file"
          multiple
          accept="image/*"
          className="border p-2 rounded-lg w-full mb-3"
          onChange={(e) => uploadImages(e.target.files)}
        />

        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-3">
            {images.map((img, i) => (
              <img key={i} src={img} className="h-16 w-16 rounded-lg object-cover" />
            ))}
          </div>
        )}

        <button
          onClick={createProduct}
          className="bg-yellow-400 px-4 py-2 rounded-lg font-bold w-full"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}