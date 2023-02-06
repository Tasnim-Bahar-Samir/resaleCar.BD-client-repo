import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { authProvider } from "../../Context/UserContext";
import useToken from "../../Hooks/useToken";
import GoogleLogin from "../../Shared/SocialLogin/GoogleLogin";

const Register = () => {
  const{loading,setLoading,createUser,updateUser} = useContext(authProvider)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const navigate = useNavigate()
  const [userEmail,setUserEmail] = useState('')
  const [token] = useToken(userEmail);
  if(token){
    navigate(from,{replace:true})
  }
  const onRegister = (data) => {
    console.log(data);
    const {name,email,password,role} = data;
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
          saveUserToDb(name,email,role)
          setLoading(false)
        } )
        .catch(err => {
          console.error(err)
          toast.error(err.message)
          setLoading(false)
        })
  };
  const saveUserToDb = (name,email,role)=>{
    const user = {name,email,role}
    fetch('https://assignment-12-server-side-kohl.vercel.app/users',{
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
      <div className=" my-20 bg-blue-500 p-3 rounded-md w-[500px] min-h-[600px] mx-auto relative">
        <div className="text-left">
          <div className="w-full h-full rounded-md border-2 p-10 bg-white absolute right-2 bottom-2">
            <h1 className="text-2xl my-5 mx-5">Register</h1>
            <form onSubmit={handleSubmit(onRegister)} >
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
                  <p>Please select your account role!</p>
                  <select
                  {...register('role')}
                    className="w-full input-bordered input "
                    name="role"
                    id=""
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="bg-blue-500 rounded-md text-white p-3 mb-1">{loading? <Spinner/>: 'Register'}</button>
              </div>
            </form>
            <p className="my-2">
              Already have an account?<Link to="/login">Login now</Link>
            </p>
            <div className="divider">OR</div>
            <GoogleLogin/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
