import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Header } from "../../../components/Header";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";

export const Password_Update = () => {
  const { id } = useParams();
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };


  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validatePasswordForm = () => {
    const newErrors = {};

    // Password validation (must contain uppercase, lowercase, number, and symbol)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordData.password.match(passwordRegex)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.";
    }

    // Confirm password validation
    if (passwordData.password !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submission

    if (!validatePasswordForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/user/update-password/${id}`, // Replace `1` with the actual user ID
        { password: passwordData.password }
      );
      setMessage(response.data.message);
      Swal.fire({
        title: "Update Successful!",
        text: "passeord update successfully!",
        icon: "success"
      });
      setPasswordData({ password: "", confirmPassword: "" }); // Clear password fields
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      Swal.fire({
        title: "Update Fail",
        text: "passeord update failed!",
        icon: "error"
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF7]">
        <Header />
      <main className="flex justify-center mx-20">
        <div className={`w-full max-w-md bg-[#E9F1F1] shadow-md shadow-black p-8 rounded-lg ${GlobalStyle.fontNunito}`} style={{ fontFamily:"Nunito"}}>
          <h1 className={`text-2xl font-semibold text-center mb-10`}>Password Update</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              required
              className="bg-[#FFFDF7] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              className="bg-[#FFFDF7] w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <button
              type="submit"
              className={`${GlobalStyle.buttonPrimary} w-full`}           >
              Update Password
            </button>
        </form>
        </div>
      </main>
    </div>
  );
};
