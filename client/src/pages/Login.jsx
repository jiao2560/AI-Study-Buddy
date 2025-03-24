import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
    const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, {
        email: form.email,
        password: form.password,
      });

      const { token, userId, role } = res.data;

      // ✅ Save token (for now just localStorage)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      setMessage("✅ Login successful!");
        navigate("/dashboard");
   
      // TODO: Redirect to homepage or dashboard
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.error || "Login failed"}`);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
