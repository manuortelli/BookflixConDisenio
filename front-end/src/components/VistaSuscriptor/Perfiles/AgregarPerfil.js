import React, { Component } from 'react';

import axios from "axios";
import { Link } from 'react-router-dom';
import Perfiles from './ListadoPerfiles';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const misPerfiles = "http://localhost:4000/api/suscriptores/loginPerfiles";
const cargar = "http://localhost:4000/api/suscriptores/agregarPerfil";
const borrarPerfil = "http://localhost:4000/api/perfiles/eliminar";
const loginPerfilApi = "http://localhost:4000/api/suscriptores/loginPerfil";
const verPadre = "http://localhost:4000/api/suscriptores/me"

class AgregarPerfil extends Component {
    constructor() {
        super()
        this.state = {
            token: sessionStorage.getItem("token"),
            suscripcion:[],
            miPerfil: JSON.parse(sessionStorage.getItem("perfilUser")),
            nombre: '',
            misPerfiles: [],
            nombreUsado:false,
        }
    
        this.onInputChange = this.onInputChange.bind(this);
    
    
    
    }
    
    ingresarPerfil = async (e, idllega) => {
        console.log("id que llega ", idllega)
        await axios
            .post(
                loginPerfilApi,
                { id: idllega },
                {
                    headers: { xaccess: sessionStorage.getItem("token") },
                }
            )
            .then((res) => {
    
                const { user, token } = res.data;
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("perfilUser", JSON.stringify(user));
                sessionStorage.setItem("perfil", res.data.user);
                sessionStorage.setItem("perfilID", user._id);
                return (window.location = '/homesuscriptor')
    
    
            });
    
    }

    verPadre = async () => {
        await axios.get(verPadre,
           {
                headers: { 'xaccess': sessionStorage.getItem('token') }
            })
            .then(res => {
                this.setState({
                    suscripcion:res.data
                })
                console.log("Respuesta de consulta ver padre",res.data)
                
            })
            .catch(err => {
                alert(err.response)
            });
    }
    
    borrarperfil = async (e, idllega) => {
       if (this.state.miPerfil._id != idllega){ 
        if (this.state.misPerfiles.length > 1) {
            await axios.post(borrarPerfil,
                {
                    suscriptorId: this.state.suscripcion._id,
                    perfilId: idllega
                },
                {
                    headers: { 'xaccess': sessionStorage.getItem('token') }
                })
                .then(res => {
                    console.log(res.data)
                    alert("¡Perfil eliminado con exito!")
                    window.location.reload(true);
                    
                })
                .catch(err => {
                    alert(err.response)
                });
    
        } else { alert("No puedes eliminar el unico perfil que tienes") }
    } else {
        alert("No podes eliminar el perfil en el que estas actualmente")
    }
    }
    
    
    
    
    getDatos = async () => {
        await axios.get(misPerfiles,
    
            {
                headers: { 'xaccess': sessionStorage.getItem('tokenSuscriptor') }
            })
            .then(res => {
                this.setState({
                    misPerfiles: res.data
                })
            })
            .catch(err => {
                alert(err.response)
            });
    
    
    
    };
    
    
    
    componentDidMount = async () => {
        this.getDatos();
        this.verPadre();
    }
    
    verificarNombre = (e) => {
      var nombreExistente=false;
      e.preventDefault();
      this.state.misPerfiles.map ( perfil => {
        if (perfil.nombre == this.state.nombre){
            alert("Debes usar otro nombre de perfil, este ya está en uso");
            nombreExistente=true;
        } })
       
          this.onSubmit(nombreExistente)
        
      
    }
    
    
    onSubmit = async (nombreExistente) => {
      if (nombreExistente == false) {
         if  (this.state.suscripcion.suscripcion === "REGULAR" && this.state.misPerfiles.length < 2) {
            await axios.post(cargar,
                {
                    id: this.state.suscripcion._id,
                    nombre: this.state.nombre
                },
                { headers: { xaccess: this.state.token } }
            )
                .then((res) => {
                  alert("¡Perfil agregado con exito!");
                    window.location.reload(true);
    
    
                })
    
                .catch((err) => {
                    console.log(err);
                    window.location.reload(true);
    
                });
        } else if (this.state.suscripcion.suscripcion === "PREMIUM" && this.state.misPerfiles.length < 4) {
            await axios.post(cargar,
                {
                    id: this.state.suscripcion._id,
                    nombre: this.state.nombre
                },
                { headers: { xaccess: this.state.token } }
            )
                .then((res) => {
                         alert("¡Perfil agregado con exito!");
                    window.location.reload(true);
    
                })
    
                .catch((err) => {
                    console.log(err);
                    alert("¡Perfil agregado con exito!");
                    window.location.reload(true);
    
                });
        } else {
            alert("No podes agregar otro perfil, ya estas en tu maximo permitido, borrá alguno para agregar otro")
    
        }
      }
      
    };
    
    
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    
    };
    
    
    render() {
        return (
    
            <div className="cardAgregarPerfil col-md-6 offset-md-3 text-light bg-dark ">
                <h4 className="card-header">Perfiles de {this.state.suscripcion.nombre} </h4>
                <h5 className="card-header">Suscripción: {this.state.suscripcion.suscripcion} </h5>
                <span><h5 className="card-header">Sus perfiles: </h5></span>
    
                <div>
    
                    {this.state.misPerfiles.map(perfil =>
                        <div className="cardListarPerfil">
    
                            <h5> {perfil.nombre} </h5>
                            <button className="btn btn-outline-danger itemBoton float-right" onClick={() => confirmAlert({
                                customUI: ({ onClose }) => {
                                    return (
                                        <div className='custom-ui'>
                                            <h1>¿Está seguro?</h1>
                                            {' '}
                                            <p>¿Desea eliminar este perfil?</p>
                                            {' '}
                                            <button onClick={onClose}>No</button> {' '}
                                            <button
                                                onClick={(e) => { this.borrarperfil(e, perfil.id) 
                                                    onClose();
    
    
    
                                                }}
                                            >
                                                Si, deseo eliminar
                                </button> 
                                </div>
                                    );
                                }
                                         })}>Eliminar</button>
                               
                            <button onClick={(e) => { this.ingresarPerfil(e, perfil.id) }} className="btn btn-outline-danger itemBoton float-right">Ingresar</button>
    
                        </div>
    
                    )}
    
                </div>
    
                <form onSubmit={this.verificarNombre} >
    
                    <div className="form-group">
                        <input className="form-control "
                            id="nombre"
                            name="nombre"
                            onChange={this.onInputChange}
                            placeholder="Nombre del nuevo perfil "
                        >
                        </input>
                    </div>
    
    
    
                    <button type="submit" className="btn  btn-outline-danger itemBoton float-right">
                        Agregar perfil
                            </button>
    
    
                </form>
    
    
    
    
    
    
            </div>
    
    
        )
    }
    }

export default AgregarPerfil;