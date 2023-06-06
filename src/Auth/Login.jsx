import "./Auth.css"
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router";

export const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
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
      password: ""
    };

    // Validate Email
    if (!formData.email) {
      updatedErrors.email = "Email is required";
      isValid = false;
    }

    // Validate Password
    if (!formData.password) {
      updatedErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const cred = {
          email: formData.email,
          password: formData.password
        };

        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(cred)
        });

        // const data  = await response.json();
const {encodedToken} = await response.json()
localStorage.setItem("token" , encodedToken)
        if (encodedToken) {
          // Login successful
          console.log("Logged in");
          console.log(encodedToken);
          localStorage.setItem("token" , encodedToken)
          setFormData({
            email: "",
            password: ""
          });
          toast.success("Logged In successfully" , {autoClose : 1000});
          navigate(location?.state?.from?.pathname || "/products" )
        } else {
          // Login failed
          console.log("Login failed");
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    
  };
 const loginAsTestUser = () => {
  setFormData({email: "adarshbalika@gmail.com",
            password: "adarshbalika"}) 
            submitHandler()
 }
  return (
    <div className="login-container">
       <div className="login-page">
        <h2>Login</h2>
        <div className="label-input">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter e-mail" id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required />
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
          <button type="submit" onClick={submitHandler}>Login</button>
          <button type="submit" onClick={loginAsTestUser } >Login as Test User</button>
          <strong style={{color: "green" , cursor: "pointer"}} onClick={() => navigate("/signup")}>Create New Account  </strong>
        </div>
      </div>
    </div>
  );
};
