import React, { useState } from "react";
import axios from "axios";
import { Header_2 } from "../../../components/Header_2";
import Swal from "sweetalert2";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";
import { Header_3 } from "../../../components/Header_3";
export const Admin_Login = () => {
  
  const userData = localStorage.getItem('userData');
  
  // Redirect if user is already logged in
  if (userData && userData.role === "admin") {
    window.location.href = '/admindashboard';
  } 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
      });

      if (response.data.status) {
        // Login successful
        console.log("Login successful:", response.data);
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          timer: 1500, // 3 seconds (you can adjust this as needed)
          timerProgressBar: true,
          showConfirmButton: false, // Hide the "OK" button
          willClose: () => {
            // Store the entire response in local storage under a single key
            localStorage.setItem("userData", JSON.stringify(response.data));

            // Redirect to the admin dashboard after the alert closes
            window.location.href = "/admindashboard"; // Replace with the desired URL
          },
        });
      } else {
        setError(response.data.message);
        Swal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
      console.error("Login error:", err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "An error occurred during login.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (


    <div
      className="flex flex-col min-h-screen bg-[#FFFDF7]"
      style={{ fontFamily: "'Nunito'" }}
    >
      <Header_2 />
      <main className="flex mx-20 justify-center items-center">
        <div className="bg-[#E9F1F1] p-8 rounded-lg shadow-md shadow-black w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#FFFDF7] mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#FFFDF7] mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className={`${GlobalStyle.buttonPrimary} w-full`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};
