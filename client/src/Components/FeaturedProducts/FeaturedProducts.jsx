import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({type}) => {
    
    const {data, loading, error} = useFetch("/products");
    const filteredData = data.filter( x => x.productType.toLowerCase() === type);

    return ( 

        <div className="featuredProducts">
            <div className="top">
                <h1> {type} Products</h1>
                <p>
                afasfasffsafafasfasasfasfasfasfasfasfas
              asfasfasfasfasfafasfafafafasfasfas
              afsasfasfasfasfasfasfassfafsafsafas
              asfasfasfasfasfasfafadfdasfasfasffas
              afsasfasfasfasfasfasfassfafsafsafas
              asfasfasfasfasfasfafadfdasfasfasffas
              ASDSASFASFASFASFASFZSFASFASFAFASFASF
                </p>
            </div>
            <div className="bottom">
                {error ? "Something went wrong" : (loading ? "loading" : filteredData.map(item => <Card item={item} key={item._id}/>))}
            </div>
        </div>
     );
}
 
export default FeaturedProducts;