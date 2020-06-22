import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//Constante a la cual hacemos la consulta
const suscriptores= 'http://localhost:4000/api/suscriptores/me';
const miperfilApi = 'http://localhost:4000/api/perfiles/me';


export default class MiSuscripcion extends Component {
    constructor(){
        super();
        this.state={
            token: sessionStorage.getItem('token'),
            miSuscripcion:[],
            miPerfil:[],
            //miPerfil: sessionStorage.getItem('perfil'),
            
        }

    }
    

    setSusripcion(res){
        this.setState({
            miSuscripcion:res
        });
        console.log(this.state.miSuscripcion);
    }

    setPerfiles(res){
        this.setState({
            miPerfil:res
        });
        console.log(this.state.miPerfil);
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
    async componentDidMount(){

        this.getDataPerfil();
        this.getDataSuscriptor();
        

    }

    render() {
        return (
            <div className="container">
            <div class="cardVS col-md-6 offset-md-3 text-light bg-dark" >
                <h1 class="card-header"> Suscriptor:  {this.state.miSuscripcion.nombre} </h1>
                <h2 class="card-header"> Perfil Actual:  {this.state.miPerfil.nombre} </h2>
                    <div class="card-body">                        
                        <h4 class="card-subtitle mb-2 ">EMAIL: {this.state.miSuscripcion.email}</h4>
                        <h4 class="card-subtitle mb-2 ">SUSCRIPCION: {this.state.miSuscripcion.suscripcion}</h4>
                        <h4 class="card-subtitle mb-2 ">DNI: {this.state.miSuscripcion.dni}</h4>
                        <div>
                        <Link to={'/suscriptor/suscripcion/modificar'} className='btn login_btn float-right'> Modificar</Link>
                        <Link to={'/suscriptor/perfiles/historial'} className='btn login_btn float-left'> Historial</Link>
                        
                        </div>
                    </div>
                   
                
            </div>


        </div>
        

        )
    }
}
