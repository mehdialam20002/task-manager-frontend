"use client";
import { useState } from "react";
import api from "@/lib/api";
import { saveToken } from "@/lib/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      saveToken(res.data.accessToken);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        <input
          className="border border-gray-300 p-3 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border border-gray-300 p-3 rounded w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-blue-600 text-white w-full py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          New here?{" "}
          <a href="/register" className="text-blue-600 font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
