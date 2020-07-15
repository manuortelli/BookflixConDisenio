import React, { Component } from "react";
import axios from "axios";
import { Container, Col, Row, Card } from "react-bootstrap";

//PARA EL CARROUSEL
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, Redirect } from "react-router-dom";

const recomendados = "http://localhost:4000/api/perfiles/recomendados";
const portada = "http://localhost:4000/uploads/";

class Recomendados extends Component {
  constructor() {
    super();
    this.state = {
      Perfil: JSON.parse(sessionStorage.getItem("perfilUser")),
      user: JSON.parse(sessionStorage.getItem("user")),
      token: sessionStorage.getItem("token"),
      libros: [],
      librosCarrousel: [],
      mostrarSlider: false,
      mensaje:'Estamos cargando tus Recomendaciones...'
    };
  }

  filtrarFechas = (libros) => {
    var res = [];
    const hoyEntera = new Date();
    libros.map((lib) => {
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
              res.push(lib);
            }
          } else {
            res.push(lib);
          }
        }
      }
    });
    return res;
  };

  setLibros(res) {
    var re = this.filtrarFechas(res);
    this.setState({
      libros: res,
      librosCarrousel: re,
    });
    console.log("VER ACA: ", re);
    if (this.state.librosCarrousel.length > 0) {
      this.setState({
        mostrarSlider: true,
      });
    }
  }

  getData = async () => {
    await axios
      .post(
        recomendados,
        {
          id: this.state.Perfil._id,
        },
        {
          headers: { xaccess: this.state.token },
        }
      )
      .then((res) => {
        console.log("Que llega acá?", res);
        if (res.data.length > 0) {
          this.setLibros(res.data);
        }
        this.setState({
          mensaje:'No existen recomendaciones para usted, ya que las mismas se basan en sus colecciones de likes e historial y ambas estan vacías'
        })
      })
      .catch();
  };

  async componentDidMount() {
    this.getData();
  }
  verDetalle = (id) => {
    return <Redirect to={"/suscriptor/libros/leer/" + id}> </Redirect>;
  };

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      className: "slides",
    };

    return (
      <div className="carrusel">
        <h3 className="libros-disponibles">Recomendados</h3>

        {this.state.librosCarrousel.length == 0 ? (
          <React.Fragment>
             <div className="cardErrorFavoritos">
              <h4>{this.state.mensaje}</h4>
            </div>

          </React.Fragment>):
          (
            <React.Fragment>
        <Slider {...settings}>
          {this.state.librosCarrousel.map((libro) => (
            <div className="container-VerLibro">
              <div className="box">
                <Link className="imgBx" to={"/suscriptor/libros/" + libro._id}>
                  <img src={portada + libro.portada} />
                </Link>
                <span className="content">
                  <span>
                    <br></br>
                    <h2 className="titulo"> {libro.titulo} </h2>
                  </span>
                </span>
              </div>
            </div>
          ))}
        </Slider>
        </React.Fragment>)}
      </div>
    );
  }
}

export default Recomendados;
