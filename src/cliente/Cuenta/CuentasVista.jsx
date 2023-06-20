import React, { useEffect, useState } from 'react';
import { apiMisCuentas } from './api/apiCuentas';
import { NavBar } from '../NavbarCliente';

export const CuentasVista = () => {
  const [cuenta, setCuenta] = useState([]);

  useEffect(() => {
    const viewMisCuentas = async () => {
      const getMisCuentas = await apiMisCuentas();
      setCuenta(getMisCuentas);
    };

    viewMisCuentas();
  }, []);

  const getGradientColor = (index) => {
    const hue = (index * 40) % 360;
    const gradientColor = `linear-gradient(to right, hsl(${hue}, 40%, 10%), hsl(${hue}, 100%, 30%))`;
    return gradientColor;
  };

  const [cardStyles, setCardStyles] = useState([]);

  useEffect(() => {
    const updatedCardStyles = cuenta.map((c, index) => {
      const gradientColor = getGradientColor(index);
      return {
        background: gradientColor,
      };
    });
    setCardStyles(updatedCardStyles);
  }, [cuenta]);

  const [originalCardPositions, setOriginalCardPositions] = useState([]);

  const handleMouseMove = (event, index) => {
    const card_x = getTransformValue(event.clientX, window.innerWidth, 56);
    const card_y = getTransformValue(event.clientY, window.innerHeight, 56);
    moveCard(index, card_x, card_y);
  };

  const handleMouseLeave = (index) => {
    resetCardStyles(index);
  };

  const moveCard = (index, card_x, card_y) => {
    const updatedCardStyles = cardStyles.map((style, i) => {
      if (i === index) {
        return {
          ...style,
          transform: `rotateX(${card_y / 1}deg) rotateY(${card_x}deg)`,
          boxShadow: `-${card_x}px ${card_y / 1}px 55px rgba(0, 0, 0, .55)`,
        };
      }
      return style;
    });
    setCardStyles(updatedCardStyles);
  };

  const saveOriginalCardPosition = (index, card_x, card_y) => {
    const updatedOriginalPositions = [...originalCardPositions];
    updatedOriginalPositions[index] = { card_x, card_y };
    setOriginalCardPositions(updatedOriginalPositions);
  };

  const resetCardStyles = (index, resetCard_x, resetCard_y) => {
    const updatedCardStyles = cardStyles.map((style, i) => {
      if (i === index) {
        return {
          ...style,
          transform: `rotateX(${
            resetCard_y / 1
          }deg) rotateY(${resetCard_x}deg)`,
          boxShadow: `-${resetCard_x}px ${
            resetCard_y / 1
          }px 55px rgba(0, 0, 0, .55)`,
        };
      }
      return style;
    });
    setCardStyles(updatedCardStyles);
  };

  const getTransformValue = (v1, v2, value) => {
    return ((v1 / v2) * value - value / 2).toFixed(1);
  };

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.remove("active");
    }, 2200);
  }, []);

  useEffect(() => {
    const updatedOriginalPositions = cuenta.map(() => ({}));
    setOriginalCardPositions(updatedOriginalPositions);
  }, [cuenta]);

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
          <h1 className="mb-4">Mis Cuentas</h1>
        </div>
      <div className='container mt-4'>
        {cuenta.length > 0 ? (
          cuenta.map((c, index) => (
            <div className="floating mt-4" style={cardStyles[index]} 
            onMouseEnter={(event) =>
              saveOriginalCardPosition(index, event.clientX, event.clientY)
            }
            onMouseMove={(event) => handleMouseMove(event, index)}
            onMouseLeave={() => handleMouseLeave(index)}
            key={c._id}>
              <div className="thickness"></div>
              <div className="thickness"></div>
              <div className="thickness"></div>
              <div className="card_body">
                <div className="paypal_center svg"></div>
                <div className="logo svg"></div>
                <div className="paywave svg"></div>
                <div className="chips svg"></div>
                <div className="card_info">
                  <div className="card_no text">{c.noCuenta}</div>
                  <div className="valid_date text">Saldo: {c.saldo}</div>
                  <div className="valid_date2 text">Tipo: {c.tipoCuenta.tipo}</div>
                  <div className="holder text">{c.usuario.nombre}</div>
                </div>
                <div className="mastercard_icon svg"></div>
              </div>
            </div>
          ))
        ) : (
          <div>Cargando cuentas...</div>
        )}
      </div>
    </>
  );
};
