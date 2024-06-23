import { useContext } from "react";
import "./FilterBar.css";
import { DataContext } from "../../Contexts/DataContext";
import {
  clearFilter,
  setCategoryFilter,
  setPriceSort,
  setRatingFilter,
} from "../../actions/actions";
export const FilterBar = () => {
  const { state, dispatch } = useContext(DataContext);

  const handleSort = (e) => {
    dispatch(setPriceSort(e.target.value));
  };
  const handleCheckBox = (e) => {
    dispatch(setCategoryFilter(e.target.value));
  };
  const handleRatingSlider = (e) => {
    dispatch(setRatingFilter(+e.target.value));
  };
  return (
    <div className="all-filters">
      <div className="filter-clear">
        <h4>Filters</h4>
        <p onClick={() => dispatch(clearFilter())}>Clear</p>
      </div>
      <div className="category-filter">
        <h4 className="filters-heading">Filter by category</h4>
        {state.categories.map(({ categoryName }) => (
          <label key={categoryName} className="select-input">
            <input
              type="checkbox"
              value={categoryName}
              className="checkbox-input"
              onChange={handleCheckBox}
              checked={state.filters.categories.includes(categoryName)}
            />
            <span className="label-tag">{categoryName}</span>
          </label>
        ))}
      </div>
      <div>
        <hr />
      </div>
      <div className="sort-by-price">
        <h4 className="filters-heading">Sort by price</h4>
        <label className="select-input">
          <input
            className="radio-input"
            type="radio"
            name="price-order"
            value="low-to-high"
            onChange={handleSort}
            checked={state.filters.priceSort === "low-to-high"}
          />
          <span className="label-tag">Low to high</span>
        </label>
        <label className="select-input">
          <input
            className="radio-input"
            type="radio"
            name="price-order"
            value="high-to-low"
            onChange={handleSort}
            checked={state.filters.priceSort === "high-to-low"}
          />
          <span className="label-tag">High to Low</span>
        </label>
      </div>
      <div>
        <hr />
      </div>
      <div>
        <h4 className="filters-heading">Filter by rating</h4>
        <label>
          0
          <input
            type="range"
            list="tickmark"
            min="0"
            max="5"
            step="0.5"
            name="rating"
            className="slider-input"
            value={state.filters.ratingFilter || 0}
            title={state.filters.ratingFilter}
            onChange={handleRatingSlider}
          />
          5
        </label>

        <datalist id="tickmark">
          <option value="0" label="0"></option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
        </datalist>
      </div>
    </div>
  );
};
