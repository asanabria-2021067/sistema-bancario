import React from 'react'

export const FooterCliente = () => {
    return (
        <>
            <footer className="footer-distributed">

                    <img
                        src="https://bancodebosques.org/wp-content/uploads/2021/09/bdb-logo.svg"
                        style={{ width: "15%" , marginRight: "20%", paddingBlock: "2.8%"}}
                        alt="Banco de Bosques"
                    />
             

                <div className="footer-center">

                    <div>
                        <i className="fa fa-map-marker"></i>
                        <p><span>6A Avenida 13-54</span> Cdad. de Guatemala 01007</p>
                    </div>

                    <div>
                        <i className="fa fa-phone"></i>
                        <p>  (+ 502) 2216-0000 </p>
                    </div>

                    <div>
                        <i className="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">info@debosques.gt</a></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>Sobre Nosotros</span>
                        Bienvenidos a la organización financiera más importante de Guatemala y una de las más grandes a nivel Centroamericano,

                    </p>

                    <div className="footer-icons">

                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-instagram"></i></a>

                    </div>

                </div>

            </footer>
        </>
    )
}
