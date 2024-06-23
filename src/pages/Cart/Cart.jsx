import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { useNavigate } from "react-router";
import "./Cart.css";
export const Cart = () => {
  const navigate = useNavigate();
  const {
    state,
    addToWishList,
    removeFromWishlist,
    removeFromCart,
    updateCartItemQuantity,
  } = useContext(DataContext);

  const cartPrice = state?.cartList?.reduce(
    (acc, curr) => acc + curr.qty * curr.price,
    0
  );
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Cart</h2>
      <div className="cart-page">
        <div className="cart-items">
          {state.cartList.map((item) => {
            const { _id, price, title, qty, imgUrl } = item;

            return (
              <div className="cart-item">
                <div className="single-cart-card">
                  <img src={imgUrl} alt={title} />
                  <div className="cart-product-detail">
                    <div>
                      <h4>{title}</h4>
                    </div>
                    <div>
                      <hr />
                    </div>
                    <div>
                      <h4>Price : ₹{price * qty}</h4>
                    </div>
                    <div>
                      <hr />
                    </div>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateCartItemQuantity(_id, "decrement", qty)
                        }
                      >
                        -
                      </button>
                      <span>{qty}</span>
                      <button
                        onClick={() => updateCartItemQuantity(_id, "increment")}
                      >
                        +
                      </button>
                    </div>
                    <div className="buttons">
                      <button
                        className="product-card-button"
                        onClick={() => removeFromCart(_id)}
                      >
                        Remove from Cart
                      </button>
                      {state.wishList.find((el) => el._id === _id) ? (
                        <button
                          className="product-card-button"
                          onClick={() => removeFromWishlist(_id)}
                        >
                          Remove from Wishlist
                        </button>
                      ) : (
                        <button
                          onClick={() => addToWishList(item)}
                          className="product-card-button"
                        >
                          Add to Wishlist
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {state.cartList.length > 0 ? (
          <div className="cart-price-detail">
            <div className="price-details">
              <h3>Price Details</h3>
              <div>
                <hr />
              </div>
              <div className="price-body">
                <span>Price({state?.cartList?.length || 0} items)</span>{" "}
                <span>₹{cartPrice}</span>
              </div>
              <div className="price-body">
                <span>Delivery Charges</span> <span>₹100</span>
              </div>
              <div>
                <hr />
              </div>
              <div className="price-body">
                <strong>Total Price</strong> <span>₹{cartPrice + 100}</span>
              </div>
              <div>
                <hr />
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="checkout-btn"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <h3>No items in cart right now :( </h3>
        )}
      </div>
    </div>
  );
};
