import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import emailConfig from './emailHelper/emailConfig';
import { animateScroll as scroll } from 'react-scroll';
export const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        telefono: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail(formData);
        setFormData({
            name: '',
            email: '',
            message: '',
            telefono: ''
        });
    };

    useEffect(() => {
        const handleScroll = () => {
          const element = document.getElementById("contact");
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
    
          if (elementPosition < screenPosition) {
            element.classList.add("fade-in");
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    const sendEmail = (formData) => {
        const templateParams = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            telefono: formData.telefono,
            to_email: 'dquinonez-2021045@kinal.edu.gt', // Dirección de correo electrónico de destino
        };

        emailjs
            .send(
                emailConfig.serviceID,
                emailConfig.templateID,
                templateParams,
                emailConfig.userID
            )
            .then((response) => {
                console.log('Email sent!', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <>



            <Container  className="cont text-center">
                <div>
                    <h1>Contactanos</h1>
                    <hr />
                </div>

                <div id="contact" className="form-container">
                    <div id="message"></div>
                    <Form onSubmit={handleSubmit} className="mt-5">
                        <Row>
                            <Col sm={4}>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder='Nombre'
                                    />
                                </Form.Group>
                                <br />
                            </Col>
                            <Col sm={4}>
                                <Form.Group controlId="formEmail">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder='Correo'
                                    />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group controlId="formName">
                                    <Form.Control
                                        type="number"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        placeholder='Telefono'
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formMessage">
                            <Form.Control
                                as="textarea"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                required
                                placeholder='Mensaje'
                            />
                            <p className="small text-muted">
                                <span className="guardsman"></span> Tendra una respuesta lo mas pronto posible
                            </p>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </div>
            </Container>

            <br /><br />

        </>
    );
};

