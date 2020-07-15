import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ItemPerfil from "./ItemPerfil";
import { Link } from "react-router-dom";
import HomeSuscriptor from "./VistaSuscriptor/HomeSuscriptor";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//Poner constante a la cual le hacemos la consulta de nuestros pefiles como suscriptor
const suscriptores= 'http://localhost:4000/api/suscriptores/me';
const misPerfiles = "http://localhost:4000/api/suscriptores/loginPerfiles";
const cargar = "http://localhost:4000/api/suscriptores/agregarPerfil";
const borrarPerfil = "http://localhost:4000/api/perfiles/eliminar";
const loginPerfilApi = "http://localhost:4000/api/suscriptores/loginPerfil";


class ListarPerfiles extends Component {
  constructor() {
    super()
    this.state = {
        token: sessionStorage.getItem("token"),
        suscripcion: JSON.parse(sessionStorage.getItem("user")),
        miPerfil: JSON.parse(sessionStorage.getItem("perfilUser")),
        nombre: '',
        misPerfiles: [],
        nombreUsado:false,
        miSuscripcion: [],
    }

    this.onInputChange = this.onInputChange.bind(this);



}

getDataSuscriptor = async () =>{
    await axios.get(suscriptores,{
        headers:{'xaccess':sessionStorage.getItem('token')}  
    })
    .then(res =>{
        console.log("Aqui chamaco",res)
        this.setState({
            miSuscripcion:res
        });
    })
    .catch(err => {
        alert(err.response)});
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

borrarperfil = async (e, idllega) => {
    if (this.state.misPerfiles.length > 1) {
        await axios.post(borrarPerfil,
            {
                suscriptorId: this.state.suscripcion.user._id,
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
    console.log("Se monta")
    console.log(this.state.suscripcion)
    this.getDatos();
    this.getDataSuscriptor();
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
     if  (this.state.suscripcion.user.suscripcion === "REGULAR" && this.state.misPerfiles.length < 2) {
        await axios.post(cargar,
            {
                id: this.state.suscripcion.user._id,
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
    } else if (this.state.suscripcion.user.suscripcion === "PREMIUM" && this.state.misPerfiles.length < 4) {
        await axios.post(cargar,
            {
                id: this.state.suscripcion.user._id,
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

           





        </div>


    )
}
}

export default ListarPerfiles;
