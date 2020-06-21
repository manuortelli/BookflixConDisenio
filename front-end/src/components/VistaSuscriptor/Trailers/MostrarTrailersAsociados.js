import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MostrarTrailersAsociados extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            this.props.trailer !=  null?
            <div class="card-body" >
                
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">
                       <h3 className="card-title "> trailer </h3>
                       <h5 className="card-title "> {this.props.trailer.titulo} </h5>

                        <Link className='btn btn-outline-success itemBoton' to={'/suscriptor/trailers/detalle/' + this.props.trailer._id}  >
                            Ver detalle
                        </Link>
              
                     </div>
                </div>
            </div>
            :
            <div>
                
            </div>
        )
    }
}
