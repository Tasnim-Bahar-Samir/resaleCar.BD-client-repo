import React from "react";

const Product = ({ product }) => {
  const { image, name, resalePrice, orginalPrice, description } = product;
  return (
    <div>
      <div className=" md:flex border-2">
        <div className="h-full">
          <img src={image} className= 'max-w-44 h-44 md:mt-6 m-5 md:m-3' alt="" />
        </div>
        <div className="card-body text-left">
          <h2 className="card-title">{name}</h2>
          <span>
            Orginal Price:{" "}
            <span className="text-xl font-semibold text-red-600">
              TK {orginalPrice}
            </span>
          </span>
          <span>
            Resale Price:{" "}
            <span className="text-xl font-semibold">TK {resalePrice}</span>
          </span>
          <p className="text-left">{description}</p>
          <p>Seller:</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
