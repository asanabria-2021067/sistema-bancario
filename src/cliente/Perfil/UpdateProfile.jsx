import React from "react";
import { FormProfile } from "./FormProfile";
import { Modal } from "react-bootstrap";
export const UpdateProfile = ({ isOpen, onClose, profileEdit }) => {
    console.log(profileEdit);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <>
        <Modal show={isOpen}>
          <Modal.Header>
            <Modal.Title className="text-dark">ID: {profileEdit._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormProfile
              profile={profileEdit}
              option={2}
            />
          </Modal.Body>
          <Modal.Footer>
            <button className="btnCancel btn btn-danger" onClick={onClose}>
              <i className="fa fa-cancel mx-4"></i>Cerrar
            </button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};