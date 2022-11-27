import React from 'react'
import { useQuery } from "@tanstack/react-query";
import Spinner from '../../../Components/Spinner';
import { Link } from 'react-router-dom';


const Categories = () => {
    const {data,isLoading} = useQuery({
        queryKey:['categories'],
        queryFn: ()=>fetch('https://assignment-12-server-side-kohl.vercel.app/categories').then(res => res.json())
    })
    console.log(data)
    const categories = data?.data;
    if(isLoading){
       return <Spinner/>
    }
  return (
    <div className='mx-10 mb-16 mt-20'>
        <h1 className='text-5xl text-center m-10 mb-10'>Available Categories</h1>
        
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10'>
        {
            categories?.map(category => <div key={category._id} className="card bg-slate-100 shadow-xl rounded-full ">
            <figure className="px-10 pt-10">
              <img  src={category.img} alt="Shoes" className=" w-20" />
            </figure>
            <div className="card-body">
                <p>Category Name:{category.categoryName}</p>
              <div className="card-actions text-left">
              <Link to={`/category/${category.categoryName}`}><button className="btn btn-primary">Visit</button></Link>
              </div>
            </div>
          </div>)
        }
        </div>
    </div>
  )
}

export default Categories