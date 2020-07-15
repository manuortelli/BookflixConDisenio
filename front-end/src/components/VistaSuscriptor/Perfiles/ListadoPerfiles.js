import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import axios from 'axios';
import homesuscriptor from '../HomeSuscriptor';


const loginPerfilApi = "http://localhost:4000/api/suscriptores/loginPerfil";
const misPerfiles = "http://localhost:4000/api/suscriptores/loginPerfiles";
const borrarPerfil = "http://localhost:4000/api/perfiles/eliminar";

class ListadoPerfiles extends Component {
    constructor() {
        super();
        this.state = {
            token: sessionStorage.getItem("token"),
            suscripcion: JSON.parse(sessionStorage.getItem("user")),
            Perfil: JSON.parse(sessionStorage.getItem("perfilUser")),
            misPerfiles: []
        }
    }


    ingresarPerfil = async (e, idllega) => {
        console.log("id que llega " ,idllega)
        await axios
      .post(
        loginPerfilApi,
         { id: idllega } ,
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
       if (this.state.misPerfiles.length>1){
        await axios.post(borrarPerfil, 
            {suscriptorId: this.state.suscripcion.user._id,
            perfilId: idllega },
            {headers: { 'xaccess': sessionStorage.getItem('token') }
        })
            .then(res => {
                console.log(res.data)
                window.location.reload(true);
            })
            .catch(err => {
                alert(err.response)
            });

        }  else {alert("No puedes eliminar el unico perfil que tienes")} 
    }




    getPerfiles = async () => {
        await axios.get(misPerfiles, 
         
            {
            headers: { 'xaccess': sessionStorage.getItem('tokenSuscriptor') }
        })
            .then(res => {
                this.setState({
                    misPerfiles:res.data
                })
            })
            .catch(err => {
                alert(err.response)
            });


    }


    componentDidMount = async () => {
        this.getPerfiles();
    }




    render() {
       
        return (
            <div>

                {this.state.misPerfiles.map(perfil =>
                    <div className="cardListarPerfil">
                       
                        <h5> {perfil.nombre} </h5> <button onClick={(e)=> {this.borrarperfil(e, perfil.id)}} className="btn btn-outline-danger itemBoton float-right">Eliminar</button>
                        <button onClick={(e)=> {this.ingresarPerfil(e, perfil.id)}} className="btn btn-outline-danger itemBoton float-right">Ingresar</button>
                        
                    </div>

                )}

            </div>
        )

    }
}

export default ListadoPerfiles;