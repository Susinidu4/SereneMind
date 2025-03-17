import React, { useState } from "react";
import axios from "axios";
import "../User Account Management/User_Login.css"; // Import the CSS file

export const Admin_Login = () => {
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
                alert("Login successful!");
    
                // Store the entire response in local storage under a single key
                localStorage.setItem("userData", JSON.stringify(response.data));
    
                // Redirect to the user profile page
                window.location.href = "/admindashboard";
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
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

