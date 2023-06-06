import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import * as AiIcon from "react-icons/ai";
import "./Wishlist.css";
export const WishList = () => {
  const { state, dispatch, addToCart, removeFromWishlist } = useContext(
    DataContext
  );

  const addToCartFromWishlist = (item) => {
    state.cartList.find(({ _id }) => _id === item._id)
      ? dispatch({ type: "INCREMENT_QUANTITY", payload: item._id })
      : addToCart(item);
  };
  return (
    <div className="wishlist-container">
      {state?.wishList.length > 0 ? (
        <div>
          {state.wishList.map((item) => {
            const { _id, price, title, rating, imgUrl } = item;
            return (
              <div className="single-wishlist-card">
                <img src={imgUrl} alt={title} height="150px" width="120px" />
                <div className="wishlist-product-detail">
                  <div>
                    {" "}
                    <h4>{title}</h4>
                    <span className="icon-para rating">
                      {rating}{" "}
                      <AiIcon.AiFillStar color="rgb(75, 214, 29)" size={20} />
                    </span>
                  </div>
                  <hr />
                  <div>
                    <h4>Price : ₹{price}</h4>
                  </div>
                  <hr />

                  <div className="buttons">
                    <button
                      className="product-card-button"
                      onClick={() => {
                        addToCartFromWishlist(item);
                        removeFromWishlist(_id);
                      }}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="product-card-button"
                      onClick={() => removeFromWishlist(_id)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>No items in wishlist now :(</h3>
      )}
    </div>
  );
};
