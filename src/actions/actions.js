import { ACTION_TYPE } from "./actionTypes";

export const fetchCategoriesSuccess = (categories) => ({
  type: ACTION_TYPE.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesError = (error) => ({
  type: ACTION_TYPE.FETCH_CATEGORIES_ERROR,
  payload:
    "Error while fetching categories, Please contact me on saurabhmern@gmail.com",
  error,
});

export const fetchProductsSuccess = (products) => ({
  type: ACTION_TYPE.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsError = (error) => ({
  type: ACTION_TYPE.FETCH_PRODUCTS_ERROR,
  payload:
    "Error while fetching categories, Please contact me on saurabhmern@gmail.com",
  error,
});

export const clearFilter = () => ({
  type: ACTION_TYPE.CLEAR_FILTER,
});

export const setCategoryFilter = (category) => ({
  type: ACTION_TYPE.SET_FILTER_CATEGORY,
  payload: category,
});

export const setPriceSort = (order) => ({
  type: ACTION_TYPE.SET_PRICE_SORT,
  payload: order,
});

export const setRatingFilter = (rating) => ({
  type: ACTION_TYPE.SET_RATING_FILTER,
  payload: rating,
});

export const setCart = (cart) => ({
  type: ACTION_TYPE.SET_CART,
  payload: cart,
});
export const setWishlist = (wishlist) => ({
  type: ACTION_TYPE.SET_WISHLIST,
  payload: wishlist,
});
