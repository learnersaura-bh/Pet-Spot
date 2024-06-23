import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const userSignup = async (user) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(user),
      });

      const { encodedToken } = await response.json();
      localStorage.setItem("token", encodedToken);
      setToken(encodedToken);
      toast.success("Signed Up successfully", { autoClose: 1000 });
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };

  const userLogin = async (user) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const { encodedToken } = await response.json();
        localStorage.setItem("token", encodedToken);
        setToken(encodedToken);
        toast.success("Logged In successfully", { autoClose: 1000 });
      } else if (response.status === 404) {
        throw new Error("The e-mail you entered is not registered.");
      } else if (response.status === 401) {
        throw new Error("Password or e-mail is wrong.");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      toast.error(error.message);
      throw new Error("Login Failed");
    }
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged Out successfully", { autoClose: 1000 });
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken, userSignup, userLogin, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
