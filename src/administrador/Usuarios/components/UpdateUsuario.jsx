import React from "react";
import { Modal } from "react-bootstrap";
import { FormUsuario } from "./FormUsuario";

export const UpdateUsuarios = ({ isOpen, onClose, listaUsuarios }) => {
    console.log(listaUsuarios)
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <>
                <Modal show={isOpen} >
                    <Modal.Header >
                        <Modal.Title className="text-dark">ID: {listaUsuarios._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{marginLeft: "-40px"}}>
                        <FormUsuario
                            usuarioProp={listaUsuarios}
                            titleButton="Actualizar"
                            option={2}
                        // editando={true}

                        ></FormUsuario>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={onClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    );
};
