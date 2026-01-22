import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data } = await API.get(`/products/${id}`);
    setProduct(data);
    if (data.images?.length) setActiveImg(data.images[0]);
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
      <div>
        <img
          src={activeImg || "https://via.placeholder.com/400"}
          className="rounded-xl w-full h-[400px] object-cover"
        />

        {product.images?.length > 1 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImg(img)}
                className={`h-16 w-16 object-cover rounded-lg cursor-pointer border-2 ${
                  activeImg === img ? "border-yellow-400" : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500 mt-1">{product.category}</p>

        <p className="text-yellow-500 font-bold mt-2">
          ⭐ {product.rating} ({product.numReviews})
        </p>

        <p className="text-3xl font-extrabold text-blue-600 mt-4">₹{product.price}</p>

        <p className="text-gray-700 mt-3">{product.description}</p>

        <button
          onClick={() => {
            addToCart(product);
            alert("Added to cart ✅");
          }}
          className="bg-yellow-400 w-full py-3 rounded-xl font-bold mt-5"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}