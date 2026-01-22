import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Login Successful ✅");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <div className="bg-white p-6 rounded-xl shadow w-[380px]">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-3 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3 rounded-lg"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-yellow-400 w-full py-2 rounded-lg font-bold"
        >
          Login
        </button>

        <p className="text-sm mt-3">
          Don’t have an account?{" "}
          <Link className="text-blue-600" to="/register">
            Register
          </Link>
        </p>

        <p className="text-sm mt-2">
          <Link className="text-blue-600" to="/forgot-password">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}