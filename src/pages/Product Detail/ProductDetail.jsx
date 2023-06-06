import "./ProductDetail.css";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { DataContext } from "../../Contexts/DataContext";
import * as AiIcon from "react-icons/ai";

const features = [
  "Fastest Delivery",
  "Inclusive of All Taxes",
  "Cash On Delivery Available"
];

export const ProductDetail = () => {
  const { state, addToCart, addToWishList, removeFromWishlist } = useContext(
    DataContext
  );
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = state.productList?.find(({ _id }) => _id === productId);

  if (!product) {
    return <p>Product not found.</p>;
  }
  const {_id, price,imgUrl, title, rating } = product;

  return (
    <div className="product-detail-card">
      <div className="single-card">
        <img src={imgUrl} alt={title} />
        <div className="product-detail">
          <div>
            {" "}
            <h2>{title}</h2>
            <span className="icon-para rating">
              {rating} <AiIcon.AiFillStar color="rgb(75, 214, 29)" size={20} />
            </span>
          </div>
          <hr />
          <div>
            <h3>Price : ₹ {price} </h3>
            <p className="icon-para">
              {" "}
              <AiIcon.AiFillThunderbolt color="yellow" /> Hurry only few left
            </p>
          </div>
          <hr />
          <div className="features-tag">
            {features.map((el) => (
              <p>
                {" "}
                <AiIcon.AiTwotoneTag color="#007bb5" /> {el}
              </p>
            ))}
          </div>
          <div className="buttons">
            {state?.cartList?.find((el) => el._id === _id) ? (
              <button
                className="product-card-button"
                onClick={() => navigate("/cart")}
              >
                Go to cart
              </button>
            ) : (
              <button
                className="product-card-button"
                onClick={() => addToCart(product)}
              >
                {" "}
                Add to Cart{" "}
              </button>
            )}
            {state.wishList.find((el) => el._id === _id) ? (
              <button
                className="product-card-button"
                onClick={() => removeFromWishlist(_id)}
              >
                Remove from Wishlist
              </button>
            ) : (
              <button
                className="product-card-button"
                onClick={() => addToWishList(product)}
              >
                Add to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
