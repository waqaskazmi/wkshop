import React, { useState } from "react";
import "./Products.scss";
import CardList from "../../Components/CardList/CardList";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Products = () => {
  const catId = useParams().id;
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("asc");
  const [selSubCat, setSelSubCat] = useState([]);
  const { data, loading, error } = useFetch(`/categories/${catId}`);

  const filteredData = data.sub_categories;

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelSubCat(
      isChecked ? [...selSubCat, value] : selSubCat.filter((x) => x !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Products Categories</h2>
          {error
            ? "Something went wrong"
            : loading
            ? "loading"
            : filteredData.map((item) => (
                <div className="inputItem" key={item._id}>
                  <input
                    type="checkbox"
                    id={item._id}
                    value={item._id}
                    onClick={handleChange}
                  />
                  <label htmlFor={item._id}>{item.title}</label>
                </div>
              ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value={"asc"}
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value={"desc"}
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img className="catImg" src="/img/categories.jpg" alt="" />
        <CardList catId={catId} maxPrice={maxPrice} sort={sort} subCat={selSubCat} />
      </div>
    </div>
  );
};

export default Products;
