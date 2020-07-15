import React, { Component } from 'react'

class ItemListUsuario extends Component {

    
   
    mostrarFecha = (f) => {
        var fecha = new Date(f);
        var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        return (fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear()+ " a las " +fecha.getHours()+":" +fecha.getMinutes()+ " hs " );
        //return fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();
      }
    render() {
        return (
            <div>
                 <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">
              
                    <h5 className="card-title "> {'Nombre: '+this.props.usuario.nombre} </h5>
                    <h5 className="card-title "> {'Dni: '+this.props.usuario.dni} </h5>
         
                    <h5 className="card-title"> {'Email: '+this.props.usuario.email} </h5>

                    <h5 className="card-title "> {'Fecha de creacion: ' +  this.mostrarFecha(this.props.usuario.createdAt)} </h5>
                    
                    
                   
                </div>
                </div>
                
            </div>
        )
    }
}
export default ItemListUsuario;
