import React from "react";
import {toast} from 'react-hot-toast'

const AddProduct = () => {
  const handleAddProduct = (e)=>{
    e.preventDefault()
    const form = e.target;

    
    const imgFile = form.image.files[0];
    // console.log(form.image.files[0])
    const formData = new FormData()
    formData.append("image",imgFile)
    const imgHostingApiKey = '37dc64e2e1a0150eb5a0d6e84f8d917c'
    const url = `https://api.imgbb.com/1/upload?key=${imgHostingApiKey}`
    
    fetch(url,{
      method:"POST",
      body: formData
    })
    .then(res => res.json())
    .then(imgData => {
      if(imgData.success){
        const product = {
          name:form.carName.value,
          image: imgData.data.display_url,
          orginalPrice:form.orginalPrice.value,
          resalePrice: form.resalePrice.value,
          category: form.category.value,
          condition: form.condition.value,
          location: form.location.value,
          phone: form.phone.value,
          useTime: form.useTime.value,
          description: form.description.value
        }
        fetch(`http://localhost:5000/products`,{
          method:"POST",
          headers:{
            'content-type' : 'application/json',
            authorization: localStorage.getItem('resale_token')
          },
          body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data=>{
          if(data.success){
            toast.success(data.message)
            form.reset()
          }
        })
      }
    })
  }
  return (
    <div className=" bg-slate-100">
      <div className="m-10">
        <div className="hero-content">
          <div className="card flex-shrink-0 w-full border-2">
            <form onSubmit={handleAddProduct} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Car Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="carName"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="file"
                  placeholder=""
                  name="image"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <div className="md:flex gap-3 ">
                <input
                  type="text"
                  placeholder="Orginal Price"
                  name="orginalPrice"
                  className="input input-bordered"
                  required
                />
                <input
                  type="text"
                  placeholder="Resale Price"
                  name="resalePrice"
                  className="input input-bordered"
                  required
                />
                </div>
              </div>

              <div className="form-control">
                
                <div className="md:flex gap-3 ">
                <label className="label">
                  <span className="label-text">Select category</span>
                </label>
                <select required className="input input-bordered" name="category" id="">
                  <option value="Micro">Micro</option>
                  <option value="Hiace">Hiace</option>
                  <option value="Private Car">Private Car</option>
                </select>
                <label className="label">
                  <span className="label-text">Select condition</span>
                </label>
                <select required  name="condition" id="" className="input input-bordered">
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
                </div>

                <div className="form-control">
                
                <div className="flex gap-3 flex-wrap mt-2">
                <label className="label">
                  <span className="label-text">Use time</span>
                </label>
                <input
                  type="text"
                  name="useTime"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  type="text"
                  name="location"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  name="phone"
                  className="input input-bordered"
                  required
                />
                </div>
                <div className=" mt-5">
  
                  <textarea required  name="description" id="" className="textarea textarea-bordered w-full" rows="5" placeholder="Write about car" ></textarea>
                </div>
              </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Submit</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
