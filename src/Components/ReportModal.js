import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authProvider } from "../Context/UserContext";

const ReportModal = ({ product,setProduct }) => {
    const {user} = useContext(authProvider)
  const handleReport = (e) => {
    e.preventDefault()
    const reportMessage = e.target.report.value;
    const report =
        {
            reportMessage,
            reportedBy: user?.email
        }
    fetch(`http://localhost:5000/product/report/${product._id}`,{
        method: "PUT",
        headers:{
            'content-type':'application/json',
            authorization: localStorage.getItem('resale_token')
        },
        body: JSON.stringify(report)
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            toast(data.message)
            setProduct(null)
            
        }else{
            toast.error(data.message)
        }
    })
  };
  return (
    <div>
      <input type="checkbox" id="report-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="report-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Report to {product.name}</h3>
          <form onSubmit= {handleReport}>
            <label className="label">
              <span className="label-text">Write the reason:</span>
            </label>
            <input
              className="text input input-bordered w-full"
              type="text"
              name="report"
              autoComplete="off"
              required
            />
            <div className="modal-action">
              <button type="submit"  className="btn w-2/3 mx-auto">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
