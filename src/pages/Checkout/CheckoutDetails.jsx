import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export const CheckoutDetails = ({ selectedAddress }) => {
  const { state } = useContext(DataContext);

  const cartPrice = state?.cartList?.reduce(
    (acc, curr) => acc + curr.qty * curr.price,
    0
  );

  return (
    <div>
      <div>
        {state.cartList.length > 0 ? (
          <div className="cart-price-detail">
            <div className="price-details">
              <h3>Order Details</h3>
              <div>
                <hr />
              </div>
              <div className="price-body">
                <strong>Items</strong> <strong>Quantity</strong>
              </div>
              {state?.cartList.map(({ title, qty }) => (
                <div className="price-body" style={{ fontSize: "12px" }}>
                  <span>{title}</span> <span>{qty}</span>
                </div>
              ))}
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
              <div className="selected-address">
                {selectedAddress?.id ? (
                  <div>
                    <h3>Deliver To:</h3>
                    <h4>{selectedAddress.name}</h4>
                    <p>
                      {selectedAddress.street} , {selectedAddress.city}{" "}
                    </p>
                    <p>State : {selectedAddress.state}</p>
                    <p>Zip Code : {selectedAddress.zip}</p>
                  </div>
                ) : (
                  <p>No address selected. Please choose an address.</p>
                )}
              </div>
              <button className="checkout-btn">Place Order</button>
            </div>
          </div>
        ) : (
          <h3>No items in cart right now :( </h3>
        )}
      </div>
    </div>
  );
};
