import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authProvider } from "../../../Context/UserContext";

const Product = ({ product, setProduct }) => {
  const { user } = useContext(authProvider);
  const navigate = useNavigate();

  const {
    image,
    name,
    resalePrice,
    orginalPrice,
    description,
    seller,
    postingTime,
    phone,
    location,
  } = product;
  const handleOrder = () => {
    user ? setProduct(product) : navigate("/login");
  };
  const handleReport = () => {
    user ? setProduct(product) : navigate("/login");
  };
  return (
    <div>
      <div className=" md:flex md:gap-10 border-2 items-center">
        <div className="">
          <img
            src={image}
            className="md:w-44 md:h-44 w-full md:mt-6 md:m-3"
            alt=""
          />
        </div>
        <div className=" text-left p-3 w-full">
          <div className="flex justify-between">
            <div className="flex md:gap-8 my-1">
              <h2 className="card-title">{name}</h2>
              <p>{postingTime}</p>
            </div>
            <div>
              <label onClick={handleReport} htmlFor = 'report-modal' className=" underline cursor-pointer">Riport this product</label>
            </div>
          </div>
          <h5 className="my-1">
            Orginal Price:
            <span className="text-md font-semibold text-red-600">
              TK {orginalPrice}
            </span>
          </h5>
          <h5>
            Resale Price:
            <span className="text-md font-semibold text-green-700">
              TK {resalePrice}
            </span>
          </h5>
          <p className="text-left my-1">{description}</p>
          <div>
            <p>Phone: {phone}</p>
            <p>Location: {location}</p>
          </div>
          <p>Seller: {seller}</p>
          <div className="card-actions w-full justify-end">
            <label
              htmlFor="order-modal"
              onClick={handleOrder}
              className="btn btn-primary"
            >
              Proceed Order
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
