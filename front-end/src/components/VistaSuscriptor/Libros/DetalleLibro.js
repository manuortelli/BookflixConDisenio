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
      mostrarCapitulos: true,
      trailer: null,
      capi:[],
      capitulosActivos:[],
      botonTermine:true,
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
        console.log(res.data);
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
        console.log(res.data);
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


  filtrarCapitulos=(capi)=>{
      var validos=[];
      var hoy = new Date();
      if( capi != []){
          capi.map(cap=>{
              
            if(cap.lanzamiento < hoy  && cap.expiracion > hoy){
                validos.push(cap)

            }
          }
          )
          this.setState({
            capitulosActivos:validos
          })

      }

  }

  getCapitulos=async ()=>{
    await axios.post(capi ,
      { id: this.props.match.params.id },
      { headers: { xaccess: this.state.token } }
    )
    .then((res) => {
      console.log(res.data);
      this.setState({
          capi:res.data
      })
      this.filtrarCapitulos(res.data);

    })
    .catch((err) => {
      console.log(err);
      alert(JSON.stringify(err.response.data.msg));
    });
  }


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
  }
  mostrarTermineLibro() {
   
  }

  termineLibro = async() => {
    await axios
    .post(
      perfiles + "termineLibro",
      { id: sessionStorage.getItem("perfilID"), libroId: this.state.id },
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
        <br></br>
        {termineL ? (
        <React.Fragment>
        <button className="btn btn-outline-success col-md-2 offset-md-3" onClick={this.termineLibro}>
          Termine libro
        </button>
        <br></br>
        <br></br>
        </React.Fragment>):( <React.Fragment></React.Fragment>)
        
        }
            
       

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
              <React.Fragment> </React.Fragment>
            ) : (
              <ListarCapitulos
                capitulos={this.state.capitulosActivos}
                libroId={this.state.libro._id}
              ></ListarCapitulos>
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
