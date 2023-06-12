import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormUsuarioHelper";

export const FormUsuario = ({ usuarioProp, titleButton, option }) => {
    const [usuario, setUsuario] = useState(usuarioProp || {
        nombre: "",
        nombreUsuario: "",
        DPI: "",
        correo: "",
        password: "",
        rol: "",
        celular: "",
        direccion: "",
        ingresosMensuales: "",
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setUsuario({ ...usuario });
    }, []);

    const crud = async () => {
        await sendData(usuario, option);
    };
    const handleRolChange = (event) => {
        setUsuario({ ...usuario, rol: event.target.value });
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
                        value={usuario.nombre}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, nombre: value }))
                        }
                    />

                </div>
                <div className="form-group">
                    <label className="text-black">Nombre Usuario:</label>
                    <input
                        {...register("nombreUsuario")}
                        type="text"
                        className="form-control"
                        value={usuario.nombreUsuario}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, nombreUsuario: value }))
                        }
                    />

                </div>
                <div className="form-group">
                    <label className="text-black">DPI:</label>
                    <input
                        {...register("DPI")}
                        type="number"
                        className="form-control"
                        value={usuario.DPI}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, DPI: value }))
                        }
                    />

                </div>

                <div className="form-group">
                    <label className="text-black">correo:</label>
                    <input
                        {...register("correo")}
                        type="text"
                        className="form-control"
                        value={usuario.correo}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, correo: value }))
                        }
                    />

                </div>

                <div className="form-group">
                    <label className="text-black">Contraseña:</label>
                    <input
                        {...register("password")}
                        type="text"
                        className="form-control"
                        value={usuario.password}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, password: value }))
                        }
                    />

                </div>

                <div className="form-group">
                    <label className="text-black">Rol:</label>
                    <select
                        {...register("rol")}
                        className="form-control"
                        value={usuario.rol}
                        onChange={handleRolChange}
                        disabled={option === 2} // <- Condición para habilitar o deshabilitar el campo
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="ROL_CLIENTE">ROL_CLIENTE</option>
                        <option value="ROL_ADMINISTRADOR">ROL_ADMINISTRADOR</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="text-black">Numero de celular:</label>
                    <input
                        {...register("celular")}
                        type="number"
                        className="form-control"
                        value={usuario.celular}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, celular: value }))
                        }
                    />

                </div>
                <div className="form-group">
                    <label className="text-black">Direccion:</label>
                    <input
                        {...register("direccion")}
                        type="text"
                        className="form-control"
                        value={usuario.direccion}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, direccion: value }))
                        }
                    />

                </div>

                <div className="form-group">
                    <label className="text-black">Ingresos Mensuales:</label>
                    <input
                        {...register("ingresosMensuales")}
                        type="number"
                        className="form-control"
                        value={usuario.ingresosMensuales}
                        onChange={({ target: { value } }) =>
                            setUsuario(() => ({ ...usuario, ingresosMensuales: value }))
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
