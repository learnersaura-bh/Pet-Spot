import { ACTION_TYPE } from "../actions/actionTypes";

export const initialState = {
  categories: [],
  productList: [],
  filters: {
    priceSort: null,
    categories: [],
    ratingFilter: null,
  },
  cartList: [],
  wishList: [],
  searchValue: null,
  error: false,
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };

    case ACTION_TYPE.FETCH_CATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ACTION_TYPE.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      };

    case ACTION_TYPE.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPE.SET_FILTER_CATEGORY:
      const isCategoryPresent = state.filters.categories.includes(
        action.payload
      );

      const updatedFilterCategories = isCategoryPresent
        ? state.filters.categories.filter(
            (category) => category !== action.payload
          )
        : [...state.filters.categories, action.payload];

      return {
        ...state,
        filters: { ...state.filters, categories: updatedFilterCategories },
      };
    case ACTION_TYPE.SET_PRICE_SORT:
      return {
        ...state,
        filters: { ...state.filters, priceSort: action.payload },
      };
    case ACTION_TYPE.SET_RATING_FILTER:
      return {
        ...state,
        filters: { ...state.filters, ratingFilter: action.payload },
      };
    case ACTION_TYPE.CLEAR_FILTER:
      return {
        ...state,
        filters: { ...initialState.filters },
      };
    case ACTION_TYPE.SET_CART:
      return {
        ...state,
        cartList: [...action.payload],
      };
    case ACTION_TYPE.SET_WISHLIST:
      return {
        ...state,
        wishList: [...action.payload],
      };
    default:
      return state;
  }
};
