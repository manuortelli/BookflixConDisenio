import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


//!Componentes principales 
import HomePerfiles from './components/HomePerfiles'
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
import CargarCapitulo from './components/VistaAdmin/libros/CargarArchivoCapitulo';
import DetalleLibroAdmin from './components/VistaAdmin/libros/DetalleLibroAdmin';
import ModificarCapitulo from './components/VistaAdmin/libros/ModificarCapitulo';

//!Componente de Administrador ---Novedades---

import Novedades from './components/VistaAdmin/Novedades/Novedades';
import ModificarNovedad from './components/VistaAdmin/Novedades/ModificarNovedad';
import ItemNovedadAdmin from './components/VistaAdmin/Novedades/VisualizarNovedad';
import CargarNovedad from './components/VistaAdmin/Novedades/CargarNovedad';


//!Componente de Administrador ---Trailers----

import CargarTrailer from './components/VistaAdmin/Trailers/CargarTrailer'
import VerTrailer from './components/VistaAdmin/Trailers/VisualizarTrailer'
import ListarTrailer from './components/VistaAdmin/Trailers/ListarTrailerAdmin'
import ModificarTrailer from './components/VistaAdmin/Trailers/ModificarTrailer';

//!Componente de Administrador ---Autores----
import Autores from './components/VistaAdmin/Autores/AutoresCRUD';

//!Componente de Administrador ---Editoriales----
import Editoriales from './components/VistaAdmin/Editoriales/EditorialCRUD';


//!Componente de Administrador ---Generos----
import Generos from './components/VistaAdmin/Generos/GeneroCRUD';


//!Componente de Administrador ---Suscriptores----
import Suscriptores from './components/VistaAdmin/Suscriptores/Suscriptores';


//!Componente de Administrador ---reseñas----
import ReseñasAdmin from './components/VistaAdmin/reseñas/ReseñasAdmin';


//!Componente de Administrador ---Reportes----

import Reportes from './components/VistaAdmin/Reportes/Reportes';
import ReporteDeUsuarios from './components/VistaAdmin/Reportes/ReporteDeUsuarios';
import ReporteDeLibros from './components/VistaAdmin/Reportes/ReporteDeLibros';





//!Componente de Suscriptor -----Perfiles-----
import Perfiles from './components/VistaSuscriptor/Perfiles/AgregarPerfil';


//!Componente de Suscriptor -----MiSuscripción-----

import MiSuscripcion from './components/VistaSuscriptor/VerSuscripcion';
import ModificarSuscripcion from './components/VistaSuscriptor/ModificarSuscripcion';


//!Componente de Suscriptor -----Historial-----

import Historial from './components/VistaSuscriptor/Historial/Historial';


//!Componente de Suscriptor ------Novedad-----

import ListarNovedades from './components/VistaSuscriptor/Novedades/ListarNovedades';
import ItemNovedad from './components/VistaSuscriptor/Novedades/ItemNovedad';


//!Componente de Suscriptor ------Trailer------
import ListarTrailerSuscriptor from './components/VistaSuscriptor/Trailers/ListarTrailerSuscriptor';
import VerTrailerSuscriptor from './components/VistaSuscriptor/Trailers/VisualizarTrailerSuscriptor'


//!Componente de Suscriptor ------Libros-----

import ListarLibros from './components/VistaSuscriptor/Libros/ListarLibros';
import DetalleLibro from './components/VistaSuscriptor/Libros/DetalleLibro';
import LeerLibro from './components/VistaSuscriptor/Libros/LeerLibro'
import Buscador from './components/VistaSuscriptor/Libros/Buscador';
import ModificarFechas from './components/VistaAdmin/libros/ModificarFechas';
import LeerCapitulo from './components/VistaSuscriptor/Libros/LeerLibro';
import DetalleLibroAdministrador from './components/VistaAdmin/libros/DetalleLibroAdministrador'

//!Componente de Suscriptor ------Reseñas-----
import AgregarReseña from './components/VistaSuscriptor/Reseñas/AgregarReseña';
import ListarReseña from './components/VistaSuscriptor/Reseñas/ListarReseñas';
import ModificarReseña from './components/VistaSuscriptor/Reseñas/ModificarReseña' 





function App() {

  return (

    <Router>
      <div className="body" >

        {/*----------------------Rutas-------------------------------*/}


        {/*----------------------Rutas Principales-------------------------------*/}
        <Route exact path="/"> <IniciarSesion /></Route>
        <Route exact path="/login"> <IniciarSesion /> </Route>
        <Route exact path="/singup"><RegistrarSuscriptor /> </Route>
        <Route exact path="/home" ><VerificarSesion /><Home /> </Route>
    


        {/*-----------------------Ruta Home Suscriptor------------------ */}
        <Route exact path="/homesuscriptor"> <VerificarSesion /> <HomeSuscriptor /> </Route>


        <Route exact path="/homeperfiles"> <VerificarSesion /> <HomePerfiles/> </Route>
        {/*-----------------------Rutas Libro Admin------------------ */}
        <Route exact path="/libros/modificar/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ModificarUnLibro match={match} />
          </div>
        )} >
        </Route>
        <Route exact path="/libros/modificarFechas/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />

            <ModificarFechas match={match} />
          </div>
        )} >
        </Route>


        <Route exact path="/libro/detalle/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <DetalleLibroAdministrador match={match} />
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

        <Route exact path="/libro/cargarCapitulo/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <CargarCapitulo match={match} />
          </div>
        )} ></Route>

         <Route exact path="/libro/modificarCapitulo/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ModificarCapitulo match={match} />
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

        {/*-----------------------Rutas Admin reseñas ------------------ */}

        <Route exact path='/libro/reseñas/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ReseñasAdmin match={match} />
          </div>
        )}>
        </Route>

         {/*-----------------------Rutas Admin Reportes ------------------ */}
        
         <Route exact path='/reportes' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <Reportes></Reportes>
           
          </div>
        )}>
        </Route>
        <Route exact path='/reportes/usuarios' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ReporteDeUsuarios></ReporteDeUsuarios>
           
           
          </div>
        )}>
        </Route>
        <Route exact path='/reportes/libros' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ReporteDeLibros></ReporteDeLibros>
           
           
           
          </div>
        )}>
        </Route>





        {/*-----------------------Rutas Admin Trailers ------------------ */}

        <Route exact path='/trailers/'>
          <VerificarSesion />
          <NavegacionAdmin />
          <ListarTrailer />
        </Route>

        <Route exact path='/trailers/nuevo'>
          <VerificarSesion />
          <NavegacionAdmin />
          <CargarTrailer />
        </Route>

        <Route exact path='/trailers/detalle/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <VerTrailer match={match} />
          </div>
        )}>
        </Route>

        <Route exact path="/trailers/modificar/:id" render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionAdmin />
            <ModificarTrailer match={match} />
          </div>
        )} ></Route>



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
          <Buscador></Buscador>

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

        <Route exact path='/suscriptor/libros/leerCapitulo/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <LeerCapitulo match={match} />
          </div>
        )}>
        </Route>


        <Route exact path='/suscriptor/libros/reseña/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <AgregarReseña match={match} />
          </div>
        )}>
        </Route>




        {/*--------------------------Rutas Suscriptor Trailers---------------*/}

        <Route exact path='/suscriptor/trailers/'>
          <VerificarSesion />
          <NavegacionSuscriptor />
          <ListarTrailerSuscriptor />
        </Route>

        <Route exact path='/suscriptor/trailers/detalle/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <VerTrailerSuscriptor match={match} />
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


        <Route exact path='/suscriptor/perfiles/historial' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <Historial></Historial>
          </div>
        )}>
        </Route>




        {/*-----------------------Rutas Suscriptor Perfiles------------------ */}
        <Route exact path='/suscriptor/perfiles' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <Perfiles />
          </div>
        )}>
        </Route>

           {/*-----------------------Rutas suscriptor Reseñas ------------------ */}

           <Route exact path='/suscriptor/reseñas/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <ListarReseña match={match} />
          </div>
        )}>
        </Route>

         {/*-----------------------Rutas suscriptor modificar mi Reseña ------------------ */}

         <Route exact path='/suscriptor/reseñas/mofificar/:id' render={({ match }) => (
          <div>
            <VerificarSesion />
            <NavegacionSuscriptor />
            <ModificarReseña match={match}></ModificarReseña>
           
          </div>
        )}>
        </Route>

       

      </div>

    </Router>
  );
}

export default App;
