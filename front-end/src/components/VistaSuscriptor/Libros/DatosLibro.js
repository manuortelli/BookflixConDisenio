import React, { Component } from 'react';

const portada = 'http://localhost:4000/uploads/';


export default class DatosLibro extends Component {

    constructor(props){
        super(props);
        this.state={
          
            libro:props.libro,
         
            editorial:props.editorial,
            genero:props.genero,
            autor:props.autor,
        }
        
    }


  render(){
   
    
    return (

        <div>

                <div class="card bg-dark text-light detalleLibro   offset-md-3  ">
                    <img className="card-img "  src={portada + `${this.props.libro.portada}`} />  
                    <div className="card-img-overlay ">

                        <div className='tituloLibro'>
                        <h2 className="card-title "> {this.props.libro.titulo}</h2>
                        </div>
                        
                        
                    
                        <div className="card-body">
                                <br></br>
                                <div className='bodyDetalleLibro'>
                                <h5 className="card-subtitle mb-2 text-light">Editorial: {' '+this.props.editorial.nombre}</h5>
                                <p></p>
                                <h5 className="card-subtitle mb-2 text-light">Autor: {' '+this.props.autor.nombre+' '+this.state.autor.apellido  }</h5>
                                <p></p>
                                <h5 className="card-subtitle mb-2 text-light">Genero: {' '+this.props.genero.nombre}</h5>
        
                                
                                <br></br>
                                <br></br>
                                <br></br>
                                
                            

                                <h5 className="card-subtitle mb-2 text-light isbn ">ISBN: {' '+this.props.libro.isbn}</h5>
                                </div>  
                        
                      
                        </div>
                    </div>
                
                    </div>

                
        </div>

    )
}
}
