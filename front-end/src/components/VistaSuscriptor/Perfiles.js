import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//Constante a la cual hacemos la consulta
const suscriptores= 'http://localhost:4000/api/suscriptores/me';

export default class Perfiles extends Component {
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
            headers:{'xaccess':this.state.token}  
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
                <h1 class="card-header">Perfiles de {this.state.miSuscripcion.nombre} </h1>
                    <div class="card-body">               
    
                    </div>
                        <Link to={'/suscriptor/suscripcion/perfiles/agregar'} className='btn login_btn float-right'> Agregar Perfil</Link>
                    </div>
                   
                
            </div>


       
        

        )
    }
}