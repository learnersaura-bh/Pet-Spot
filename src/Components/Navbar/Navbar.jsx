import * as FaIcon from "react-icons/fa";
import * as BiIcon from "react-icons/bi";
import "./Navbar.css";
import { SearchBar } from "../SearchBar";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export const Navbar = () => {
  const navigate = useNavigate()
  const {state} = useContext(DataContext)
  return (
    <>
      <div>
        <nav className="nav-bar">
          <h2 onClick={() =>navigate("/")} className="cursor-pointer" >PET SPOT</h2>

          <SearchBar/>
          
          <div className="icons ">
          <div className="nav-icon cursor-pointer "><FaIcon.FaHeart  onClick={()=>navigate("/wishlist")} title="WishList"/>
            <span className={state?.wishList.length > 0 ? "nav-count" : "none"}>{state?.wishList.length > 0 ? state?.wishList.length : "" }</span>
            </div>
            
            <div className="nav-icon cursor-pointer"><FaIcon.FaShoppingCart onClick={()=>navigate("/cart")} title="Cart"/> 
            <span className={state?.cartList.length > 0 ? "nav-count" : "none"}>{state?.cartList.length > 0 ? state?.cartList.length : "" }</span>
            </div>
            {
              !localStorage.getItem("token") ? <BiIcon.BiLogIn className="cursor-pointer" color="white" title="Log In" size={30} onClick={() => navigate("/login")} /> :  <BiIcon.BiLogOut className="cursor-pointer" title="Log Out" color="red" size={30} onClick={() => {localStorage.removeItem("token")
              navigate("/products")} 
            }/>
            }
            
            {/* <FaIcon.FaUser onClick={()=>navigate("/login")} title="User Profile"/> */}
          </div>
        </nav>
      </div>
    </>
  );
};
