import "./Products.css";
import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { FilterBar } from "../../Components/FilterBar/FilterBar";
import { ProductList } from "../../Components/ProductList/ProductList";

export const Products = () => {
  const { state } = useContext(DataContext);

  const productData = [...state.productList];

  const searchData = state.searchValue
    ? productData.filter(({ title }) =>
        title.toLowerCase().includes(state.searchValue.toLowerCase())
      )
    : productData;
  const filterByCheckboxData =
    state.filters.categories.length > 0
      ? searchData.filter(({ categoryName }) =>
          state.filters.categories.some((cat) => cat === categoryName)
        )
      : searchData;

  const ratingData = state.filters.ratingFilter
    ? filterByCheckboxData.filter(
        ({ rating }) => rating >= state.filters.ratingFilter
      )
    : filterByCheckboxData;

  const sortedData = state.productList
    ? ratingData.sort((a, b) =>
        state.filters.priceSort === "low-to-high"
          ? a.price - b.price
          : b.price - a.price
      )
    : ratingData;

  return (
    <div className="products-page">
      <FilterBar />
      <ul className="products-list" style={{ margin: "1rem 0rem" }}>
        {sortedData.map((item) => (
          <ProductList key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
};
