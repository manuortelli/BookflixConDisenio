import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//Constante a la cual hacemos la consulta
const librosApi= 'http://localhost:4000/api/libros/me';
const miperfilApi = 'http://localhost:4000/api/perfiles/me';


export default class MiSuscripcion extends Component {
    constructor(){
        super();
        this.state={
            token: sessionStorage.getItem('token'),
            miPerfil:[],
            //miPerfil: sessionStorage.getItem('perfil'),
            
        }

    }
       

    setPerfiles(res){
        this.setState({
            miPerfil:res
        });
        
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

    async componentDidMount(){

        this.getDataPerfil();
       
    }

    render() {
        return (
            <div className="container">
            <div class="cardVS col-md-6 offset-md-3 text-light bg-dark" >
                <h2 class="card-header"> Historial de  {this.state.miPerfil.nombre} </h2>
                    <div class="card-body">                        
                        <div>
                            
                        
                        </div>
                    </div>
                   
                
            </div>


        </div>
        

        )
    }
}