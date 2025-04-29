"use client";
import React, { useState } from "react";
import axios from "axios";
import {} from "react";
import "../styles/Login.css"; // Import the new CSS file for styling
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      alert("Logged in successfully!");
      router.push("/users");
    } catch (err) {
      console.log(err.response.data.msg);
      alert(err.response.data.msg);
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
        <a href={"http://localhost:8080/api/auth/google"}>
          <button className="google-btn">Login with Google</button>
        </a>
      </div>
    </div>
  );
}

export default Login;
