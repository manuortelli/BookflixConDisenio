import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VistaPerfiles extends Component{
    constructor (props){
        super(props)
    }

    render (){
        return (
            <div className="container">
                <div className="card">
                    <h5>{this.props.perfil.nombre}</h5>
                </div>
                <Link className="btn btn-success" to="/home">Ingresar</Link>
            </div>

        )
    }

}

export default VistaPerfiles;