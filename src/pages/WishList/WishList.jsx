import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import * as AiIcon from "react-icons/ai";
import "./Wishlist.css";
export const WishList = () => {
  const {
    state,
    addToCart,
    removeFromWishlist,
    updateCartItemQuantity,
  } = useContext(DataContext);

  const addToCartFromWishlist = (item) => {
    state.cartList.find(({ _id }) => _id === item._id)
      ? updateCartItemQuantity(item._id, "increment")
      : addToCart(item);
  };
  return (
    <div className="wishlist-page">
      <h2>Wishlist</h2>
      {state?.wishList.length > 0 ? (
        <div className="wishlist-container">
          {state.wishList.map((item) => {
            const { _id, price, title, rating, imgUrl } = item;
            return (
              <div className="single-wishlist-card">
                <div className="wishlist-card-image">
                  <img src={imgUrl} alt={title} />
                </div>
                <div className="wishlist-product-detail">
                  <div>
                    <h4>{title}</h4>
                    <span className="rating">
                      {rating}
                      <AiIcon.AiFillStar color="#FFD700" />
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
