import React, { Component } from "react";
import axios from "axios";
import DatosLibro from "./DatosLibro";
import { Link } from "react-router-dom";
import ListarCapitulos from "./ListarCapitulos";
import { Button } from "react-bootstrap";
import MostrarTrailersAsociados from "../Trailers/MostrarTrailersAsociados";

const perfiles = "http://localhost:4000/api/perfiles/";
const editoriales = "http://localhost:4000/api/editoriales/";
const generos = "http://localhost:4000/api/generos/";
const autores = "http://localhost:4000/api/autores/";
const Trailers = "http://localhost:4000/api/trailers/";

const portada = "http://localhost:4000/uploads/";
const me = "http://localhost:4000/api/libros/me";
const capi = "http://localhost:4000/api/libros/misCapitulos";

export default class DetalleLibrosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: sessionStorage.getItem("token"),
      libro: "",
      capitulos: "",
      editorial: "",
      genero: "",
      autor: "",
      bottonCap: false,
      mostrarCapitulos: false,
      trailer: null,
      capi: [],
      capitulosActivos: [],
      botonTermine: true,
    };
    this.fechaExpiracion = this.fechaExpiracion.bind(this);
    this.mostrarCapitulos = this.mostrarCapitulos.bind(this);
  }

  getNombres = async () => {
    //traigo el autor actual
    await axios
      .post(
        autores + "me",
        { id: this.state.libro.autor },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          autor: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //traigo el genero actual
    await axios
      .post(
        generos + "me",
        { id: this.state.libro.genero },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          genero: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //traigo la editorial actual
    await axios
      .post(
        editoriales + "me",
        { id: this.state.libro.editorial },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        this.setState({
          editorial: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTrailer = async () => {
    if (this.state.libro.trailer != null) {
      await axios
        .post(
          Trailers + "me",
          { id: this.state.libro.trailer },
          { headers: { xaccess: this.state.token } }
        )
        .then((res) => {
          console.log(res.data);
          console.log(res.data);
          this.setState({
            trailer: res.data,
          });
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    }
  };

  getDatos = async () => {
    await axios
      .post(
        me,
        { id: this.state.id },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        this.setState({
          libro: res.data,
          capitulos: res.data.capitulos,
        });
        this.getCapitulos();
        this.getNombres();
        this.HayCapitulos();
        this.getTrailer();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  filtrarCapitulos = (capi) => {
    console.log("CAPITULOS ANTES DE FILTRARLOS", capi);
    var validos = [];

    const hoy = JSON.stringify(new Date().getDate());
    const mes = JSON.stringify(new Date().getMonth() + 1);
    const año = JSON.stringify(new Date().getFullYear());
    const hoyEntera = JSON.stringify(new Date());

    if (capi != []) {
      capi.map((cap) => {
        const lanzaHoy = JSON.stringify(new Date(cap.lanzamiento).getDate());
        const lanzaMes = JSON.stringify(
          new Date(cap.lanzamiento).getMonth() + 1
        );
        const lanzaAño = JSON.stringify(
          new Date(cap.lanzamiento).getFullYear()
        );
        const lanzaEntera = JSON.stringify(new Date(capi.lanzamiento));
        if (
          (hoy == lanzaHoy) & (mes == lanzaMes) & (año == lanzaAño) ||
          lanzaEntera > hoyEntera
        ) {
          if (cap.vencimiento) {
            const venciHoy = JSON.stringify(
              new Date(cap.lanzamiento).getDate()
            );
            const venciMes = JSON.stringify(
              new Date(cap.lanzamiento).getMonth() + 1
            );
            const venciAño = JSON.stringify(
              new Date(cap.lanzamiento).getFullYear()
            );
            const venciEntera = JSON.stringify(new Date(cap.vencimiento));

            if (
              (venciHoy == hoy) & (venciMes == mes) & (venciAño == año) ||
              venciEntera > hoyEntera
            ) {
              validos.push(cap);
            }
          } else {
            validos.push(cap);
          }
        }
      });
      this.setState({
        capitulosActivos: validos,
      });
    }
    console.log("CAPITULOS DESPUES DE FILTRARLOS", this.state.capitulosActivos);
  };

  getCapitulos = async () => {
    await axios
      .post(
        capi,
        { id: this.props.match.params.id },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        this.setState({
          capi: res.data,
        });

        this.filtrarCapitulos(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(JSON.stringify(err.response.data.msg));
      });
  };

  HayCapitulos = () => {
    if (this.state.capitulos != "") {
      this.state.bottonCap = true;
    }
  };

  leerLibro = async () => {
    console.log("el perfil");
    console.log(sessionStorage.getItem("perfilID"));
    console.log(JSON.parse(sessionStorage.getItem("perfilUser")));
    await axios
      .post(
        perfiles + "visitadoLibro",
        { id: sessionStorage.getItem("perfilID"), libroId: this.state.id },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(JSON.stringify(err.response.data.msg));
      });
  };

  componentDidMount() {
    this.getDatos();
    this.HayCapitulos();
  }

  fechaExpiracion = () => {
    if (!this.props.libro.fechaExpiracion) {
      return (
        <h6 className="card-subtitle mb-2 text-muted">
          Fecha de expiración: {this.state.libro.expiracion}
        </h6>
      );
    } else {
      return <div />;
    }
  };

  mostrarCapitulos() {
    this.setState({
      mostrarCapitulos: !this.state.mostrarCapitulos,
    });
    console.log(this.state.mostrarCapitulos);
  }

  mostrarTermineLibro() {
    if (this.state.botonTermine) {
    }
  }

  termineLibro = async () => {
    await axios
      .post(
        perfiles + "termineLibro",
        {
          id: sessionStorage.getItem("perfilID"),
          libroId: this.state.libro._id,
        },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  render() {
    const show = this.state.bottonCap;
    const termineL = this.state.botonTermine;
    const capseleccionado = this.state.capseleccionado - 1;

    return (
      <div>
        <DatosLibro
          libro={this.state.libro}
          autor={this.state.autor}
          genero={this.state.genero}
          editorial={this.state.editorial}
        ></DatosLibro>

        {termineL ? (
          <React.Fragment>
            <div>
              <button
                className="btn btn-outline-success col-md-2 offset-md-3 danger"
                onClick={this.termineLibro}
              >
                Termine libro
              </button>
            </div>
            <br></br>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        {show ? (
          <React.Fragment>
            <div class="card col-md-6 offset-md-3">
              <button
                className="btn btn-outline-success"
                onClick={this.mostrarCapitulos}
              >
                {" "}
                Ver Capitulos
              </button>
            </div>
            {this.state.mostrarCapitulos ? (
              //console.log(this.state.capitulosActivos),
              //console.log(this.state.libro._id),
              <ListarCapitulos
                capitulos={this.state.capitulosActivos}
                libroId={this.state.libro._id}
              ></ListarCapitulos>
            ) : (
              <React.Fragment> </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div>
              <div class="card col-md-6 offset-md-3 text-light bg-dark">
                <div class="card-body ">
                  <Link
                    onClick={this.leerLibro}
                    className="btn btn-outline-success itemBoton"
                    to={"/suscriptor/libros/leer/" + this.state.libro.archivo}
                  >
                    {" "}
                    Leer Libro{" "}
                  </Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        <React.Fragment>
          <MostrarTrailersAsociados
            trailer={this.state.trailer}
          ></MostrarTrailersAsociados>
        </React.Fragment>
      </div>
    );
  }
}
