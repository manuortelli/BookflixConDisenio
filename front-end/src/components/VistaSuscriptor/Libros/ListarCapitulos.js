import React, { Component } from "react";
import ItemListLibro from "./ItemListLibro";
import axios from "axios";
import LeerLibro from "./LeerLibro";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from "react-bootstrap";

const perfiles = "http://localhost:4000/api/perfiles/";
const libros = "http://localhost:4000/api/libros/";
export default class ListarLibros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: sessionStorage.getItem("token"),
      idPerfil: "",
    };
  }

  leerCapitulo = async (id) => {
    await axios
      .post(
        perfiles + "visitadoCapitulo",
        { id: sessionStorage.getItem("perfilID"), capituloId: id },
        { headers: { xaccess: this.state.token } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };


  componentDidMount() {
    console.log("Esto llega aca tenes q mirar",this.props.capitulos);
  };

  mostrarFecha = () => { };
  render() {
    return (
      <div>
        {this.props.capitulos == [] ? (
          <div class="card col-md-6 offset-md-3 text-light bg-dark ">
            <div class="card-body">
              <h1> No hay capitulos Disponibles</h1>
            </div>
          </div>
        ) : (
            <div></div>
          )}

        <h3 className="card-header text-light">Capitulos disponibles</h3>
        <div className="container-capitulos">
          {this.props.capitulos.map((capi) => (
            <React.Fragment>

              <ul>

                <li>
                  <span className="card-title text-light ">{capi.titulo} </span>
                  <Link
                    onClick={() => this.leerCapitulo(capi._id)}
                    className="btn btn-outline-danger itemBoton"
                    to={"/suscriptor/libros/leerCapitulo/" + capi.archivo}
                  >
                    Leer Capitulo
                </Link>
                </li>
              </ul>

            </React.Fragment>
          ))}
        </div>

      </div>
    );
  }
}
