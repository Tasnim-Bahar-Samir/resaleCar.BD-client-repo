import React from "react";
import { Link, useRouteError } from "react-router-dom";
import errorImg from "../../assets/images/errorImg.jpg";

const Error = () => {
  const error = useRouteError()
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center w-full">
        <img src={errorImg} className = 'mx-auto' alt="" />
        <h1 className="text-3xl font-semibold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to='/'><button className="btn btn-md mt-4">Back to home</button></Link>
      </div>
    </div>
  );
};

export default Error;
