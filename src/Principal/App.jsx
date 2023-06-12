import React from 'react'
import { NavBar } from './components/NavBar'
import { Carusel } from './components/Carusel'
import { Cards } from './components/Cards'
import { CaruselMedio } from './components/CaruselMedio'
import { Contacto } from './components/Contacto'
import { Footer } from './components/Footer'
import '../Principal/principal.css'

export const App = () => {
  return (
    <>
    
      <NavBar />
      <Carusel/>
      <Cards/>
      <CaruselMedio/>
      <Contacto/>
      <Footer />
    
    </>
  )
}
