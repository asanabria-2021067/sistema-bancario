import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormBancosHelper";

export const FormBancos = ({ bancosProp, titleButton, option }) => {
    const [banco, setBanco] = useState(bancosProp || {
        nombre: "",
        img: "",

    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setBanco({ ...banco });
    }, []);

    const crud = async () => {
        await sendData(banco, option);
    };

    return (
        <div style={{ marginLeft: " 10%" }}>


            <form onSubmit={handleSubmit(crud)}>
                <div className="form-group">
                    <label className="text-black">Nombre:</label>
                    <input
                        {...register("nombre")}
                        type="text"
                        className="form-control"
                        value={banco.nombre}
                        onChange={({ target: { value } }) =>
                            setBanco(() => ({ ...banco, nombre: value }))
                        }
                    />

                </div>
                <div className="form-group">
                    <label className="text-black">Imagen:</label>
                    <input
                        {...register("img")}
                        type="text"
                        className="form-control"
                        value={banco.img}
                        onChange={({ target: { value } }) =>
                            setBanco(() => ({ ...banco, img: value }))
                        }
                    />

                </div>



                <button type="submit" className="btn btn-success">
                <i className="fa fa-save mx-2"></i>{titleButton}
                </button>
            </form>
        </div>
    );
};
