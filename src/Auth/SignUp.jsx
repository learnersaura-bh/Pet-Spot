import React, { useState } from "react";
import {toast} from "react-toastify"
import { useNavigate } from "react-router";

export const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: "",
    email: '',
    password: '',
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({ ...formData, [fieldName]: fieldValue });
  };
  const validateForm = () => {
    let isValid = true;
    const updatedErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    // Validate First Name
    if (!formData.firstName) {
      updatedErrors.firstName = "First Name is required";
      isValid = false;
    }

    // Validate Last Name
    if (!formData.lastName) {
      updatedErrors.lastName = "Last Name is required";
      isValid = false;
    }

    // Validate Email
    if (!formData.email) {
      updatedErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      updatedErrors.email = "Invalid Email";
      isValid = false;
    }

    // Validate Password
    if (!formData.password) {
      updatedErrors.password = "Password is required";
      isValid = false;
    }

    // Validate Confirm Password
    if (!formData.confirmPassword) {
      updatedErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      updatedErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(updatedErrors);
    return isValid;
  };

  const submitHandler = async (e) => {

    e.preventDefault();
 if (validateForm()){
    try {
        const cred = {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          password: formData.password
        };
  
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify(cred)
        });
  
        const { encodedToken } = await response.json();
  // localStorage.setItem("token" , encodedToken)
        console.log(encodedToken ? "Signed Up after form submission" : "Sign Up Failed");
        toast.success("Signed Up successfully" , {autoClose : 1000});
        navigate("/login")
      } catch (e) {
        console.error(e);
      }
 }

    
  };

  return (
    <div className="login-container">
    <div className="login-page">
        <h2>Sign Up</h2>
        <div className="label-input">
          <label htmlFor="first-name">First Name</label>
          <input type="text" placeholder="Enter first name" id="first-name" name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div className="label-input">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" placeholder="Enter last name" id="last-name" name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div className="label-input">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Enter e-mail" id="email" name="email"
          value={formData.email}
          onChange={handleChange}
          required />
          {errors.email && <span>{errors.email}</span>}
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
          required
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div className="label-input">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
          
          onChange={handleChange}
          required
          name="confirmPassword"
          value={formData.confirmPassword}
          
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        <div className="login-buttons">
          <button onClick={submitHandler} type="submit">Sign Up</button>
        </div>
      </div>
      
    </div>
  );
};
