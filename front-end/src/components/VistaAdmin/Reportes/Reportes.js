import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Reportes extends Component {
    render() {
        return (
            <div >
                <br></br>
                <div class="cardReportes" >
                    <div class="card-body">
                    <Link to='reportes/libros' className="btn btn-outline-danger btn-lg btn-block   itemBoton" >Libros ordenados de mas a menos leidos </Link>
                    <br></br>
                    <Link to='reportes/usuarios' className="btn btn-outline-danger btn-lg btn-block  itemBoton" >Reportes de usuarios </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}
