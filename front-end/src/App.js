import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


//!Componentes principales 

import Home from './components/Home';
import IniciarSesion from './components/IniciarSesion';
import RegistrarSuscriptor from './components/RegistrarSuscriptor';
import VerificarSesion from './components/VerificarSesion';
import HomeSuscriptor from './components/VistaSuscriptor/HomeSuscriptor'

//!Componente de navegaciones ----Suscriptor&Admin-----
import NavegacionAdmin from './components/VistaAdmin/NavegacionAdmin';
import NavegacionSuscriptor from './components/VistaSuscriptor/NavegacionSuscriptor';


//!Componente de Administrador ---Libro---

import Libros from './components/VistaAdmin/libros/Libros';
import ModificarUnLibro from './components/VistaAdmin/libros/ModificarUnLibro';
import CargarMetadata from './components/VistaAdmin/libros/CargarMetadataLibro';
import CargarLibro from './components/VistaAdmin/libros/CargarArchivoLibro';
import DetalleLibroAdmin from './components/VistaAdmin/libros/DetalleLibroAdmin';

//!Componente de Administrador ---Novedades---

import Novedades from './components/VistaAdmin/Novedades/Novedades';
import ModificarNovedad from './components/VistaAdmin/Novedades/ModificarNovedad';
import ItemNovedadAdmin from './components/VistaAdmin/Novedades/VisualizarNovedad';
import CargarNovedad from './components/VistaAdmin/Novedades/CargarNovedad';


//!Componente de Administrador ---Trailers----

import CargarTrailer from './components/VistaAdmin/Trailers/CargarTrailer'
import VerTrailer from './components/VistaAdmin/Trailers/VisualizarTrailer'
import ListarTrailer from './components/VistaAdmin/Trailers/ListarTrailerAdmin'

//!Componente de Administrador ---Autores----
import Autores from './components/VistaAdmin/Autores/AutoresCRUD';

//!Componente de Administrador ---Editoriales----
import Editoriales from './components/VistaAdmin/Editoriales/EditorialCRUD';


//!Componente de Administrador ---Generos----
import Generos from './components/VistaAdmin/Generos/GeneroCRUD';


//!Componente de Administrador ---Suscriptores----
import Suscriptores from './components/VistaAdmin/Suscriptores/Suscriptores';


//!Componente de Suscriptor -----Perfiles-----

import Perfiles from './components/VistaSuscriptor/Perfiles';
import NuevoPerfil from './components/VistaSuscriptor/NuevoPerfil';

//!Componente de Suscriptor -----MiSuscripción-----

import MiSuscripcion from './components/VistaSuscriptor/VerSuscripcion';
import ModificarSuscripcion from './components/VistaSuscriptor/ModificarSuscripcion';


//!Componente de Suscriptor ------Novedad-----

import ListarNovedades from './components/VistaSuscriptor/Novedades/ListarNovedades';
import ItemNovedad from './components/VistaSuscriptor/Novedades/ItemNovedad';


//!Componente de Suscriptor ------Libros-----

import ListarLibros from './components/VistaSuscriptor/Libros/ListarLibros';
import DetalleLibro from './components/VistaSuscriptor/Libros/DetalleLibro';
import LeerLibro from './components/VistaSuscriptor/Libros/LeerLibro'


function App() {

  return (

    <Router>
      <div className="body" >

        {/*----------------------Rutas-------------------------------*/}


        {/*----------------------Rutas Principales-------------------------------*/}
        <Route exact path="/"> <IniciarSesion /></Route>
        <Route exact path="/login"> <IniciarSesion /> </Route>
        <Route exact path="/singup"><RegistrarSuscriptor /> </Route>
        <Route exact path="/home" ><VerificarSesion /><Home/> </Route>


        {/*-----------------------Ruta Home Suscriptor------------------ */}
        <Route exact path="/homesuscriptor"> <VerificarSesion /> <HomeSuscriptor /> </Route>


         {/*-----------------------Rutas Libro Admin------------------ */}
        <Route exact path="/libros/modificar/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ModificarUnLibro match={match} />
          </div>
        )} >
        </Route>


        <Route exact path="/libro/detalle/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <DetalleLibroAdmin match={match} />
          </div>
        )} >

        </Route>
        <Route exact path='/libro/nuevo'>
          <VerificarSesion />
          <NavegacionAdmin />
          <CargarMetadata />
        </Route>

        <Route exact path="/libro/cargar/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <CargarLibro match={match} />
          </div>
        )} ></Route>


        {/*-----------------------?????????????????------------------ */}
        <Route exact path='/libros'><VerificarSesion /> <Libros />  </Route>



        {/*-----------------------Rutas Novedades------------------ */}

        <Route exact path='/novedades'> <Novedades /> </Route>

         {/*-----------------------Rutas Admin Novedades------------------ */}

        <Route exact path='/novedad/nueva'>
          <VerificarSesion />
          <NavegacionAdmin />
          <CargarNovedad />
        </Route>

        <Route exact path="/novedad/detalle/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ItemNovedadAdmin match={match} />
          </div>
        )} ></Route>

        <Route exact path="/novedades/modificar/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ModificarNovedad match={match} />
          </div>
        )} ></Route>



         {/*-----------------------Rutas Admin Trailers ------------------ */}

         <Route exact path='/trailers/'>
          <VerificarSesion />
          <NavegacionAdmin />
          <ListarTrailer/>
        </Route>
       
        <Route exact path='/trailers/nuevo'>
          <VerificarSesion />
          <NavegacionAdmin />
          <CargarTrailer />
        </Route>

        <Route exact path='/trailers/detalle/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <VerTrailer match={match} />
          </div>
        )}>
        </Route>
    


         {/*-----------------------Rutas Admin Autores------------------ */}
        <Route exact path='/autores'> <VerificarSesion /> <Autores /> </Route>
        {/*-----------------------Rutas Admin Editoriales------------------ */}
        <Route exact path='/editoriales'> <VerificarSesion /> <Editoriales /> </Route>
        {/*-----------------------Rutas Admin Generos------------------ */}
        <Route exact path='/generos'><VerificarSesion />   <Generos /> </Route>
        {/*-----------------------Rutas Admin Suscriptores------------------ */}
        <Route exact path='/suscriptores'> <VerificarSesion /> <Suscriptores /> </Route>



        {/*-----------------------Rutas Suscriptor Novedad------------------ */}
        <Route exact path='/suscriptor/novedades'>
          <VerificarSesion />
          <NavegacionSuscriptor />
          <ListarNovedades />
        </Route>

        <Route exact path='/suscriptor/novedad/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <ItemNovedad match={match} />
          </div>
        )}>

        </Route>

        {/*-----------------------Rutas Suscriptores Libros------------------ */}
        <Route exact path='/suscriptor/libros'> <VerificarSesion /> <NavegacionSuscriptor />
          <ListarLibros></ListarLibros>
        </Route>

        <Route exact path='/suscriptor/libros/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <DetalleLibro match={match} />
          </div>
        )}>
        </Route>

        <Route exact path='/suscriptor/libros/leer/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <LeerLibro match={match} />
          </div>
        )}>
        </Route>


        {/*-----------------------Rutas Suscriptor Suscripción------------------ */}
        <Route exact path='/suscriptor/suscripcion' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <MiSuscripcion></MiSuscripcion>
          </div>
        )}>
        </Route>

        <Route exact path='/suscriptor/suscripcion/modificar' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <ModificarSuscripcion></ModificarSuscripcion>
          </div>
        )}>
        </Route>

        {/*-----------------------Rutas Suscriptor Perfiles------------------ */}
        <Route exact path='/suscriptor/suscripcion/perfiles' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <Perfiles />
          </div>
        )}>
        </Route>

        <Route exact path='/suscriptor/suscripcion/perfiles/agregar' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <NuevoPerfil />
          </div>
        )}>
        </Route>

      </div>

    </Router>
  );
}

export default App;
