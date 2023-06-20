import React from 'react';
import { Carousel } from "react-bootstrap";
import { data } from './imagesCarusel/Data';

export const Carusel = () => {
  const interval = 4000;

  return (
    <>
      <Carousel interval={interval} fade={false}>
        {data.map((item, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100 fixed-height" src={item.image} alt={item.descripcion} />
            <Carousel.Caption>
              {/* Contenido de la leyenda si es necesario */}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};