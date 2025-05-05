"use client";

import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await axios.post(
        "https://mern-test-project-5.onrender.com/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      alert("Logged in successfully!");
      router.push("/users"); // navigate to users page after login
    } catch (err) {
      alert(err?.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="login-btn" onClick={login}>
          Login
        </button>
        <div className="divider">OR</div>
        <a href="https://mern-test-project-5.onrender.com/api/auth/google">
          <button className="google-btn">Login with Google</button>
        </a>
      </div>
    </div>
  );
}

export default Login;
