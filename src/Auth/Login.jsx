import "./Auth.css";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthContext } from "../Contexts/AuthContext";

export const Login = () => {
  const location = useLocation();
  const { userLogin } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  };

  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      email: "",
      password: "",
    };
    if (!formData.email) {
      updatedErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData.password) {
      updatedErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(updatedErrors);
    return isValid;
  };

  const submitHandler = async () => {
    try {
      if (validateForm()) {
        const cred = {
          email: formData.email,
          password: formData.password,
        };
        await userLogin(cred);
        navigate(location.state?.from?.pathname || "/products", {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({ email: "", password: "" });
    }
  };
  const loginAsTestUser = () => {
    const testUserData = {
      email: "adarshbalika@gmail.com",
      password: "adarshbalika",
    };
    userLogin(testUserData);
    navigate("/products", { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-page">
        <h2>Login</h2>
        <div className="label-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter e-mail"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div className="login-buttons">
          <button type="submit" onClick={submitHandler}>
            Login
          </button>
          <button type="submit" onClick={loginAsTestUser}>
            Login as Test User
          </button>
          <strong
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => navigate("/signup", { replace: true })}
          >
            Create New Account{" "}
          </strong>
        </div>
      </div>
    </div>
  );
};
