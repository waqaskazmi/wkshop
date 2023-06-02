import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch("/categories");
  const products = useSelector(state => state.cart.products);

  return (
    <div className="navbar1">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <i className="fa fa-language" aria-hidden="true"></i>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
          <div className="item">
            <span>USD</span>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </div>
          {error
            ? "Something went wrong"
            : loading
            ? "loading"
            : data.map((item) => (
                <div className="item" key={item._id}>
                  <Link className="link1" to={`/products/${item._id}`}>
                    {item.title}
                  </Link>
                </div>
              ))}
        </div>
        <div className="center">
          <Link className="link1" to="">
            WKshop
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link1" to="/">
              HomePage
            </Link>
          </div>
          <div className="item">
            <Link className="link1" to="/">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link1" to="/">
              Contacts
            </Link>
          </div>
          <div className="item">
            <Link className="link1" to="/">
              Stores
            </Link>
          </div>
          <div className="icons">
            <i className="fa fa-search" aria-hidden="true"></i>
            <i className="fa fa-heart-o" aria-hidden="true"></i>
            <i className="fa fa-user-o" aria-hidden="true"></i>
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <span>{products.length}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
