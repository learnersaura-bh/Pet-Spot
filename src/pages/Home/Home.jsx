import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import {useNavigate  } from "react-router"

import "./Home.css"
export const Home = () => {
    const { state, dispatch } = useContext(DataContext);
    const navigate = useNavigate()
    return (
      <div className="home">
        <section class="container">
  <div class="call">
    <h1 class="spot-title">Pet Spot</h1>
    <p class="spot-description">The Best A Pet Can Get</p>
    <button class="shop-button" onClick={() => navigate("/products")}>Shop Now</button>
  </div>
  <img class="spot-image"
    src="https://d11d9oqz0intmj.cloudfront.net/PmTkdOuVNHihJQx.png"
    alt="pet spot"
  />
</section>

        <div className="category-container">
      {state.category?.map(({ _id , categoryName, imageUrl }) => (
        <li key={_id}>
          <div className="pets-category">
            {" "}
            <img className="pets-image" src={imageUrl} alt={categoryName} onClick={() =>{ navigate("/products")
        dispatch({type : "handleByCategory" , payload: categoryName})
          }} />
            <h3>{categoryName}</h3>
          </div>
        </li>
      ))}
    </div>
    {/* <footer>
      <h1> links</h1>
    </footer> */}
      </div>
    );
  };