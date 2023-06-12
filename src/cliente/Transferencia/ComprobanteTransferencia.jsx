import React from 'react';
import { jsPDF } from 'jspdf';
import { NavBar } from '../NavbarCliente';
import { useState } from 'react';
import { useEffect } from 'react';
import { ultimaTransferencia } from './api/apiTransferencia';

export const ComprobanteTransferencia = () => {
    const [transferencia, setTransferencia] = useState([])
    console.log(transferencia);
    const viewTransferencia = async () => {
        const getTransferencia = await ultimaTransferencia();
        console.log(getTransferencia);
        setTransferencia(getTransferencia)
    };

    useEffect(() => {
        viewTransferencia();
    }, []);

    const handleDownloadPDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
    
        // Margen cuadrado en toda la página
        doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2, 'S');
    
        doc.setFontSize(24);
        doc.setFont('bold'); // Aplicar negrita al título
        doc.text('Comprobante de Pago', pageWidth / 2, margin + 15, 'center');
    
        doc.setFontSize(16);
        doc.setFont('normal'); // Restaurar estilo de fuente normal
        doc.text('Datos del emisor:', margin + 10, margin + 30);
        doc.line(margin + 5, margin + 20, pageWidth - margin - 5, margin + 20);
        doc.text(`Nombre del cliente: ${transferencia.emisor.nombreUsuario}`, margin + 10, margin + 40);
        doc.text(`Cuenta: ${transferencia.noCuentaEmisor}`, margin + 10, margin + 50);
        doc.text(`Fecha: ${transferencia.fecha}`, margin + 10, margin + 60);
        doc.text(`Monto: ${transferencia.monto}`, margin + 10, margin + 70);
    
        doc.line(margin + 10, margin + 90, pageWidth - margin - 10, margin + 90); // Línea horizontal
    
        doc.text('Enviado a:', margin + 10, margin + 110);
        doc.text(`Nombre del cliente: ${transferencia.receptor.nombreUsuario}`, margin + 10, margin + 120);
        doc.text(`Cuenta: ${transferencia.noCuenta}`, margin + 10, margin + 130);
    
        doc.save('comprobante_pago.pdf');
      };

      return (
        <>
          <NavBar />
          <div className="container mt-4">
            <div className="pdf-container">
              <div className="pdf-preview">
                <h1 className="title">Comprobante de Pago</h1>
                <hr className="line" />
                <div className="sectionComprobante">
                  <h2>Datos del emisor:</h2>
                  <p>
                    <strong>Nombre del cliente:</strong> {transferencia.emisor.nombreUsuario}
                  </p>
                  <p>
                    <strong>Cuenta:</strong> {transferencia.noCuentaEmisor}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {transferencia.fecha}
                  </p>
                  <p>
                    <strong>Monto:</strong> {transferencia.monto}
                  </p>
                </div>
                <hr className="line" />
                <div className="section">
                  <h2>Enviado a:</h2>
                  <p>
                    <strong>Nombre del cliente:</strong> {transferencia.receptor.nombreUsuario}
                  </p>
                  <p>
                    <strong>Cuenta:</strong> {transferencia.noCuenta}
                  </p>
                </div>
              </div>
            </div>
            <div className="pdf-container">
            <button className="btn mt-4" style={{width: "600px"}} onClick={handleDownloadPDF}>Descargar PDF</button>
            </div>
          </div>
        </>
      );
};
