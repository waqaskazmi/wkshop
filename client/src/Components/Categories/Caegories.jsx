import { Link } from "react-router-dom";
import "./Categories.scss";

const Categories = () => {
  return (
    <div className="categories1">
      <div className="col1">
        <div className="row1">
          <img src="/img/sale.jpg" alt="" />
          <button>
            <Link className="link1" to="/products/1">
              Sale
            </Link>
          </button>
        </div>
        <div className="row1">
          <img src="/img/women.jpg" alt="" />
          <button>
            <Link className="link1" to="/products/1">
              Women
            </Link>
          </button>
        </div>
      </div>
      <div className="col1">
        <div className="row1">
          <img src="/img/new-season.jpg" alt="" />
          <button>
            <Link className="link1" to="/products/1">
              New Season
            </Link>
          </button>
        </div>
      </div>
      <div className="col1 col-l">
        <div className="row1">
          <div className="col1">
            <div className="row1">
              <img src="/img/men.jpg" alt="" />
              <button>
                <Link className="link1" to="/products/1">
                  Men
                </Link>
              </button>
            </div>
          </div>
          <div className="col1">
            <div className="row1">
              <img src="/img/accessories.jpg" alt="" />
              <button>
                <Link className="link1" to="/products/1">
                  Accessories
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row1">
          <img src="/img/shoes.jpg" alt="" />
          <button>
            <Link className="link1" to="/products/1">
              Shoes
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
