import { useContext } from "react";
import "./FilterBar.css";
import { DataContext } from "../../Contexts/DataContext";
export const FilterBar = () => {
  const filterByCategoryList = [
    {
      name: "Dogs",
      value: "Dogs"
    },
    {
      name: "Cats",
      value: "Cats"
    },
    {
      name: "Birds",
      value: "Birds"
    }
  ];
  const {state , dispatch} = useContext(DataContext)
    
    const handleSort = (e) => {
        console.log(e.target.name , e.target.value );
        dispatch({type:e.target.name , payload : e.target.value})
    }
    const handleCheckBox = (e) =>{
        console.log(e.target.value);
        dispatch({type : "handleByCategory" , payload: e.target.value})
    }
    const handleRatingSlider = (e) =>{
        console.log("rating slider" , e.target.value);
        dispatch({type : "set-rating-filter" , payload : parseFloat(e.target.value)})
    }
  return (
    <div className="all-filters">
      <div className="filter-clear">
        <h4>Filters</h4>
        <p onClick={()=>dispatch({type: "clear-filter"})}>Clear</p>
      </div>
      <div className="category-filter">
        
        <h4 className="filters-heading">Filter by category</h4>
        {filterByCategoryList.map(({ name, value }) => (
          <label key={value} class="select-input">
            <input type="checkbox" value={value} className="checkbox-input" onChange={handleCheckBox}  checked={state.filters.categories.includes(value)}  />
            <span className="label-tag">{name}</span>
          </label>
        ))}
      </div>
<div>
  <hr/>
</div>
      <div className="sort-by-price">
        <h4 className="filters-heading">Sort by price</h4>
        <label class="select-input">
          <input
            className="radio-input"
            type="radio"
            name="price-order"
            value="low-to-high"
            onChange={handleSort}
          />
          <span className="label-tag">Low to high</span>
        </label>
        <label class="select-input">
          <input
            className="radio-input"
            type="radio"
            name="price-order"
            value="high-to-low"
            onChange={handleSort}
          />
          <span className="label-tag">High to Low</span>
        </label>
      </div>
      <div>
  <hr/>
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
