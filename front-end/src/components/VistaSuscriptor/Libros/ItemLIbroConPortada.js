import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'react-confirm-alert/src/react-confirm-alert.css';
const libros = 'http://localhost:4000/api/libros/';
const portada = 'http://localhost:4000/uploads/';


class ItemLIbroConPortada extends Component {
    constructor(props) {
        super(props)
        this.state = {
         

        }
   
    }

    componentDidMount = () => {
      

    }


    render() {
         

        return (
            <div className="container-VerLibro">
                               
                               
            <div className="box" >
                <Link className="imgBx"   to={'/suscriptor/libros/' +this.props.libro._id} >
                    <img src={portada + this.props.libro.portada} />
                </Link>
                <span className="content">
                    <span >
                        <br></br>
                        <h2 className="titulo"> {this.props.libro.titulo} </h2>
                       
                        
                    </span>
                </span>
        
            </div>
            

            </div>


        )
    }
}

export default ItemLIbroConPortada;
