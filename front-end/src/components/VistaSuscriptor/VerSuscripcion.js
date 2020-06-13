import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//Constante a la cual hacemos la consulta
const suscriptores= 'http://localhost:4000/api/suscriptores/me';

export default class MiSuscripcion extends Component {
    constructor(){
        super();
        this.state={
            token: sessionStorage.getItem('token'),
            miSuscripcion:[]
            
        }

    }
    

    setSusripcion(res){
        console.log(res);
        this.setState({
            miSuscripcion:res
        });
    }

    getData = async () =>{
        await axios.get(suscriptores,{
            headers:{'xaccess':sessionStorage.getItem('token')}  
        })
        .then(res =>{
            this.setSusripcion(res.data)
        })
        .catch(err =>{
            alert(err.response)});

    }
    async componentDidMount(){

        this.getData();
    }

    render() {
        return (
            <div className="container">
            <div class="cardVS col-md-6 offset-md-3 text-light bg-dark" >
                <h1 class="card-header"> {this.state.miSuscripcion.nombre} </h1>
                    <div class="card-body">                        
                        <h4 class="card-subtitle mb-2 ">EMAIL: {this.state.miSuscripcion.email}</h4>
                        <h4 class="card-subtitle mb-2 ">SUSCRIPCION: {this.state.miSuscripcion.suscripcion}</h4>
                        <h4 class="card-subtitle mb-2 ">DNI: {this.state.miSuscripcion.dni}</h4>
                        
                        
                        <div>
                        <Link to={'/suscriptor/suscripcion/modificar'} className='btn login_btn float-right'> Modificar</Link>
                        <Link to={'/suscriptor/suscripcion/perfiles'} className='btn login_btn float-left'> Perfiles</Link>
                        
                        </div>
                    </div>
                   
                
            </div>


        </div>
        

        )
    }
}
