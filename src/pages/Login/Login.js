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
      setUserEmail(email)
    })
    .catch(err => {
      console.log(err)
      setError('Invalid email or password')
      setLoading(false)
    })
  }
  return (
    <div>
      <div className="hero my-20">
        <div className="hero-content text-left">
          <div className="card w-[400px] shadow-2xl border-2 p-10">
          <h1 className="text-2xl my-5 mx-5">Login now</h1>
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
                <button className="btn btn-primary">{loading? <Spinner/>:'Login'}</button>
              {error && <p className="text-red-700 text-lg">{error}</p> }
              </div>
            </form>
            <p>New to this website?<Link className=" underline" to='/register'>Register now</Link></p>
            <div className="divider">OR</div>
            <GoogleLogin/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
