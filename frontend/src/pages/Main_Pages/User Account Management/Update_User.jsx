import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Header } from "../../../components/Header";
import GlobalStyle from "../../../assets/Prototype/GlobalStyle";



export const Update_User = () => {
  const {id} = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob: "",
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`); // Replace `1` with the actual user ID
        setUserData({
          name: response.data.name,
          email: response.data.email,
          dob: response.data.dob,
        });
      } catch (error) {
        setMessage("Failed to fetch user data.");
      }
    };
    fetchUserData();
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const validateUserForm = () => {
    const newErrors = {};

    // Name validation (only alphabets and spaces allowed)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!userData.name.match(nameRegex)) {
      newErrors.name = "Name should only contain alphabets and spaces.";
    }

    // DOB validation (cannot be a future date)
    const currentDate = new Date();
    const selectedDate = new Date(userData.dob);
    if (selectedDate > currentDate) {
      newErrors.dob = "Date of birth cannot be in the future.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

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

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submission

    if (!validateUserForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.put(`http://localhost:5000/user/${id}`, userData); // Replace `1` with the actual user ID
      setMessage(response.data.message);
      Swal.fire({
        title: "Update Successful!",
        text: "user details updated successfully!",
        icon: "success"
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
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
    }
  };

  return (
    <div className="flex flex-col items-center min-h-full bg-[#FFFDF7]" style={{fontFamily:"'Nunito"}}>

      <Header />
     <main className="flex mx-20 justify-center items-center">
     <div className={`bg-[#E9F1F1] p-8 rounded-lg shadow-lg w-full`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Update User</h2>
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Update User Details Section */}
        <form onSubmit={handleUserSubmit} className="space-y-4 mb-8 min-h-full w-[400px]">
          <h3 className="text-xl font-semibold mb-4">Update User Details</h3>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={userData.name}
              onChange={handleUserChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
              value={userData.email}
              onChange={handleUserChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleUserChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>
          <button
              type="submit"
              className={`${GlobalStyle.buttonPrimary} w-full`}           >
              Update Details
            </button>
        </form>

        {/* Update Password Section */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Update Password</h3>
          <div>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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