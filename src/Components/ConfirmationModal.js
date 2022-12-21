import React from "react";

const ConfirmationModal = ({title,desc,data,closeModal,modalAction}) => {
  return (
    <div className="z-10">
      <input type="checkbox" id="confirmation-modal" className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <p className="py-4">
            {desc}
          </p>
          <div className="modal-action">
          <label onClick={closeModal} className="btn">
              Cancel
            </label>
            <label onClick={()=>modalAction(data)} className="btn btn-success">
              Confirm
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
