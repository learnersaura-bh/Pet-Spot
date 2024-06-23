import * as FaIcon from "react-icons/fa";
import * as BiIcon from "react-icons/bi";
import "./Navbar.css";
import { SearchBar } from "../SearchBar";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { useAuthContext } from "../../Contexts/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { state } = useContext(DataContext);
  const { token, userLogout } = useAuthContext();
  return (
    <>
      <div>
        <nav className="nav-bar">
          <div
            className="pet-shop-logo cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://cdn3.iconfinder.com/data/icons/dog-avatars/192/dog-avatar-glasses-nerd-2svg-256.png"
              // src="https://supertails.com/cdn/shop/files/supertails-logo-for-dark-theme_200x_2x_200x_2x_909b1df1-0f68-4734-9eeb-1d0e0a39c91f.webp?v=1705757214&width=250"
              alt="pet-shop"
            />

            <h2>PET SPOT</h2>
          </div>
          <SearchBar />

          <div className="icons ">
            <div className="nav-icon cursor-pointer ">
              <FaIcon.FaHeart
                onClick={() => navigate("/wishlist")}
                title="WishList"
              />
              <span
                className={
                  state?.wishList.length > 0 && localStorage.getItem("token")
                    ? "nav-count"
                    : "none"
                }
              >
                {state?.wishList.length > 0 && localStorage.getItem("token")
                  ? state?.wishList.length
                  : ""}
              </span>
            </div>

            <div className="nav-icon cursor-pointer">
              <FaIcon.FaShoppingCart
                onClick={() => navigate("/cart")}
                title="Cart"
              />
              <span
                className={
                  state?.cartList.length > 0 && localStorage.getItem("token")
                    ? "nav-count"
                    : "none"
                }
              >
                {state?.cartList.length > 0 && localStorage.getItem("token")
                  ? state?.cartList.length
                  : ""}
              </span>
            </div>
            <div className="nav-icon cursor-pointer">
              {!token ? (
                <BiIcon.BiLogIn
                  color="white"
                  title="Log In"
                  size={30}
                  onClick={() => navigate("/login")}
                />
              ) : (
                <BiIcon.BiLogOut
                  title="Log Out"
                  color="red"
                  size={30}
                  onClick={() => {
                    userLogout();
                    navigate("/products");
                  }}
                />
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
