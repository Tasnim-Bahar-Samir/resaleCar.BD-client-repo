import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authProvider } from "../../Context/UserContext";
import useToken from "../../Hooks/useToken";

const Register = () => {
  const{user,createUser,updateUser} = useContext(authProvider)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation()
  const from = location.state?.from?.pathnam || '/'
  const navigate = useNavigate()
  const [userEmail,setUserEmail] = useState('')
  const [token] = useToken(userEmail);
  if(token){
    navigate(from,{replace:true})
  }
  const onRegister = (data) => {
    console.log(data);
    const {name,email,password,mode} = data;
    console.log(name,email,password)
    createUser(email,password)
        .then(result => {
          console.log(result.user)
          const userInfo = {
            displayName : name
          }
          updateUser(userInfo)
          .then(() =>{})
          .catch(err => console.error(err))
          saveUserToDb(name,email,mode)
        } )
        .catch(err => console.error(err))
  };
  const saveUserToDb = (name,email,mode)=>{
    const user = {name,email,mode}
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setUserEmail(email)
    })
  }
  return (
    <div>
      <div className="hero my-20">
        <div className="hero-content text-left">
          <div className="card w-[400px] shadow-2xl border-2">
            <h1 className="text-2xl mt-5 mx-5">Register</h1>
            <form onSubmit={handleSubmit(onRegister)} className="card-body">
              <div className="form-control">
                <input
                  {...register("name", {
                    required: "Name field is required",
                  })}
                  type="text"
                  placeholder="Your name"
                  className=" focus:outline-none border-b-2 p-2"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-red-600" role="alert">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-5">
                <input
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  type="email"
                  placeholder="Your email"
                  className=" focus:outline-none border-b-2 p-2"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-red-600" role="alert">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="form-control mt-5">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  placeholder="Your password"
                  className="focus:outline-none border-b-2 p-2"
                />
                {errors.password && (
                  <p className="text-red-600" role="alert">
                    {errors.password?.message}
                  </p>
                )}

                <div className="mt-3">
                  <p>Please select your account mode!</p>
                  <select
                  {...register('mode')}
                    className="w-full input-bordered input "
                    name="mode"
                    id=""
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <p>
              Already have an account?<Link to="/register">Login now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
