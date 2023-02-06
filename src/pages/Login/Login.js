import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";
import { authProvider } from "../../Context/UserContext";
import useToken from "../../Hooks/useToken";
import GoogleLogin from "../../Shared/SocialLogin/GoogleLogin";

const Login = () => { 
  const {loading,setLoading,userLogin} = useContext(authProvider)
  const{handleSubmit,register,formState: { errors }} = useForm()
  const [error,setError] = useState('')
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  const navigate = useNavigate()

  const [userEmail,setUserEmail] = useState('')
  const [token] = useToken(userEmail)
  if(token) {
    navigate(from,{replace:true})
  }
  const onLogin = data=>{
    const {email,password} = data;
    console.log(data)
    userLogin(email,password)
    .then(()=>{
      setLoading(false)
      setUserEmail(email)
    })
    .catch(err => {
      console.log(err)
      setError('Invalid email or password')
      setLoading(false)
    })
  }
  return (
    <div className="">
      <div className=" my-20 bg-blue-500 p-3 rounded-md w-[500px] min-h-[450px] mx-auto relative">
        <div className="text-left">
          <div className="w-full h-full rounded-md border-2 p-10 bg-white absolute right-2 bottom-2">
          <h1 className="text-2xl mb-5 mx-5">Login now</h1>
            <form onSubmit={handleSubmit(onLogin)} className="">
            
              <div className="form-control">
                <input
                {...register('email',{ required: "Email Address is required" })}
                  type="email"
                  placeholder="email"
                  className=" focus:outline-none border-b-2 p-2"
                  aria-invalid = {errors.email?'true':'false'}
                />
                {errors.email && <p className="text-red-600" role="alert">{errors.email?.message}</p>}
              </div>
              <div className="form-control mt-5">
                <input
                {...register('password',{ required: "Password is required" })}
                  type="password"
                  placeholder="password"
                  className="focus:outline-none border-b-2 p-2"
                />
                {errors.password && <p className="text-red-600" role="alert">{errors.password?.message}</p>}
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <button className="bg-blue-500 rounded-md text-white p-3 mb-1">{loading? <Spinner/>:'Login'}</button>
              {error && <p className="text-red-700 text-lg">{error}</p> }
              </div>
            </form>
            <p className="text-sm">New to this website?<Link className=" underline text-blue-600" to='/register'>Register now</Link></p>
            <div className="divider">OR</div>
            <GoogleLogin/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
