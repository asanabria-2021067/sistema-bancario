import React from 'react'

export const Footer = () => {
    return (
        <>

        
            <footer className="pie-pagina">
                <div className="texto-1">
                    <div className="textoFooter">

                        <figure>
                            <a href="#"><img alt="Not Found" /></a>
                        </figure>

                    </div>

                    <div className="textoFooter">
                        <h2 className="h2-ubi">Ubicación</h2>

                    </div>

                    <div className="textoFooter">
                        <h2 className="h2-contacto">Contactos</h2>
                        <p>bdbguatemala@gmail.com</p>
                        <p>soportebdb@gmail.com</p>
                    </div>

                    <div className="textoFooter">
                        <figure>
                            <a href="#"><img className="trabajo" alt="Not Found" /></a>
                        </figure>
                    </div>

                </div>

                <hr className="hr-footer" />
                <div style={{ flex: '1' }}></div>
                <div className="derechos">
                    <b>Derechos reservados - &copy; Banco Del Bosque</b>
                </div>
            </footer>
        </>
    )
}
