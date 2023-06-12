export const isAdmin = () => {
    return authUser("ROL_ADMINISTRATIVO");
  };

  export const isUser = () => {
    return authUser("ROL_CLIENTE");
  };
  
  export const authUser = (rol) => {
    const token = localStorage.getItem('token');
    if (token) {
      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      const userRole = decodedPayload.rol;

      if (userRole === rol) {
        return true;
      }
    }
    return false;
  };

  export const isUserLogged = () => {
    if (localStorage.getItem('token')) {
        return true;
    }
    return false;

}
  