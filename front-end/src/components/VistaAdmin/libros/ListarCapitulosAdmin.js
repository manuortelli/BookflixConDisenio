import React, { Component } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import axios from "axios";

import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const perfiles = "http://localhost:4000/api/perfiles/";
const libros = "http://localhost:4000/api/libros/";
const eliminarCapitulo = "http://localhost:4000/api/libros/eliminarCapitulo";

export default class ListarCapitulosAdmin extends Component {
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
    console.log("Esto llega en el props de listar capitulos",this.props.capitulos);
  };
  pasarCapitulo=(capi)=>{
    sessionStorage.setItem(capi._id,JSON.stringify(capi));
  }

  eliminarCapitulo = async (capiID) => {
    console.log("id de capitulo");
    console.log(this.props.capiID);
    console.log("id de libro");
    console.log(this.props.libroId);
    await axios.post(eliminarCapitulo,
        { idLibro: this.props.libroId,
          idCapitulo:capiID
        },
        { headers: { 'xaccess': sessionStorage.getItem('token') } }

    ).then(res => {
      alert(JSON.stringify(res.data.msg))
    })
        .catch(err => {
          alert(JSON.stringify(err.response.data.msg))
        });

}

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
                    
                    className="btn btn-outline-danger itemBoton"
                    to={"/suscriptor/libros/leerCapitulo/" + capi.archivo}
                  >
                    Leer Capitulo
                </Link>
                {''}

                <button className="btn btn-outline-danger itemBoton" onClick={() => confirmAlert({
                            customUI: ({ onClose }) => {
                                return (
                                    <div className='custom-ui'>
                                        <h1>¿Está seguro?</h1>
                                        {' '}
                                      
                                        {' '}
                                        <button onClick={onClose}>No</button> {' '}
                                        <button
                                            onClick={() => {
                                                this.eliminarCapitulo(capi._id);
                                                onClose();
                                            }}
                                        >
                                            Si, deseo eliminar
                            </button>
                                    </div>
                                );
                            }
                                     })}>Eliminar</button>
                <Link 
                to={ '/libro/modificarCapitulo/'+capi._id}
                onClick={this.pasarCapitulo(capi)}
                className="btn btn-outline-danger itemBoton"> Modificar Capitulos</Link>{' '}
                </li>
              </ul>

            </React.Fragment>
          ))}
        </div>

      </div>
    );
  }
}
