import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


//Constante a la cual hacemos la consulta
const suscriptores= 'http://localhost:4000/api/suscriptores/me';
const miperfilApi = 'http://localhost:4000/api/perfiles/me';
const historialLibros = 'http://localhost:4000/api/perfiles/historialLibro';
const eliminar = 'http://localhost:4000/api/suscriptores/eliminar'


export default class MiSuscripcion extends Component {
    constructor(){
        super();
        this.state={
            token: sessionStorage.getItem('token'),
            miSuscripcion:JSON.parse(sessionStorage.getItem("user")),
            miPerfil:[],
            perfil: JSON.parse(sessionStorage.getItem("perfilUser"))
            //miPerfil: sessionStorage.getItem('perfil'),
            
        }

    }
    

    setSusripcion(res){
        this.setState({
            miSuscripcion:res
        });
      
    }

    setPerfiles(res){
        this.setState({
            miPerfil:res
        });
    }


    eliminarSuscriptor = async () => {

       await axios.post(eliminar ,
            { id: this.state.miSuscripcion._id },
            { headers: { 'xaccess': sessionStorage.getItem('token') } }

        ).then(res => {
            
            alert(JSON.stringify(res.data.msg));
            return (window.location = '/login')	
        })

        .catch(err => {
            alert(JSON.stringify(err.data.msg))
        } );

    }

    getDataPerfil = async () =>{
        await axios.get(miperfilApi,{
            headers:{'xaccess':sessionStorage.getItem('token')}  
        })
        .then(res =>{
            this.setPerfiles(res.data);
        })
        .catch(err =>{
            alert(err.response)});

    }


    getDataSuscriptor = async () =>{
        await axios.get(suscriptores,{
            headers:{'xaccess':sessionStorage.getItem('token')}  
        })
        .then(res =>{
            this.setSusripcion(res.data);
        })
        .catch(err => {
            alert(err.response)});
    }

    historial = async () => {
        await axios.post(historialLibros,
            {id : this.state.perfil._id},
            {
            headers:{'xaccess':sessionStorage.getItem('token')}  
        })
        .then(res =>{
            console.log("Historial",res.data)
        })
        .catch(err => {
            alert(err.response)});
    }
    
    async componentDidMount(){

        this.getDataPerfil();
        this.getDataSuscriptor();
        this.historial();
        

    }

    render() {
        return (
            <div className="container">
            <div class="cardVS col-md-6 offset-md-3 text-light bg-dark" >
                <h2 class="card-header bold"> Suscriptor:  {this.state.miSuscripcion.nombre} </h2>
                <h4 class="card-header"> Perfil Actual:  {this.state.miPerfil.nombre} </h4>
                    <div class="card-body">                        
                        <h4 class="card-subtitle mb-2 ">E-mail: {this.state.miSuscripcion.email}</h4>
                        <br></br>
                        <h4 class="card-subtitle mb-2">Suscripción: {this.state.miSuscripcion.suscripcion}</h4>
                        <br></br>
                        <h4 class="card-subtitle mb-2">D.N.I: {this.state.miSuscripcion.dni}</h4>
                        <div>
                        <br></br>
                        <Link to={'/suscriptor/suscripcion/modificar'} className='btn btn-outline-danger itemBoton float-right'> Modificar</Link>
                

                        <button className="btn btn-outline-danger itemBoton float-right" onClick={() => confirmAlert({
                                customUI: ({ onClose }) => {
                                    return (
                                        <div className='custom-ui'>
                                            <h1>¿Está seguro?</h1>
                                            {' '}
                                            <p>¿Desea eliminar su suscripción? Todos sus datos serán eliminado excepto las reseñas</p>
                                            {' '}
                                            <button onClick={onClose}>No</button> {' '}
                                            <button
                                                onClick={(e) => { this.eliminarSuscriptor(e) 
                                                    onClose();
    
    
    
                                                }}
                                            >
                                                Si, deseo eliminarla
                                </button> 
                                </div>
                                    );
                                }
                                         })}>Eliminar mi suscripción</button>
                        
                        </div>
                    </div>
                   
                
            </div>


        </div>
        

        )
    }
}
