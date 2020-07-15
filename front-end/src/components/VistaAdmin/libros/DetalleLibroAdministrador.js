import React, { Component, useState } from "react";
import axios from "axios";
//import DatosLibro from "./DatosLibro";
import { Link } from "react-router-dom";
import ListarCapitulosAdmin from "./ListarCapitulosAdmin";
import { Button } from "react-bootstrap";
//import MostrarTrailersAsociados from "../Trailers/MostrarTrailersAsociados";
import HeartCheckbox from 'react-heart-checkbox';

const perfiles = "http://localhost:4000/api/perfiles/";
const editoriales = "http://localhost:4000/api/editoriales/";
const generos = "http://localhost:4000/api/generos/";
const autores = "http://localhost:4000/api/autores/";
const Trailers = "http://localhost:4000/api/trailers";

const portada = "http://localhost:4000/uploads/";
const me = "http://localhost:4000/api/libros/me";
const terminado = "http://localhost:4000/api/libros/terminado";
const capi = "http://localhost:4000/api/libros/misCapitulos";



export default class DetalleLibrosAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: sessionStorage.getItem("token"),
      miPerfil: JSON.parse(sessionStorage.getItem("perfilUser")),
      libro: "",
      capitulos: [],
      editorial: "",
      genero: "",
      autor: "",
      bottonCap: false,
      mostrarCapitulos: false,
      trailer: null,
      hayTrailer: false,
      capi: [],
      capitulosActivos: [],
      botonTermine: false,
      botonlike: false,
      verReseñas:false,

      reseñas:[{
        comentario:'muy buen libro',
        ranting:5,
        spoiler:false,
        autor:{nombre: 'Macri' }
    },{
        comentario:'lo recomiendo',
        ranting:4,
        spoiler:true,
        autor:{nombre: 'Alberto toto' }
    },{
        comentario:'malisimooo',
        ranting:1,
        spoiler:false,
        autor:{nombre: 'Anonimus' }
    },
    {
        comentario:'al final muere Thanos',
        ranting:3,
        spoiler:true,
        autor:{nombre: 'Messi' }
    }


],
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
    console.log(this.state.libro.trailer)
    console.log((this.state.libro.trailer != null) || (this.state.libro.trailer != ''))
    if ((this.state.libro.trailer != null)) {

      this.state.hayTrailer = true

      /* await axios
     .post(
       Trailers + "me",
       { id: this.state.libro.trailer },
       { headers: { xaccess: this.state.token } }
     )
     .then((res) => {
       
       this.setState({
         trailer: res.data,
         hayTrailer:true,
       });
     })
     .catch((err) => {
       console.log(err.response.data.msg);
     });
   */
    }
  };

  getTermine = async () => {
    await axios
      .post(
        terminado,
        {
          id: this.state.id,
        },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        this.setState({botonTermine:true})

      });
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
        this.getTermine();
        this.tieneLike();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  filtrarCapitulos = (capi) => {
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
        
      });
  };

  tieneLike = () => {
    this.state.miPerfil.likesLibros.forEach(element => {
      console.log("Esta haciendo el for each")
      if (element == this.props.match.params.id) {
        this.setState({ botonlike: true })
      }
    });
  }

  HayCapitulos = () => {
    if (this.state.capitulos != "") {
      this.state.bottonCap = true;
    }
  };

  leerLibro = async () => {
    if (!this.state.bottonCap) {
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
    }
  };

  componentDidMount() {
    this.getDatos();
    this.HayCapitulos();
    console.log(this.state.miPerfil)
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

  onClickLike = async () => {

    console.log("Aca presta atención", this.state.id)
    this.setState({ botonlike: !this.state.botonlike });
    await axios.post(
      perfiles + 'likeLibro',
      {
        id: this.state.miPerfil._id,
        idLibro: this.state.id,
      },
      { headers: { xaccess: this.state.token } }
    )
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });


  }



  render() {
    console.log(this.state.botonlike)
    const show = this.state.bottonCap;
    const termineL = this.state.botonTermine;
    const hayTrailer = this.state.hayTrailer;

    return (
      <div>
        <div className="container">
          <div className="cardDetalleLibro">
            <div className="card-body">
              <h3 className="card-title text-light ">
                {" "}
                {this.state.libro.titulo}
              </h3>
             
             
              <img src={portada + `${this.state.libro.portada}`} />




              <br></br>


              <div className="bodyDetalleLibro">

                <h6 className="card-subtitle mb-2 text-light">
                  Editorial: {" " + this.state.editorial.nombre}
                </h6>
                <p></p>
                <h6 className="card-subtitle mb-2 text-light">
                  Autor:{" "}
                  {" " +
                    this.state.autor.nombre +
                    " " +
                    this.state.autor.apellido}
                </h6>
                <p></p>
                <h6 className="card-subtitle mb-2 text-light">
                  Genero: {" " + this.state.genero.nombre}
                </h6>
                <p></p>
                <h6 className="card-subtitle mb-2 text-light">
                  ISBN: {" " + this.state.libro.isbn}
                </h6>
              </div>
            

              {hayTrailer ? (
                <Link className='btn btn-outline-danger itemBoton' to={'/suscriptor/trailers/detalle/' + this.state.libro.trailer}  >
                  Ver Trailer
                </Link>
              ) : (<React.Fragment> </React.Fragment>)}

             
            </div>
            {show ? (
              <React.Fragment>

                <ListarCapitulosAdmin
                  capitulos={this.state.capi}
                  libroId={this.state.libro._id}
                ></ListarCapitulosAdmin>

              </React.Fragment>
            ) : (
                <React.Fragment>

                  <div className="btn-leerlibro">
                    <Link
                      onClick={this.leerLibro}
                      className="btn btn-outline-danger itemBoton"
                      to={"/suscriptor/libros/leer/" + this.state.libro.archivo}
                    >
                      {" "}
                    Leer Libro{" "}
                    </Link>
                    <button
                      className="btn btn-outline-danger itemBoton">
                      {" "}
                    Eliminar Libro{" "}
                    </button>
                    <button
                      className="btn btn-outline-danger itemBoton">
                      {" "}
                    Eliminar Archivo de libro{" "}
                    </button>
                  </div>

                </React.Fragment>
              )}
              <div className="btn-leerlibro">
                    <Link
                      
                      className="btn btn-outline-danger itemBoton"
                      to={'/libro/reseñas/' +this.state.id}
                      
                    >
                      {" "}
                    Ver Reseñas{" "}
                    </Link>
                  </div>


          </div>
        </div>



      </div>
    );
  }
}
