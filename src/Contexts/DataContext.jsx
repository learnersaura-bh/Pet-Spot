import { createContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from 'react-toastify';
export const DataContext = createContext()
const initialState = { category : [] , productList : [] , filters : {
    priceSort: null,
    categories: [],
    ratingFilter: null,
  }, cartList:[],
wishList : [],
searchValue : null }
// Reducer Function
const DataReducer = (state , action) =>{
switch(action.type){
    case "category_handle":
        return{...state , category : action.payload}
    case "productFetch":
        return{...state , productList : action.payload}
    case "price-order":
        return{...state, filters:{...state.filters , priceSort : action.payload}}
    case "handleByCategory":
                const isCheckboxAlreadyPresent = state.filters.categories.find((category)=> category === action.payload )
        return{...state , filters : { ...state.filters , categories : isCheckboxAlreadyPresent ? state.filters.categories.filter((category)=> category !== action.payload) : [...state.filters.categories , action.payload] }}
    case "set-rating-filter":
        return {...state , filters:{...state.filters , ratingFilter : action.payload}}
    case "clear-filter":
        return {...state , filters : initialState.filters }
    case "cart-manager":
        return {...state , cartList : action.payload}
    case "wishlist-manager":
        return {...state , wishList : action.payload}
    case "search-handle":
        return{...state , searchValue : action.payload}
    case "INCREMENT_QUANTITY":
            return {
              ...state,
              cartList: state.cartList.map((item) =>
                item._id === action.payload ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          case "DECREMENT_QUANTITY":
            return {
              ...state,
              cartList: state.cartList.map((item) =>
                item._id === action.payload && item.qty > 1
                  ? { ...item, qty: item.qty - 1 }
                  : item
              ),
            };
        default:
            return state
}
}

export const DataProvider = ({children})=>{
    const [state , dispatch] = useReducer(DataReducer , initialState)
    const navigate = useNavigate()
  const location = useLocation()
const [categoryName , setCategoryName] = useState("")
const getProductAndCategoryData = async() =>{
try{
const res = await fetch("/api/categories")
const {categories} = await res.json()
console.log( categories);
dispatch({type : "category_handle" , payload : categories})

const productList = await fetch("/api/products" )
const {products} =await productList.json()
console.log("products" , products)
dispatch({type: "productFetch" , payload : products})

}
catch(e){
    console.error(e);
}
}

    useEffect(()=>{
getProductAndCategoryData()
    },[])
    const addToCart = async (item) => {
        const data = { product: { ...item } };
      
        if (localStorage?.getItem("token")) {
          const response = await fetch("/api/user/cart", {
            method: "POST",
            headers: {
              "authorization": localStorage?.getItem("token"),
              "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
          });
      
          console.log(await response.json());
          console.log(state);
      
          // Fetch updated cart items
          const cartItems = await fetch("/api/user/cart", {
            headers: {
              "authorization": localStorage.getItem("token")
            }
          });
      
          const { cart } = await cartItems.json();
          console.log("cart1", cart);
      
          // Dispatch action to update cart in state
          dispatch({ type: "cart-manager", payload: cart });
          console.log(state);
          toast.success("Added To Cart" , {
            autoClose: 1000})
        } else {
          // Redirect to login page
          navigate("/login", { state: { from: location }, replace: true });
        }
        
      };
      const removeFromCart = async(productId) =>{
        try{
          const response = await fetch(`/api/user/cart/${productId}` , {
              method : "DELETE",
              headers : {"authorization" : localStorage?.getItem("token")}

          })
          const {cart} = await response.json()
          dispatch({type : "cart-manager" , payload: cart})
          console.log("cart after removing" , cart);
      }
      catch(e){
          console.error(e);
      }
      toast.success('Removed from cart' , {
        autoClose: 1000})
      }
      const addToWishList = async(item)=>{
        const data = {product : {...item}}
        if (localStorage?.getItem("token")) {
          const response = await fetch("/api/user/wishlist" , {method : "POST" , headers : {"authorization" : localStorage?.getItem("token")} , body : JSON.stringify(data) })
          console.log(await response.json());
          console.log(state)
          const wishlistItems = await fetch("/api/user/wishlist", {headers : {
            "authorization" : localStorage.getItem("token")
          } })
          const {wishlist} = await wishlistItems.json()
          console.log("wishlist add to" , wishlist)
          dispatch({type : "wishlist-manager" , payload: wishlist})
          console.log(state);
          
          toast.success('Added to Wishlist' , {
            autoClose: 1000})
        
        } else {
          // Redirect to login page
          navigate("/login", { state: { from: location }, replace: true });
        }
        // api for post to cart
            }
    const removeFromWishlist = async(productId) =>{
        try{
            const response = await fetch(`/api/user/wishlist/${productId}` , {
                method : "DELETE",
                headers : {"authorization" : localStorage?.getItem("token")}
  
            })
            const {wishlist} = await response.json()
            dispatch({type : "wishlist-manager" , payload: wishlist})
            console.log("wishlist after removing" , wishlist);
        }
        catch(e){
            console.error(e);
        }
        toast.success('Removed from Wishlist' , {
          autoClose: 1000})
    }

    return(
        <DataContext.Provider value={{ categoryName , setCategoryName , state ,dispatch , addToCart, removeFromCart , addToWishList , removeFromWishlist}}>
            {children}
        </DataContext.Provider>
    )
}