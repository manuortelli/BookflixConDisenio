import React, { Component } from 'react';
import axios from 'axios';


const eliminar = 'http://localhost:4000/api/suscriptores/eliminar'

export default class UnSuscriptor extends Component {

  render(){
   
    const eliminarSuscriptor = async () => {

        await axios.post(eliminar ,
            { id: this.props.suscriptor._id },
            { headers: { 'xaccess': sessionStorage.getItem('token') } }

        ).then(res => {
            
            alert(JSON.stringify(res.data));
        })

        .catch(err => {
            alert(JSON.stringify(err.data))
        } );

    }
    return (
        
            <div className="card-body">
                
                  
              
                
                <h6 className="card-subtitle mb-2 text-light">Nombre: {this.props.suscriptor.nombre}</h6>
                <h6 className="card-subtitle mb-2 text-light">Email: {this.props.suscriptor.email}</h6>
                <h6 className="card-subtitle mb-2 text-light">DNI: {this.props.suscriptor.dni}</h6>
                <h6 className="card-subtitle mb-2 text-light">Tipo de Suscripcion: {this.props.suscriptor.suscripcion}</h6>
                <form>
                        <button type="button" className="btn btn-success  float-right" onClick={() => {eliminarSuscriptor()}}> Eliminar Suscriptor </button>
                    </form>
                
       
                  
</div>
      



    )
}
}
