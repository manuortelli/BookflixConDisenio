import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class ItemListTrailerAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trailer:props.trailer,
        
        }
        

    }


    render() {
      

        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">


                        <h5 className="card-title "> {this.props.trailer.titulo} </h5>


                        <Link className='btn btn-outline-success itemBoton' to={'/suscriptor/trailers/detalle/' + this.props.trailer._id}  >
                            Ver detalle
                        </Link>
                       
                        
                        
                        
                       
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemListTrailerAdmin;