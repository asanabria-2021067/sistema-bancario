import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import styles from './nav.module.css';

export const NavBarAdmin = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        window.location.href = "/";
    };
    return (
        <>
            <div className={`${styles.sidebar} ${styles['sidebar-hidden']}`}>
                <Link className={styles.navLink} aria-current="page" to="/listaCompras">
                    <h5>Compras</h5>
                </Link>
                <Link className={styles.navLink} aria-current="page" to="/listaCreditosAdmin">
                    <h5>Creditos</h5>
                </Link>
                <Link className={styles.navLink} aria-current="page" to="/listaUsuarios">
                    <h5>Usuarios</h5>
                </Link>
                <Link className={styles.navLink} aria-current="page" to="/listaDeposito">
                    <h5>Depositos</h5>
                </Link>
                <Link className={styles.navLink} aria-current="page" to="/listaTransferencia">
                    <h5>Transferencias</h5>
                </Link>
                <Link className={styles.navLink} aria-current="page" to="/ListaTipoCuentaAdmin">
                    <h5>Tipo de Cuenta</h5>
                </Link>
                <Link className={styles.navLink} aria-current="page" to="/listaCuentas">
                    <h5>Cuentas</h5>
                </Link>
                <Link className={styles.navLink} aria-current="page" to="/listaBancos">
                    <h5>Bancos</h5>
                </Link>
              
                {localStorage.getItem("token") && (
                    <Link
                        className={styles.navLink}
                        aria-current="page"
                        to="/"
                        onClick={() => cerrarSesion()}
                    >
                        <h5>Cerrar Sesion</h5>
                    </Link>
                )}
            </div>
        </>
    );
};