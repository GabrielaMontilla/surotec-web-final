import React, { useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import AuthCard from "../components/layout/AuthCard";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8086/users/login",
        form,
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/dashboard");

      alert("Login exitoso");
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="auth-container">
      <AuthCard>
        <h1>Welcome Back</h1>
        <p>Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email or Username"
            name="username"
            placeholder="student@university.edu"
            value={form.username}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />

          <Button type="submit">Log In</Button>
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;
