import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    window.location.href = "/admin/dashboard";
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-red-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl dark:bg-gray-900">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
          Admin Panel
        </h1>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-red-700 dark:bg-red-200 dark:text-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-transparent px-4 pb-2 pt-5 text-gray-900 placeholder-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500"
            />
            <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-red-600 dark:peer-focus:text-red-500">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full rounded-xl border border-gray-300 bg-transparent px-4 pb-2 pt-5 text-gray-900 placeholder-transparent focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-gray-700 dark:text-white dark:focus:border-red-500 dark:focus:ring-red-500"
            />
            <label className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-red-600 dark:peer-focus:text-red-500">
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2026 Portfolio Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;
