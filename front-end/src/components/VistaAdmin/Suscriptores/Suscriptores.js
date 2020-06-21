import React, { Component } from 'react';
import axios from 'axios';
import VisualizarUnSuscriptor from './VisualizarUnSuscriptor';
import NavegacionAdmin from '../NavegacionAdmin'

const getSuscriptores = 'http://localhost:4000/api/suscriptores';


export default class ListarVertical extends Component {

    constructor() {
        super();
        this.state = {
            token: sessionStorage.getItem('token'),
            suscriptores: []
        }
       

    }


async componentDidMount(){
    await axios.get(getSuscriptores, {
        headers: { 'xaccess': this.state.token }
    })
        .then(res => {
            this.setState({
                suscriptores: res.data
            });
        })
        .catch(err => {
            console.log(err)
        });
}


render() {
    return (
        <div>
            <NavegacionAdmin/>
            <div className="card col-md-6 offset-md-3 text-light bg-dark" >

            <div className="card-header">
				            <h5>Suscriptores: </h5>
                            </div>
                    {this.state.suscriptores.map(suscriptor => 
                        <VisualizarUnSuscriptor key={suscriptor._id} suscriptor={suscriptor} token={this.state.token}/> )}
            </div>
        </div>
    )
}
}