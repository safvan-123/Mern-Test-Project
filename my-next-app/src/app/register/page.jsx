"use client";
import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css"; // Import the CSS file for styling
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        form
      );
      localStorage.setItem("token", res.data.token);
      alert("Registered successfully!");
      router.push("/login");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Create an Account</h2>
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <button className="register-btn" onClick={register}>
          Register
        </button>
        <div className="divider">OR</div>
        <a href={`${process.env.REACT_APP_API}/api/auth/google`}>
          <button className="google-btn">Register with Google</button>
        </a>
      </div>
    </div>
  );
}

export default Register;
