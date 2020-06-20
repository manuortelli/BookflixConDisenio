import React, { Component } from 'react';
import ItemListLibro from './ItemListLibro'
import axios from 'axios';
import LeerLibro from './LeerLibro'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const libros= 'http://localhost:4000/api/libros/';
export default class ListarLibros extends Component {
    constructor(props){
        super(props);
        this.state={
         
        }

    }
 

    render() {
       
         
        
            return (
                    <div>
                   

                    <div className="carrusel">
                   
                       
                             {this.props.capitulos.map(capi => 
                            <div >
                            <div class="card col-md-6 offset-md-3 text-light bg-dark " >
                                <div class="card-body">
                                <h5 className="card-title ">Capitulo { capi.n} </h5>
                                    <Link className='btn btn-outline-success itemBoton' to={'/suscriptor/libros/leerCapitulo/' +capi.archivo}  >
                                        Leer Capitulo
                                    </Link>
                                </div>
                            </div>
                            </div>  
                              
                          
                            )} 
                    
                    </div>
                    
                </div>
            )
        
        
    }
}
