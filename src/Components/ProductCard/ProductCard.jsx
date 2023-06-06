// import { useContext } from "react";
// import { useNavigate } from "react-router"
// import { DataContext } from "../../Contexts/DataContext";
// import { NavLink } from "react-router-dom";

// export const ProductCard = ({product}) =>{
//     const navigate = useNavigate();
//     const {state , dispatch } = useContext(DataContext)
//     const {categoryName , _id, price, author, title, rating } = product;
//     const addToCart = async(item)=>{
//         const data = {product : {...item}}
//         // api for post to cart
//         const response = await fetch("/api/user/cart" , {method : "POST" , headers : {"authorization" : localStorage?.getItem("token")} , body : JSON.stringify(data) })
// console.log(await response.json());
// console.log(state)
// const cartItems = await fetch("/api/user/cart", {headers : {
//     "authorization" : localStorage.getItem("token")
// } })
// const {cart} = await cartItems.json()
// console.log("cart1" , cart)
// dispatch({type : "cart-manager" , payload: cart})
// console.log(state);

//     }
//     const addToWishList = async(item)=>{
//         const data = {product : {...item}}
//         // api for post to cart
//         const response = await fetch("/api/user/wishlist" , {method : "POST" , headers : {"authorization" : localStorage?.getItem("token")} , body : JSON.stringify(data) })
// console.log(await response.json());
// console.log(state)
// const wishlistItems = await fetch("/api/user/wishlist", {headers : {
//     "authorization" : localStorage.getItem("token")
// } })
// const {wishlist} = await wishlistItems.json()
// console.log("wishlist add to" , wishlist)
// dispatch({type : "wishlist-manager" , payload: wishlist})
// console.log(state);


//     }
//     const removeFromWishlist = async(productId) =>{
//         try{
//             const response = await fetch(`/api/user/wishlist/${productId}` , {
//                 method : "DELETE",
//                 headers : {"authorization" : localStorage?.getItem("token")}

//             })
//             const {wishlist} = await response.json()
//             dispatch({type : "wishlist-manager" , payload: wishlist})
//             console.log("wishlist after removing" , wishlist);
//         }
//         catch(e){
//             console.error(e);
//         }
//     }
//     return(
//         <div>
//             <li>
//                         <div style={{backgroundColor : "yellow"}}><h3>Title : {title} </h3>
//                      <p>Author : {author}</p>
//                      <p>Price : INR{price} </p>
//                      <p> <strong>Category</strong> : {categoryName} </p>
//                      <p>{rating}</p>
//                      </div>
                    
//                      {state.cartList.find((el) => el._id === _id) ? <NavLink to="/cart"><button>Go to cart</button></NavLink>  : <button onClick={()=>addToCart(product)}> Add to Cart </button>  }
//                      {state.wishList.find((el) => el._id === _id) ? <button onClick={()=>removeFromWishlist(_id)}>Remove from wishlist</button>  : <button onClick={()=>addToWishList(product)}>Add to wish list</button>  }
//                         {/*  remove from wishlist logic here and in wishlist page also dispatch*/}
                     
//                  </li>
//         </div>
//     )
// }