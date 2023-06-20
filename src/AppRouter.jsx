import { Navigate, Route, Routes} from 'react-router-dom'
import { App } from './Principal/App'
import { Login } from './login/components/Login'
import { Principal } from './cliente/Principal'
import { PrincipalAdministrador } from './administrador/PrincipalAdministrador'
import { Historial } from './cliente/Historial/Historial'
import { Cuentas } from './cliente/Cuenta/Cuentas'
import { Transferencia } from './cliente/Transferencia/Transferencia'
import { CuentaTransferencia } from './cliente/Transferencia/CuentaTransferencia'
import { Divisas } from './cliente/Divisas/Divisas'
import { MiPerfil } from './cliente/Perfil/MiPerfil'
import { CuentasVista } from './cliente/Cuenta/CuentasVista'
import { CuentaFavoritos } from './cliente/Favoritos/CuentasFavoritos'
import { Favoritos } from './cliente/Favoritos/MisFavoritos'
import { ComprobanteTransferencia } from './cliente/Transferencia/ComprobanteTransferencia'
import { CuentaCredito } from './cliente/Credito/CuentaCredito'
import { Creditos } from './cliente/Credito/Creditos'
import { isAdmin, isUserLogged } from './login/helpers/loginHelpers'
import { CreateCompra } from './administrador/Compras/components/CreateCompra'
import { ListaCompras } from './administrador/Compras/components/ListaCompras'
import { NavBarAdmin } from './administrador/NavbarAdmin'
import { ListaCreditos } from './administrador/credito/components/ListaCreditos'
import { CreateCredito } from './administrador/credito/components/CreateCredito'
import { ListaUsuarios } from './administrador/Usuarios/components/ListaUsuario'
import { CreateUsuario } from './administrador/Usuarios/components/CreateUsuario'
import { ListaDeposito } from './administrador/deposito/components/ListaDeposito'
import { CreateDepositos } from './administrador/deposito/components/CreateDepositos'
import { ListaTransferencia } from './administrador/transferencia/components/ListaTransferencia'
import { ListaTipoCuenta } from './administrador/TipoCuenta/components/ListaTipoCuenta'
import { CreateTipoCuenta } from './administrador/TipoCuenta/components/CreateTipoCuenta'
import { Cuenta } from './administrador/cuenta/components/Cuenta'
import { AgregarCuenta } from './administrador/cuenta/components/AgregarCuenta'
import { ListaBancos } from './administrador/bancos/components/ListaBancos'
import { CreateBancos } from './administrador/bancos/components/CreateBancos'
import { HistorialAdmin } from './administrador/Historial/HistorialAdmin'
import { CuentasConMasMovimiento } from './administrador/Historial/CuentasConMasMovimiento'




function AppRouter() {

  return (
    <>
    {isAdmin() && <NavBarAdmin />}

    <Routes>
      {/* RUTAS SIN LOGUEARSE */}
      <Route path="/" element={<App/>} />
      <Route path="/login" element={<Login />} />

      {/* RUTAS PARA EL CLIENTE */}
      <Route path="/principalCliente" element={isUserLogged() ? <Principal />: <Navigate to="/" />} />
      <Route path="/cuentas" element={isUserLogged() ? <Cuentas />: <Navigate to="/" />} />
      <Route path="/historial/:id" element={isUserLogged() ? <Historial />: <Navigate to="/" />} />
      <Route path="/transferencia/:id" element={isUserLogged() ? <Transferencia />: <Navigate to="/" />} />
      <Route path="/cuentaTransferencia" element={isUserLogged() ? <CuentaTransferencia />: <Navigate to="/" />} />
      <Route path="/divisas" element={isUserLogged() ? <Divisas />: <Navigate to="/" />} />
      <Route path="/cuentasVista" element={isUserLogged() ? <CuentasVista />: <Navigate to="/" />} />
      <Route path="/cuentasFavoritos" element={isUserLogged() ? <CuentaFavoritos />: <Navigate to="/" />} />
      <Route path="/favoritos/:id" element={isUserLogged() ? <Favoritos />: <Navigate to="/" />} />
      <Route path="/miPerfil" element={isUserLogged() ? <MiPerfil />: <Navigate to="/" />} />
      <Route path="/comprobanteTransferencia" element={isUserLogged() ? <ComprobanteTransferencia />: <Navigate to="/" />} />
      <Route path="/cuentasCredito" element={isUserLogged() ? <CuentaCredito />: <Navigate to="/" />} />
      <Route path="/credito/:id" element={isUserLogged() ? <Creditos />: <Navigate to="/" />} />
      <Route path="/historialAdmin/:id" element={<HistorialAdmin />} />


      {/* RUTAS PARA EL ADMINISTRADOR */}
      <Route path="/listaCompras" element={isAdmin() ? <ListaCompras></ListaCompras> : <Navigate to="/" />}></Route>
        <Route path="/agregar" element={isAdmin() ? <CreateCompra /> : <Navigate to="/" />}></Route>
        <Route path='/listaCreditosAdmin' element={isAdmin() ? <ListaCreditos></ListaCreditos> : <Navigate to="/" />}></Route>
        <Route path='/agregarCreditoAdmin' element={isAdmin() ? <CreateCredito></CreateCredito> : <Navigate to="/" />}></Route>
        <Route path='/listaUsuarios' element={isAdmin() ? <ListaUsuarios></ListaUsuarios> : <Navigate to="/" />}></Route>
        <Route path='/agregarUsuario' element={isAdmin() ? <CreateUsuario></CreateUsuario> : <Navigate to="/" />}></Route>
        <Route path='/listaDeposito' element={isAdmin() ? <ListaDeposito></ListaDeposito> : <Navigate to="/" />}></Route>
        <Route path='/agregarDepositos' element={isAdmin() ? <CreateDepositos></CreateDepositos> : <Navigate to="/" />}></Route>
        <Route path='/listaTransferencia' element={isAdmin() ? <ListaTransferencia></ListaTransferencia> : <Navigate to="/" />}></Route>
        <Route path='/ListaTipoCuentaAdmin' element={isAdmin() ? <ListaTipoCuenta></ListaTipoCuenta> : <Navigate to="/" />}></Route>
        <Route path='/agregarTipoCuentaAdmin' element={isAdmin() ? <CreateTipoCuenta></CreateTipoCuenta> : <Navigate to="/" />}></Route>
        <Route path="/listaCuentas" element={isAdmin() ? <Cuenta /> : <Navigate to="/" />} />
        <Route path="/agregar-cuenta" element={isAdmin() ? <AgregarCuenta /> : <Navigate to="/" />} />
        <Route path="/listaBancos" element={isAdmin() ? <ListaBancos /> : <Navigate to="/" />} />
        <Route path="/agregarBancos" element={isAdmin() ? <CreateBancos/> : <Navigate to="/" />} />
        <Route path="/cuentasConMasMovimiento" element={isAdmin() ? <CuentasConMasMovimiento/> : <Navigate to="/" />} />

    </Routes>
    </>
  )
}

export default AppRouter
