import { createContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { DataReducer, initialState } from "../reducer/DataReducer";
import {
  fetchCategoriesSuccess,
  fetchCategoriesError,
  fetchProductsSuccess,
  fetchProductsError,
  setWishlist,
  setCart,
} from "../actions/actions";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const encodedToken = localStorage.getItem("token");
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch("/api/categories");
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const { categories } = await categoryResponse.json();
        dispatch(fetchCategoriesSuccess(categories));

        const productResponse = await fetch("/api/products");
        if (!productResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const { products } = await productResponse.json();
        dispatch(fetchProductsSuccess(products));
      } catch (error) {
        dispatch(fetchCategoriesError(error.message));
        dispatch(fetchProductsError(error.message));
      }

      if (encodedToken) {
        try {
          const cartResponse = await fetch("/api/user/cart", {
            headers: { authorization: encodedToken },
          });
          if (!cartResponse.ok) {
            throw new Error("Failed to fetch cart");
          }
          const cartData = await cartResponse.json();
          dispatch(await setCart(cartData.cart));
          const wishlistResponse = await fetch("/api/user/wishlist", {
            headers: { authorization: encodedToken },
          });
          if (!wishlistResponse.ok) {
            throw new Error("Failed to fetch wishlist");
          }
          const wishlistData = await wishlistResponse.json();
          dispatch(await setWishlist(wishlistData.wishlist));
        } catch (error) {
          console.log("Error fetching cart or wishlist: ", error);
        }
      }
    };

    fetchData();
  }, [encodedToken, dispatch]);

  const addToCart = async (item) => {
    const data = { product: { ...item } };
    console.log("add to cart", data);

    if (localStorage?.getItem("token")) {
      const cartResponse = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          authorization: localStorage?.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { cart } = await cartResponse.json();
      dispatch(setCart(cart));
      toast.success("Added To Cart", {
        autoClose: 1000,
      });
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/api/user/cart/${productId}`, {
        method: "DELETE",
        headers: { authorization: localStorage?.getItem("token") },
      });
      const { cart } = await response.json();
      dispatch(setCart(cart));
    } catch (e) {
      console.error(e);
    }
    toast.success("Removed from cart", {
      autoClose: 1000,
    });
  };

  const updateCartItemQuantity = async (itemId, actionType, itemQuantity) => {
    try {
      if (itemQuantity === 1 && actionType === "decrement") {
        removeFromCart(itemId);
      }
      const response = await fetch(`/api/user/cart/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          action: {
            type: actionType,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${actionType} item quantity`);
      }

      const { cart } = await response.json();
      dispatch(setCart(cart));
      toast.success("Updated Cart Item Quantity", { autoClose: 70 });
    } catch (error) {
      console.log(`Error ${actionType}ing quantity:`, error);
    }
  };

  const addToWishList = async (item) => {
    const data = { product: { ...item } };
    if (localStorage?.getItem("token")) {
      const wishlistResponse = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: { authorization: localStorage?.getItem("token") },
        body: JSON.stringify(data),
      });
      const { wishlist } = await wishlistResponse.json();
      dispatch(setWishlist(wishlist));

      toast.success("Added to Wishlist", {
        autoClose: 1000,
      });
    } else {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/api/user/wishlist/${productId}`, {
        method: "DELETE",
        headers: { authorization: localStorage?.getItem("token") },
      });
      const { wishlist } = await response.json();
      dispatch(setWishlist(wishlist));
    } catch (e) {
      console.error(e);
    }
    toast.success("Removed from Wishlist", {
      autoClose: 1000,
    });
  };

  return (
    <DataContext.Provider
      value={{
        categoryName,
        setCategoryName,
        state,
        dispatch,
        addToCart,
        removeFromCart,
        addToWishList,
        removeFromWishlist,
        updateCartItemQuantity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
