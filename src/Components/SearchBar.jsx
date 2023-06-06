import React, { useContext, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import { useNavigate } from "react-router";



export const SearchBar = () => {
  const [inputValue, setInputValue] = useState(""); // Added array brackets []
  const { state, dispatch } = useContext(DataContext);
const navigate = useNavigate()
  const handleInputChange = (e) => {
    const updatedValue = e.target.value;
    setInputValue(updatedValue);
    dispatch({ type: "search-handle", payload: updatedValue });
    navigate("/products")
  };

//   const dispatchSearchValue = () => {
//     dispatch({ type: "search-handle", payload: inputValue });
//   };

  return (
    <>
      <input type="search" value={inputValue} onChange={handleInputChange} className="search-bar" placeholder="Search for products"/>
      {/* <button onClick={dispatchSearchValue}>Search</button> Added a search button */}
    </>
  );
};