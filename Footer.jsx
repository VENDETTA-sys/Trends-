export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-6">
        <div>
          <h2 className="text-yellow-400 font-bold text-lg">Trends Hub</h2>
          <p className="text-sm mt-2">
            Your one-stop shop for fashion, trends and premium deals.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Home</p>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Orders</p>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Cart</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Support</h3>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Help Center</p>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Returns</p>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Contact Us</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Instagram</p>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">YouTube</p>
          <p className="text-sm hover:text-yellow-400 cursor-pointer">Twitter</p>
        </div>
      </div>

      <div className="border-t border-slate-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Trends Hub. All rights reserved.
      </div>
    </footer>
  );
}