import React, { useState } from "react";
import axios from "axios";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (currentState === "Sign up") {
        await axios.post("http://localhost:5000/api/auth/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        setError("");
        alert("Account created! You can now log in.");
        setCurrentState("Login");
      } else {
        await axios.post("http://localhost:5000/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        setError("");
        alert("Login successful!");
        setShowLogin(false);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
    setLoading(false);
  };
  return (
    <div className="login-popup">
  <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? null : (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
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
        </div>

        <button disabled={loading}>
          {loading
            ? (currentState === "Sign up" ? "Creating..." : "Logging in...")
            : (currentState === "Sign up" ? "Create Account" : "Login")}
        </button>
        {error && (
          <div style={{ color: "#ff3300", marginTop: 8, fontWeight: 500 }}>
            {error}
          </div>
        )}

        {currentState === "Sign up" ? (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        ) : (
          <></>
        )}

        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
