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

        <div className="container">

                <div className="cardDetalleLibro">
                <img src={portada + `${this.props.libro.portada}`} />   
                        <div className="card-body">
                                <h3 className="card-title text-light "> {this.props.libro.titulo}</h3>
                                <br></br>
                                <div className='bodyDetalleLibro'>
                                <h6 className="card-subtitle mb-2 text-light">Editorial: {' '+this.props.editorial.nombre}</h6>
                                <p></p>
                                <h6 className="card-subtitle mb-2 text-light">Autor: {' '+this.props.autor.nombre+' '+this.state.autor.apellido  }</h6>
                                <p></p>
                                <h6 className="card-subtitle mb-2 text-light">Genero: {' '+this.props.genero.nombre}</h6>
                                <p></p>
                                <h6 className="card-subtitle mb-2 text-light">ISBN: {' '+this.props.libro.isbn}</h6>
                                </div>  
                        
                      
                        </div>
                   
                    </div>

                
        </div>

    )
}
}
