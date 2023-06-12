import React from "react";
import { Modal } from "react-bootstrap";
import { FormUsuario } from "./FormUsuario";

export const UpdateBancos = ({ isOpen, onClose, listaBancos }) => {
    console.log(listaUsuarios)
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <>
                <Modal show={isOpen} >
                    <Modal.Header >
                        <Modal.Title className="text-dark">ID: {listaBancos._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{marginLeft: "-40px"}}>
                        <FormUsuario
                            bancosProp={listaBancos}
                            titleButton="Actualizar"
                            option={2}
                        // editando={true}

                        ></FormUsuario>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={onClose}>
                        <i className="fa fa-cancel mx-2"></i>Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    );
};
