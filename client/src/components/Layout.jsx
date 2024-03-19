import React from 'react'
import {Outlet} from "react-router-dom"
import Header from './Header'
import Footer from './Footer'


// <Outlet> agit comme un emplacement qui affiche le contenu des routes enfants au sein du composant parent, permettant ainsi une composition de l’interface utilisateur plus flexible et organisée

const Layout = () => {
  return (
    <>
        <Header />
            <Outlet />
        <Footer />
    </>
  )
}

export default Layout