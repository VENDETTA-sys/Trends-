import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((c) => (
              <div
                key={c._id}
                className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={c.images?.[0] || "https://via.placeholder.com/80"}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-bold">{c.name}</h2>
                    <p className="text-gray-500 text-sm">Qty: {c.qty}</p>
                    <p className="text-blue-600 font-bold">₹{c.price}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(c._id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white shadow rounded-xl p-4 mt-6">
            <h2 className="font-bold text-lg">Total: ₹{total}</h2>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-yellow-400 w-full py-3 rounded-xl font-bold mt-3"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}