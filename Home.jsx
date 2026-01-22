import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api/axios";

const categories = [
  { name: "Men", emoji: "🧥" },
  { name: "Women", emoji: "👗" },
  { name: "Shoes", emoji: "👟" },
  { name: "Accessories", emoji: "🕶️" }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const q = searchParams.get("q") || "";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );

  if (category !== "All") filtered = filtered.filter((p) => p.category === category);

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center shadow">
        <div>
          <h1 className="text-3xl font-extrabold text-yellow-400">
            Mega Fashion Sale 🔥
          </h1>
          <p className="mt-2 text-gray-200">
            Upto 70% off on trending styles. Limited time only!
          </p>
          <p className="mt-2 text-sm text-gray-300">
            Use coupon <b>SAVE10</b> on orders above ₹500.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold">
            Shop Now
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">Top Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setCategory(c.name)}
              className="bg-white shadow rounded-xl p-4 flex items-center gap-3 hover:shadow-lg transition"
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="font-bold">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <select
          className="border p-2 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Men</option>
          <option>Women</option>
          <option>Shoes</option>
          <option>Accessories</option>
        </select>

        <select
          className="border p-2 rounded-lg"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

        <button
          onClick={() => setCategory("All")}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold"
        >
          Reset Filters
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="bg-white shadow rounded-2xl p-3 hover:shadow-xl transition"
          >
            <img
              src={p.images?.[0] || "https://via.placeholder.com/300"}
              className="h-44 w-full object-cover rounded-xl"
            />

            <h2 className="font-bold mt-2 line-clamp-1">{p.name}</h2>
            <p className="text-gray-500 text-sm">{p.category}</p>

            <div className="flex justify-between items-center mt-2">
              <p className="text-blue-600 font-extrabold">₹{p.price}</p>
              <p className="text-yellow-500 text-sm font-bold">
                ⭐ {p.rating} ({p.numReviews})
              </p>
            </div>

            <button className="mt-3 bg-yellow-400 w-full py-2 rounded-xl font-bold">
              View Details
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}