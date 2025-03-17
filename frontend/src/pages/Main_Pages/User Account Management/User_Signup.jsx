import React, { useState } from "react";
import axios from "axios";
import "./SignupForm.css";

export const User_Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submission

    try {
      const response = await axios.post("http://localhost:5000/user", formData);
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "", dob: "", role: "" });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};


