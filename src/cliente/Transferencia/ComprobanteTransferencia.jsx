import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { NavBar } from "../NavbarCliente";
import { ultimaTransferencia } from "./api/apiTransferencia";
import bdbLogo from "../../assets/img/bdb-logo.svg";
import descargar from "../../assets/img/descargar.png";
import user from "../../assets/img/user.png";
export const ComprobanteTransferencia = () => {
  const [transferencia, setTransferencia] = useState([]);

  useEffect(() => {
    const viewTransferencia = async () => {
      const getTransferencia = await ultimaTransferencia();
      setTransferencia(getTransferencia);
    };
    viewTransferencia();
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    // Background
    doc.setFillColor("#f7f7f7");
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  
    // Title
    doc.setFontSize(30);
    doc.setFont("bold");
    doc.text("Comprobante de Pago", pageWidth / 2, margin + 60, "center");
  
    // Logo
    const logoImg = new Image();
    logoImg.src = descargar;
    logoImg.onload = function () {
      doc.addImage(logoImg, "PNG", margin + 30, margin + 5, 100, 30);
  
      // Card
      doc.setFillColor("#ffffff");
      doc.setDrawColor("#000000");
      doc.roundedRect(margin, margin + 90, pageWidth - margin * 2, 180, 5, 5, "FD");
  
      // Card Content
      doc.setFontSize(18);
      doc.setFont("bold");
      doc.text("Transferencia Completa", pageWidth / 2, margin + 110, "center");
  
      doc.setFontSize(14);
      doc.setFont("normal");
      doc.text("¡Gracias por tu transferencia!", pageWidth / 2, margin + 130, "center");
  
      doc.setFontSize(12);
      doc.text("Fecha: " + transferencia.fecha, pageWidth / 2, margin + 150, "center");
  
      // Monto
      doc.setFont("bold");
      doc.setFontSize(16);
      doc.text("MONTO: Q" + transferencia.monto, pageWidth / 2, margin + 170, "center");
  
      // Emisor
      const emisorImgWidth = 30; // Adjust the width as needed
      const emisorImgX = margin + 35;
      const emisorImgY = margin + 190;
  
      doc.setFontSize(14);
      doc.setFont("bold");
      doc.text("DATOS EMISOR ", emisorImgX + emisorImgWidth, margin + 230);
      doc.setFont("normal");
      doc.text("Nombre: " + transferencia.emisor?.nombreUsuario, emisorImgX + emisorImgWidth, margin + 240);
doc.text("Cuenta: " + transferencia.noCuentaEmisor, emisorImgX + emisorImgWidth, margin + 250);
  
        doc.save("comprobante_pago.pdf");
      };
    };
  

  return (
    <>
      <NavBar />
      <div
        style={{
          textAlign: "center",
          opacity: "100%",
          marginBottom: "20px",
          backgroundColor: "#004906",
          color: "#FFFFFF",
          paddingBottom: "1px",
          paddingTop: "15px",
        }}
      >
        <h1 className="mb-4">Comprobante de Pago</h1>
      </div>

      <div
        className="container mt-4 "
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="card-pdf" style={{ width: "600px" }}>
          <span
            className="card-success"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <i
              className="iCard fa fa-check"
              style={{ alignSelf: "center" }}
            ></i>
          </span>
          <img
            src={bdbLogo}
            alt="Logo"
            className="logo2 mb-2"
            style={{ width: "100px" }}
          />
          <h1 className="card-msg" style={{ textAlign: "center" }}>
            Transferencia Completa
          </h1>
          <h2 className="card-submsg" style={{ textAlign: "center" }}>
            ¡Gracias por tu transferencia!
          </h2>
          <h3 className="card-submsg" style={{ textAlign: "center" }}>
            Fecha: {transferencia.fecha}
          </h3>
          <div className="card-bodyPDF">
            <img
              src={transferencia.emisor?.img}
              className="card-avatar"
              alt="Avatar"
            />
            <div className="card-recipient-info">
              <h3>Emisor:</h3>

              <p className="card-recipient">
                {transferencia.emisor?.nombreUsuario}
              </p>
              <p className="card-email">{transferencia.noCuentaEmisor}</p>
            </div>
            <h1 className="card-price">
              <span> MONTO: </span>
              <span>Q</span>
              {transferencia.monto}
              <span></span>
            </h1>
            <img
              src={transferencia.receptor?.img}
              className="card-avatar"
              alt="Avatar"
            />
            <div className="card-recipient-info">
              <h3>Receptor:</h3>
              <p className="card-recipient">
                {transferencia.receptor?.nombreUsuario}
              </p>
              <p className="card-email">{transferencia.noCuenta}</p>
            </div>
          </div>
          <div className="card-tags text-center">
            <span className="card-tag">completed</span>
            <span className="card-tag">#123456789</span>
          </div>
        </div>
      </div>

      <div
        className="pdf-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          className="btn mt-4 mb-4"
          style={{ width: "600px" }}
          onClick={handleDownloadPDF}
        >
          <i className="fa fa-save mx-2"></i>Descargar PDF
        </button>
      </div>
    </>
  );
};
