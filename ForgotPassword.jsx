import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await API.post("/otp/send", { email });
      alert("OTP sent ✅ Check your email");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.message || "OTP send failed");
    }
  };

  const resetPassword = async () => {
    try {
      await API.post("/otp/verify-reset", { email, otp, newPassword });
      alert("Password reset successful ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      <div className="bg-white p-6 rounded-xl shadow w-[380px]">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              className="border p-2 w-full mb-3 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              className="bg-yellow-400 w-full py-2 rounded-lg font-bold"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="border p-2 w-full mb-3 rounded-lg"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              className="border p-2 w-full mb-3 rounded-lg"
              placeholder="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={resetPassword}
              className="bg-slate-900 text-white w-full py-2 rounded-lg font-bold"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}