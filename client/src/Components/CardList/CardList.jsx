import Card from "../Card/Card";
import "./CardList.scss";
import useFetch from "../../hooks/useFetch";

const CardList = ({ catId, maxPrice, sort, subCat }) => {
  const { data, loading, error } = useFetch("/products");
  let filteredData = data.filter((x) =>
    x.categories.some((y) => y._id == catId)
  );
  filteredData =
    subCat.length == 0
      ? filteredData
      : filteredData.filter((x) => subCat.some((y) => y == x.sub_category._id));
  filteredData = filteredData.filter((x) => x.price <= maxPrice);
  const sortedData =
    sort === "desc"
      ? filteredData.sort((a, b) => b.price - a.price)
      : filteredData.sort((a, b) => a.price - b.price);

  return (
    <div className="cardList">
      {sortedData.map((item) => (
        <Card item={item} key={item._id} />
      ))}
    </div>
  );
};

export default CardList;
