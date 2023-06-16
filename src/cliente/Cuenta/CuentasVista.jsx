import React, { useEffect, useState } from "react";
import { NavBar } from "../NavbarCliente";
import { apiMisCuentas } from "./api/apiCuentas";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";

export const CuentasVista = () => {
  const navigate = useNavigate();
  const [misCuentas, setMisCuentas] = useState([]);

  const viewMisCuentas = async () => {
    const getMisCuentas = await apiMisCuentas();
    setMisCuentas(getMisCuentas);
  };

  useEffect(() => {
    viewMisCuentas();
  }, []);

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
          paddingTop: "15px"
        }}
      >
        <h1 class="display-4 font-weight-bold mb-4" id="">Listado de cuentas</h1>
      </div>
      <Container>
        <Row className="mt-5">
          <Col>
            
          </Col>
        </Row>
        <Row className="mt-3">
          {misCuentas.map((c) => (
            <Col key={c._id} md={6} lg={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Numero de cuenta: {c.noCuenta}</Card.Title>
                  <Card.Text>Tipo de cuenta: {c.tipoCuenta.tipo}</Card.Text>
                  <Card.Text>Balance: {c.saldo}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};