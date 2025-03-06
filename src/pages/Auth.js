import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../services/api";
import "./Auth.css";

const Auth = ({ isRegister }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic form validation
    if (!form.email || !form.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (isRegister && (!form.firstName || !form.lastName)) {
      setError("Please provide first and last name");
      return;
    }

    try {
      const response = isRegister 
        ? await registerUser(form) 
        : await loginUser(form);

      // Prepare user data to store
      console.log("data......",response.data);
      
      const userData = {
        token: response.data.token,
        userId: response.data.user.id,
        email: form.email,
        firstName: form.firstName || "",
        lastName: form.lastName || ""
      };

      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userId", userData.userId);

      // Show success message and navigate
      alert(`${isRegister ? "Registration" : "Login"} successful!`);
      navigate("/hotels");

    } catch (error) {
      // Handle error
      const errorMessage = error.response?.data?.error || "An unexpected error occurred";
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        
        {error && <div className="error-message">{error}</div>}

        {isRegister && (
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-button">
          {isRegister ? "Register" : "Login"}
        </button>

        <div className="auth-switch">
          {isRegister ? (
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;