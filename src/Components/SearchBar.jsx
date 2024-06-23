import React, { useContext, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { useNavigate } from "react-router";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const updatedValue = e.target.value;
    setInputValue(updatedValue);
    dispatch({ type: "search-handle", payload: updatedValue });
    navigate("/products");
  };

  return (
    <>
      <input
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        className="search-bar"
        placeholder="Search for products"
      />
    </>
  );
};
