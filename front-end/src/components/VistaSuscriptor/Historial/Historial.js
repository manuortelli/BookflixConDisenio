import React, { Component } from "react";
import axios from "axios";
import HistorialLibros from "./HistorialLibros";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, Redirect } from "react-router-dom";

//Constante a la cual hacemos la consulta
const librosApi = "http://localhost:4000/api/libros/me";
const capitulosApi = "http://localhost:4000/api/libros/verCapitulo";
const existeL = "http://localhost:4000/api/libros/existeLibro";
const existeC = "http://localhost:4000/api/libros/existeCapitulo";
const miperfilApi = "http://localhost:4000/api/perfiles/me";
const portada = "http://localhost:4000/uploads/";

export default class MiSuscripcion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      miPerfil: [],
      historialLibros: [],
      historialCapitulos: [],

      libros: [],
      capitulos: [],
      historialTodoJunto: [],
      historialTodoJunto2: [],
      mostrarSlider: true,
    };

    this.getLibro = this.getLibro.bind(this);
    this.getCapitulo = this.getCapitulo.bind(this);
    this.renderLibros = this.renderLibros.bind(this);
  }


  filtrarFechas = (lib) => {

    const hoyEntera = new Date();
    var res = false;

    if (lib.lanzamiento != null) {
      const hoy = JSON.stringify(new Date().getDate());
      const mes = JSON.stringify(new Date().getMonth() + 1);
      const año = JSON.stringify(new Date().getFullYear());

      const lanMes = JSON.stringify(new Date(lib.lanzamiento).getMonth() + 1);
      const lanHoy = JSON.stringify(new Date(lib.lanzamiento).getDate());
      const lanAño = JSON.stringify(new Date(lib.lanzamiento).getFullYear());
      const lanzaEntera = new Date(lib.lanzamiento);
      if (
        (lanHoy == hoy) & (lanMes == mes) & (lanAño == año) ||
        lanzaEntera < hoyEntera
      ) {
        if (lib.expiracion != null) {
          var ven = new Date(lib.expiracion);
          const venciMes = JSON.stringify(
            new Date(lib.expiracion).getMonth() + 1
          );

          const venciHoy = JSON.stringify(new Date(lib.expiracion).getDate());

          const venciAño = JSON.stringify(
            new Date(lib.expiracion).getFullYear()
          );
          const venciEntera = new Date(lib.expiracion);

          if (
            (venciHoy == hoy) & (venciMes == mes) & (venciAño == año) ||
            venciEntera > hoyEntera
          ) {
            res = true;

          }
        } else {
          res = true;

        }
      }

    }

    return res;
  };


  renderLibros = () => {
    return (
      <div>
        {
          (console.log("entro al renderLibros"),
            this.state.libros.map((hola) => {
              console.log(hola);
            }))
        }
      </div>
    );
  };

  getLibro = async (libro) => {
    await axios
      .post(
        librosApi,
        { id: libro.libro },
        { headers: { xaccess: sessionStorage.getItem("token") } }
      )
      .then((res) => {
       
       if (res.data.archivo != "") {
        var libroObjetoParaHistorial = {
          archivo: res.data.archivo,
          titulo: res.data.titulo,
          ultimoAcceso: libro.ultimoAcceso,
          terminado: libro.terminado,
          libroInfoTotal: res.data,
          capituloInfoTotal: "",
          lanzamiento: res.data.lanzamiento,
          expiracion: res.data.expiracion
        };


        var libroObjetoParaHistorial2 = this.filtrarFechas(libroObjetoParaHistorial);

        if (libroObjetoParaHistorial2 ) {
          
          this.setState({
            historialTodoJunto: [
              ...this.state.historialTodoJunto,
              libroObjetoParaHistorial,
            ],
          });
        }
      } 
      });
      
  };

  getCapitulo = async (capitulo) => {
    await axios
      .post(
        capitulosApi,
        { id: capitulo.capitulo },
        { headers: { xaccess: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        console.log("Lo que llega del capitulo", res.data)
        var capituloObjetoParaHistorial = {
          archivo: res.data.archivo,
          titulo: res.data.titulo + res.data.n,
          ultimoAcceso: capitulo.ultimoAcceso,
          terminado: capitulo.terminado,
          libroInfoTotal: "",
          capituloInfoTotal: res.data,
          lanzamiento: res.data.lanzamiento,
          expiracion: res.data.vencimiento
        };

        var capituloObjetoParaHistorial2 = this.filtrarFechas(capituloObjetoParaHistorial);
        if (capituloObjetoParaHistorial2) {
        this.setState({
          historialTodoJunto: [
            ...this.state.historialTodoJunto,
            capituloObjetoParaHistorial,
          ],
        });}
      });
  };

  mostrarFecha = (f) => {
    var fecha = new Date(f);
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    return (fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear()+ " " +fecha.getHours()+":" +fecha.getMinutes()+ " hs " );
    //return fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
  }

  // async filtrarL(historialL) {
  //   return new Promise(async (res, rej) => {
  //     if (historialL.length > 0) {
  //       var existentes = new Array();

  //       const promesa = historialL.map(async (libro) => {
  //         return await axios
  //           .post(
  //             existeL,
  //             {
  //               id: libro._id,
  //             },
  //             { headers: { xaccess: sessionStorage.getItem("token") } }
  //           )
  //           .then((res) => {
  //             if (res.data.existe) {
  //               existentes.push(libro);
  //             }
  //             debugger;
  //           });
  //       });
  //       await Promise.all(promesa);

  //       res(existentes);
  //     } else {
  //       res([]);
  //     }
  //   });
  // }
  // async filtrarC(historialC) {
  //   return new Promise(async (res, rej) => {
  //     if (historialC.length > 0) {
  //       var existentes = new Array();

  //       const promesa = historialC.map(async (capitulo) => {
  //         return await axios
  //           .post(
  //             existeC,
  //             {
  //               id: capitulo._id,
  //             },
  //             { headers: { xaccess: sessionStorage.getItem("token") } }
  //           )
  //           .then((res) => {
  //             if (res.data.existe) {
  //               existentes.push(capitulo);
  //             }
  //           });
  //       });
  //       await Promise.all(promesa);

  //       res(existentes);
  //     } else {
  //       res([]);
  //     }
  //   });
  // }

  async componentDidMount() {
    var historialL = new Array();
    var historialC = new Array();

    await axios
      .get(miperfilApi, {
        headers: { xaccess: sessionStorage.getItem("token") },
      })
      .then(async (res) => {
        this.setState({
          miPerfil: res.data,
        });
        if (res.data.historialLibros) {
          res.data.historialLibros.map((libro) => {
            historialL.push(libro);
          });
          //historialL = await this.filtrarL(historialL);
          historialL.map(async (libro) => {
            await this.getLibro(libro);
          });
        }
        if (res.data.historialCapitulos) {
          res.data.historialCapitulos.map((cap) => {
            historialC.push(cap);
          });
          //historialC = await this.filtrarC(historialC);
          historialC.map((capitulo) => {
            this.getCapitulo(capitulo);
          });
        }
      })
      .catch((err) => {
        alert(err.response);
      });


   

  }

  

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 3,
      className: "slides",
    };
  
    
    
    return (
      <div className="carrusel">
        <h3 className="libros-disponibles">Historial</h3>
        {this.state.historialTodoJunto.length != 0 ? (
          <React.Fragment>
            <Slider {...settings}>
              {this.state.historialTodoJunto.map((libro) => (
                <div className="container-VerLibro">
                  <div className="box">
                    <div className="imgBx" >
                      {(libro.libroInfoTotal != "") ?
                        <Link className="imgBx" to={"/suscriptor/libros/" + libro.libroInfoTotal._id}>
                          <img src={portada + libro.libroInfoTotal.portada} />
                        </Link>
                        :
                        <Link className="imgBx" to={"/suscriptor/libros/" + libro.capituloInfoTotal.libro}>
                          <img src={portada + libro.capituloInfoTotal.portada} />
                        </Link>
                      }
                    </div>
                    <span className="content">
                      <span>
                        <br></br>
                        <h2 className="titulo"> {libro.titulo} </h2>
                        <h2 className="titulo"> Ultimo acceso: {this.mostrarFecha(libro.ultimoAcceso)}</h2>
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </React.Fragment>
        ) : (
            <div className="cardErrorFavoritos">
              <h4>DISCULPE POR EL MOMENTO NO HAY LIBROS/CAPITULOS EN EL HISTORIAL</h4>
            </div>
          )
        }
      </div>

    );
  }
}
/*


linea 177


              libros.map((libro, index) => (
                <div key={index}> {libro.titulo}</div>
              ))


              */



/*<div className="container">
  <div className="cardVS col-md-6 offset-md-3 text-light bg-dark">
    <div>
      <h2 className="card-header">
        {" "}
        Historial de {this.state.miPerfil.nombre}{" "}
      </h2>
    </div>

    <div className="card-body">
      {libros ? (
        this.state.historialTodoJunto.map((libro, index) => (
          <div key={index}> {libro.titulo}</div>
        ))
      ) : (
        <div>No ha visitado ningún libro </div>
      )}
      {capitulos ? (
        capitulos.map((capitulo, index) => (
          <div key={index}>
            {" "}
            {capitulo.titulo} ,{capitulo.tituloLibro}
          </div>
        ))
      ) : (
        <div> No ha visitado ningún capítulo </div>
      )}
    </div>
  </div>
</div>*/