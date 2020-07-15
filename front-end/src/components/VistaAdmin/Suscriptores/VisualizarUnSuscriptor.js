import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


const eliminar = 'http://localhost:4000/api/suscriptores/eliminar'

export default class UnSuscriptor extends Component {
    constructor(){
        super();
        this.state={}
    }

    eliminarSuscriptor = async (e) => {
        e.preventDefault();
        await axios.post(eliminar ,
            { id: this.props.suscriptor._id },
            { headers: { 'xaccess': sessionStorage.getItem('token') } }

        ).then(res => {
            
            alert(JSON.stringify(res.data.msg));
            window.location.reload(true);
        })

        .catch(err => {
            alert(JSON.stringify(err.response.data.msg))
        } );

    }

  render(){
   
    
    return (
        
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-light">Nombre: {this.props.suscriptor.nombre}</h6>
                <h6 className="card-subtitle mb-2 text-light">Email: {this.props.suscriptor.email}</h6>
                <h6 className="card-subtitle mb-2 text-light">DNI: {this.props.suscriptor.dni}</h6>
                <h6 className="card-subtitle mb-2 text-light">Tipo de Suscripcion: {this.props.suscriptor.suscripcion}</h6>
                
                        <button className="btn btn-outline-danger itemBoton float-right" onClick={() => confirmAlert({
                                customUI: ({ onClose }) => {
                                    return (
                                        <div className='custom-ui'>
                                            <h1>¿Está seguro?</h1>
                                            {' '}
                                            <p>¿Desea eliminar este suscriptor?</p>
                                            {' '}
                                            <button onClick={onClose}>No</button> {' '}
                                            <button
                                                onClick={(e) => { this.eliminarSuscriptor(e) 
                                                    onClose();
    
    
    
                                                }}
                                            >
                                                Si, deseo eliminarlo
                                </button> 
                                </div>
                                    );
                                }
                                         })}>Eliminar suscriptor</button>
                    
                
       
                  
</div>
      



    )
}
}
