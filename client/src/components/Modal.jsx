import React from "react";
import "../styles/modal.css";
export const Modal = ({ setOpenModal, product }) => {
  return (
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Ovo dodaje pozadinsku boju kao overlay
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
      aria-modal
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {product.attributes.Name}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setOpenModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{product.attributes.Description}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setOpenModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
