import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <div className="bg-slate-900 text-white px-6 py-4 sticky top-0 z-50 shadow">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-yellow-400">
          Trends Hub
        </Link>

        <div className="w-full md:w-[45%] flex bg-white rounded-lg overflow-hidden">
          <input
            className="w-full px-3 py-2 text-black outline-none"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => navigate(`/?q=${query}`)}
            className="bg-yellow-400 px-5 font-bold text-black"
          >
            Search
          </button>
        </div>

        <div className="flex gap-3 items-center flex-wrap justify-center">
          <Link to="/cart" className="hover:text-yellow-300 font-bold">
            Cart ({cart.length})
          </Link>

          {user && (
            <Link to="/orders" className="hover:text-yellow-300 font-bold">
              Orders
            </Link>
          )}

          {user && (
            <Link to="/address" className="hover:text-yellow-300 font-bold">
              Address
            </Link>
          )}

          {user?.role === "seller" && (
            <>
              <Link to="/seller" className="hover:text-yellow-300 font-bold">
                Seller
              </Link>
              <Link to="/seller-orders" className="hover:text-yellow-300 font-bold">
                Seller Orders
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-yellow-300 font-bold">
              Admin
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 px-4 py-2 rounded-lg font-bold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}