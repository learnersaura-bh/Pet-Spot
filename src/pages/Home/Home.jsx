import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { useNavigate } from "react-router";
import "./Home.css";
import { setCategoryFilter } from "../../actions/actions";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export const Home = () => {
  const { state, dispatch } = useContext(DataContext);
  const navigate = useNavigate();

  if (state.error) {
    return <h1>{state.error}</h1>;
  }

  return (
    <div className="home">
      <section className="hero-carousel">
        <Carousel autoPlay interval={5000} infiniteLoop showThumbs={false}>
          <div className="carousel-item">
            <img src="hero.jpg" alt="Slide 1" />
            <div className="carousel-caption">
              <h1>Pet Spot</h1>
              <p>The Best Spot For Your Pet</p>
              <button onClick={() => navigate("/products")}>Shop Now</button>
            </div>
          </div>
          <div className="carousel-item second-slide">
            <img
              src="https://supertails.com/cdn/shop/files/Monsoon_Mainia__Web-min_d6dded29-1d8f-43c1-b0ac-ce4a30a0fc63.png?v=1718947579"
              alt="Slide 2"
            />
            <div className="second-carousel-caption">
              <button onClick={() => navigate("/products")}>
                Shop Now {">"}{" "}
              </button>
            </div>
          </div>
        </Carousel>
      </section>

      <div className="category-container">
        {state.categories?.map(({ _id, categoryName, imageUrl }) => (
          <li key={_id}>
            <div className="pets-category">
              <img
                className="pets-image"
                src={imageUrl}
                alt={categoryName}
                onClick={() => {
                  navigate("/products");
                  dispatch(setCategoryFilter(categoryName));
                }}
              />
              <h3>{categoryName}</h3>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};
