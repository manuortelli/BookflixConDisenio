
import React, { Component } from 'react';
import axios from 'axios';


const getNovedades = 'http://localhost:4000/api/novedades';
const portada = 'http://localhost:4000/uploads/';

export default class ListarVertical extends Component {
    constructor() {
        super();
        this.state = {
            token: sessionStorage.getItem('token'),
            novedades: []
        }

    }

    setNovedades(res) {
        this.setState({
            novedades: res
        });
    }

    getData = async () => {
        await axios.get(getNovedades, {
            headers: { 'xaccess': this.state.token }
        })
            .then(res => {
                this.setNovedades(res.data)
            })
            .catch(err => {
                
                alert(err)
            });

    }

    

async componentDidMount(){

    this.getData();
    
}



render() {
    return (
    <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                <h5 class="card-title">Novedades: </h5>
                {this.state.novedades.map(nov =>

                    <div class="card-body" key={nov.id}>

                        <img alt='' width="300px" height="auto" src={portada + `${nov.portada}`} />
                        <h5 class="card-title">Titulo: {nov.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Descripcion: {nov.descripcion}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">Fecha de publicacion: {nov.publicacion}</h6>
                     
                    </div>
                )}
            </div>

    )
}}