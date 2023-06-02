import React, { useState } from "react";
import "./Product.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const prodId = useParams().id;
  const [quantity, setQuantity] = useState(1);
  const { data, loading, error } = useFetch(`/products/${prodId}`);
  const [selectedImg, setSelectedImg] = useState("");
  const dispatch = useDispatch();
  const img = loading ? "" : data.img;
  const img2 = loading ? "" : data.img2;
  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img src={img} alt="" onClick={(e) => setSelectedImg(img)} />
              <img src={img2} alt="" onClick={(e) => setSelectedImg(img2)} />
            </div>
            <div className="mainImg">
              <img src={selectedImg == "" ? img : selectedImg} alt="" />
            </div>
          </div>
          <div className="right">
            <h1>{data.title}</h1>
            <span className="price">${data.price}</span>
            <p>
              asdnam,dnm,adm,asnd,masnm,dan,dandas
              afafssafffffffffffffffffffffffffasasfasf
              sfasfasfsafsafsafasfasfasfasfasfasffas
              afasfasffffffffffffffffffffffffasfasfsa
            </p>
            <div className="quantity">
              <button
                onClick={(e) =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={(e) => setQuantity((prev) => prev + 1)}>
                +
              </button>
            </div>
            <button className="add" onClick={() => dispatch(addToCart({
              id: data._id,
              img: data.img,
              title: data.title,
              desc: data.title,
              price: data.price,
              quantity : quantity
            }))}>
              <i className="fa fa-cart-plus" aria-hidden="true"></i>
              ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <i className="fa fa-heart-o" aria-hidden="true"></i>
                ADD TO WISHLIST
              </div>
              <div className="item">
                <i className="fa fa-balance-scale" aria-hidden="true"></i>
                ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: {data.sub_category.title}</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
