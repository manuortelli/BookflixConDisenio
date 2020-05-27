import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import ListarNovedades from './Novedades/ListarNovedades';
import Carrusel from './Carrusel';
import NavegacionSuscriptor from './NavegacionSuscriptor';
import VerSuscripcion from './VerSuscripcion';

export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user: JSON.parse(sessionStorage.getItem('user')),
            token: sessionStorage.getItem('token'),
            libros: null
        };
        this.cerrarSesion= this.cerrarSesion.bind(this);

    }

 
    cerrarSesion = () =>{
        sessionStorage.removeItem('token');
       
       
    };
    async componentDidMount() {
        this.getData();
    }

    getData = async () => {
        //const {user} = this.state.user;
        //const token = this.state.token;

    }
   
    
    render() {
        return (
            this.state.token !== '' ? 

                <div>
    
                    <NavegacionSuscriptor></NavegacionSuscriptor> 
                    
                    <div class="d-flex justify-content-center">
                   
                      
                    <div className='btn btn-secondary' > PRONTO NUEVAS FUNCIONALIDADES !</div> 
                       
                    </div>
                    
                </div>
            :
            <Redirect to="/login"/>
        )
    }
}
