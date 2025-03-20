import React, { useState } from "react";
import axios from "axios";
import { Header_2 } from "../../../components/Header_2";

export const User_Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));

  try {
    if (user.role === "user" || user.role === "USER" || user.role === "User") {
      window.location.href = "/userprofile";
    }
  } catch (err) {
    console.error("Error checking user role:", err);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      if (response.data.status) {
        // Login successful
        console.log("Login successful:", response.data);
        alert("Login successful!");

        // Store the entire response in local storage under a single key
        localStorage.setItem("userData", JSON.stringify(response.data));

        // Redirect to the user profile page
        window.location.href = "/userprofile";
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header_2 />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};