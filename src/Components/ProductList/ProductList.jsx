

// import {useNavigate} from "react-router"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import * as AiIcon from "react-icons/ai";
import "./ProductList.css";
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
export const ProductList = ({ item }) => {

  const { categoryName, _id, price, imgUrl, title, rating } = item;
  const navigate = useNavigate()
  const location = useLocation()
    const {state , dispatch , addToCart , addToWishList , removeFromWishlist} = useContext(DataContext)
    
    console.log("state" , state)

  
  
 

  return (
    <li key={_id}>
      <div className="card" >
        <img src={imgUrl} alt={title} onClick={() => navigate(`/products/${_id}`)} />
        <span>
          {state.wishList.find((el) => el._id === item._id) ? <AiIcon.AiFillHeart
            color="red"
            className="wishlist"
            size={32}
            title="Remove from wishlist"
            onClick={()=>removeFromWishlist(_id)}
          /> : <AiIcon.AiOutlineHeart
            color="red"
            className="wishlist"
            size={32}
            title="Add to wishlist"
            onClick={()=>addToWishList(item)}
          /> }
          
          
        </span>
        <h4 className="product-name">{title}</h4>
        <div className="price-rating">
          <p>Price : ₹{price} </p>
          <span className="rating">
            {rating} <AiIcon.AiFillStar color="green" size={20} />
          </span>
        </div>
{state?.cartList?.find((el) => el._id === item._id) ? <button className="add-to-cart" onClick={() => navigate("/cart")}>Go to cart</button>  : <button onClick={()=>addToCart(item)} className="add-to-cart"> Add to Cart </button>  }

      </div>
    </li>
  );
};

