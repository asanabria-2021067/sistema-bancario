import { useEffect, useRef, useState, useNavigate } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../Principal/sidebar.scss"
const sidebarNavItems = [
    {
        display: 'Compras',
        icon: <i className='bx bx-cart-download' ></i>,
        to: '/listaCompras',
        section: 'listaCompras'
    },
    {
        display: 'Creditos',
        icon: <i className='bx bx-money' ></i>,
        to: '/listaCreditosAdmin',
        section: 'listaCreditosAdmin'
    },
    {
        display: 'Usuarios',
        icon: <i className='bx bxs-user' ></i>,
        to: '/listaUsuarios',
        section: 'listaUsuarios'
    },
    {
        display: 'Depositos',
        icon: <i className='bx bx-money-withdraw' ></i>,
        to: '/listaDeposito',
        section: 'listaDeposito'
    },
    {
        display: 'Transferencia',
        icon: <i className='bx bx-send' ></i>,
        to: '/listaTransferencia',
        section: 'listaTransferencia'
    },
    {
        display: 'Tipo Cuenta',
        icon: <i className='bx bx-receipt'></i>,
        to: '/ListaTipoCuentaAdmin',
        section: 'ListaTipoCuentaAdmin'
    },
    {
        display: 'Cuentas',
        icon: <i className='bx bxs-wallet' ></i>,
        to: '/listaCuentas',
        section: 'listaCuentas'
    },
    {
        display: 'Bancos',
        icon: <i className='bx bxs-bank' ></i>,
        to: '/listaBancos',
        section: 'listaBancos'
    },
    {
        display: 'Cuentas +',
        icon: <i className='bx bxs-wallet' ></i>,
        to: '/cuentasConMasMovimiento',
        section: 'cuentasConMasMovimiento'
    },
    {
      display: 'Cuentas -',
      icon: <i className='bx bxs-wallet' ></i>,
      to: '/cuentasConMenosMovimiento',
      section: 'cuentasConMenosMovimiento'
  }
]



export const NavBarAdmin = () => {


    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        localStorage.clear();
        window.location.href = "/";
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div className="sidebar">
          <div className="sidebar__logo">Administrador</div>
          <div ref={sidebarRef} className="sidebar__menu">
            <div
              ref={indicatorRef}
              className="sidebar__menu__indicator"
              style={{
                transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`,
              }}
            ></div>
            {sidebarNavItems.map((item, index) => (
              <Link to={item.to} key={index}>
                <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                  <div className="sidebar__menu__item__icon">
                    {item.icon}
                  </div>
                  <div className="sidebar__menu__item__text">
                    {item.display}
                  </div>
                </div>
              </Link>
            ))}
            {localStorage.getItem("token") && (
              <Link
                className="sidebar__menu__item"
                aria-current="page"
                to="/"
                onClick={() => cerrarSesion()}
              >
                <i
                  className="bx bxs-log-out"
                  style={{
                    marginRight: "1rem",
                    fontSize: "1.75rem",
                    paddingBottom: "5px",
                  }}
                ></i>
                <h5 className="cerrarSesion">Cerrar Sesion</h5>
              </Link>
            )}
          </div>
        </div>
      );
    };