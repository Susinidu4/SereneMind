import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Header } from "../../../components/Header";
import { Link } from "react-router-dom";

export const User_Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear errors when the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation (only alphabets and spaces allowed)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.name.match(nameRegex)) {
      newErrors.name = "Name should only contain alphabets and spaces.";
    }

    // DOB validation (cannot be a future date)
    const currentDate = new Date();
    const selectedDate = new Date(formData.dob);
    if (selectedDate > currentDate) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    // Password validation (must contain uppercase, lowercase, number, and symbol)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password.match(passwordRegex)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submission

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post("http://localhost:5000/user", formData);
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "", dob: "", role: "" });
      Swal.fire({
        title: "User Registered Successfully!",
        icon: "success"
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{fontFamily: "'Nunito'"}} className="bg-[#FFFDF7]">
      <Header />
      <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-[#E9F1F1] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#FFFDF7] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#FFFDF7] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#FFFDF7] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-3 bg-[#FFFDF7] py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 bg-[#FFFDF7] py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
          </select>
          <button
            type="submit"
            className="w-full bg-[#92C9B1] text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>

          <Link to={`/login`}>
           <p className="text-center mt-4 font-bold">All ready have an account? <span className="text-[#92C9B1]">Sign in</span></p>
           </Link>
        </form>
      </div>
    </div>
    </div>
  );
};