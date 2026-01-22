import { useContext, useState } from "react";
import API from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const deliveryCharge = subtotal >= 999 ? 0 : 50;
  const gst = Math.floor(subtotal * 0.18);

  const totalBeforeDiscount = subtotal + deliveryCharge + gst;
  const finalTotal = totalBeforeDiscount - discount;

  const applyCoupon = async () => {
    try {
      const { data } = await API.post("/coupons/apply", {
        code: coupon,
        amount: totalBeforeDiscount
      });
      setDiscount(data.discount);
      alert(`Coupon Applied ✅ Discount ₹${data.discount}`);
    } catch (err) {
      alert(err.response?.data?.message || "Coupon failed");
    }
  };

  const payNow = async () => {
    setLoading(true);

    const orderRes = await API.post("/orders", {
      items: cart.map((c) => ({ product: c._id, qty: c.qty, price: c.price })),
      totalPrice: finalTotal,
      summary: { subtotal, deliveryCharge, gst, discount }
    });

    const orderId = orderRes.data._id;

    const razorRes = await API.post("/payments/create-order", { amount: finalTotal });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorRes.data.amount,
      currency: "INR",
      name: "Trends Hub",
      description: "Payment for your order",
      order_id: razorRes.data.id,
      handler: async function (response) {
        await API.post("/payments/verify", {
          ...response,
          orderId
        });

        alert("Payment Success ✅ Order Confirmed!");
        clearCart();
      },
      theme: { color: "#fbbf24" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="bg-white shadow rounded-xl p-4 mb-4">
        <h2 className="font-bold mb-2">Order Summary</h2>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Delivery: ₹{deliveryCharge}</p>
        <p>GST (18%): ₹{gst}</p>
        <p className="text-green-600 font-bold">Discount: -₹{discount}</p>
        <hr className="my-2" />
        <p className="font-bold text-lg">Final Total: ₹{finalTotal}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-4 mb-4">
        <h2 className="font-bold mb-2">Apply Coupon</h2>
        <input
          className="border p-2 rounded-lg w-full mb-2"
          placeholder="Enter coupon code (SAVE10)"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button
          onClick={applyCoupon}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold w-full"
        >
          Apply Coupon
        </button>
      </div>

      <button
        disabled={loading}
        onClick={payNow}
        className="bg-yellow-400 px-4 py-2 rounded-lg font-bold w-full"
      >
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </div>
  );
}