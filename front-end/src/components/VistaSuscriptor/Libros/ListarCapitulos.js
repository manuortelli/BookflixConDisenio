import React, { Component } from 'react';
import ItemListLibro from './ItemListLibro'
import axios from 'axios';
import LeerLibro from './LeerLibro'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button } from 'react-bootstrap';

const perfiles ='http://localhost:4000/api/perfiles/';
const libros= 'http://localhost:4000/api/libros/';
export default class ListarLibros extends Component {
    constructor(props){
        super(props);
        this.state={
            token: sessionStorage.getItem('token'),
            idPerfil:'',
        }

    }

    
    leerCapitulo = async (id)=>{

      
        await axios.post(perfiles+'visitadoCapitulo',
          { id:sessionStorage.getItem('perfilID'),
            capituloId:id
          },
          { headers:{'xaccess': this.state.token}}
      )
      .then(res =>{
          console.log(res.data);
        
      })
      .catch(err =>{console.log(err.response.data.msg)});

    }
       
 
mostrarFecha=()=>{
    
}
    render() {
          return (
                    <div>

                    {this.props.capitulos ==[]?
                   
                     (<div class="card col-md-6 offset-md-3 text-light bg-dark " >
                         <div class="card-body">
                             <h1> No hay capitulos Disponibles</h1>
                         </div>
                     </div>):(
                     <div></div>)
                
                }    
                   
                    <div className="carrusel">
                             {this.props.capitulos.map(capi =>                                    
                            
                            <div class="card col-md-5 offset-md-3 text-light bg-dark " >
                                <div class="card-body">
                                <h5 className="card-title ">Capitulo { capi.n} </h5>
                                    <Link onClick={this.leerCapitulo} className='btn btn-outline-success itemBoton' to={'/suscriptor/libros/leerCapitulo/' + capi.archivo}  >
                                        Leer Capitulo
                                    </Link>
                                    <Button  onClick={this.leerCapitulo(capi._id)} > Marcar como leido</Button>
                                </div>
                            </div>
                            
                              
                          
                            )} 
                    
                    </div>
                    
                </div>
            )
    }    
        
  
}
