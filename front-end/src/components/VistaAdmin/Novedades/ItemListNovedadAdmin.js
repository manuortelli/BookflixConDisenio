import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const eliminar = 'http://localhost:4000/api/novedades/eliminar'

class ItemNovedadAdmin extends Component {
    constructor (props){
        super(props)


    }
    eliminarNovedad = async () => {
        console.log(this.props.novedad._id );
        await axios.post(eliminar ,
            { id: this.props.novedad._id },
            { headers: { 'xaccess':sessionStorage.getItem('token') } }

        ).then(res => {
            
            alert(JSON.stringify(res.data));
        })

        .catch(err => {
            alert(JSON.stringify(err.data))
        } );
    }
    
    render() {

        return (
            <div>
                <div class="card-body" > </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">

                    <h5 className="card-title "> {this.props.novedad.titulo} </h5>
                    
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.novedad.descripcion}</h6>
                    <div>

                    <Link to={'/novedad/detalle/'+this.props.novedad._id} className="btn btn-success " > 
                        Ver Detalle 
                    </Link> {' '} {' '}

                    <button className="btn btn-danger" onClick={() => confirmAlert({
                        customUI: ({ onClose }) => {
                            return (
                                <div className='custom-ui'>
                                    <h1>¿Está seguro?</h1> {' '}
                                    <p>¿Desea borrar esta novedad?</p>
                                    <button onClick={onClose}>No</button> {' '}
                                <button  
                                        onClick={() => {
                                        this.eliminarNovedad();
                                        onClose();
                                }} >
                                    Si, deseo borrar novedad
                    </button>
                    </div>);} })}> Eliminar</button> {''}

                    <Link to={'/novedades/modificar/'+this.props.novedad._id } className='btn btn-success'> Modificar</Link>
                   
                    </div>
                    </div>
            </div>
            </div>
        )
    }
}

export default  ItemNovedadAdmin;
