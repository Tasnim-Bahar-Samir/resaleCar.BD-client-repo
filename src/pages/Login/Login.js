import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const{handleSubmit,register,formState: { errors }} = useForm()
  const onLogin = data=>{
    const {email,password} = data;
    console.log(data)
  }
  return (
    <div>
      <div className="hero my-20">
        <div className="hero-content text-left">
          <div className="card w-[400px] shadow-2xl border-2">
          <h1 className="text-2xl mt-5 mx-5">Login now</h1>
            <form onSubmit={handleSubmit(onLogin)} className="card-body">
            
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p>New to this website?<Link to='/register'>Register now</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
