import React, { Component } from 'react';
import axios from 'axios';
const portada = 'http://localhost:4000/uploads/';
const me='http://localhost:4000/api/novedades/me';


class VisualizarNovedad extends Component {
    constructor (props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            token: sessionStorage.getItem('token'),
            novedad:''
        }

    }
    getDatos= async ()=>{
        await axios.post(me,
        { id: this.state.id },
        { headers:{'xaccess': this.state.token}}
    )
    .then(res =>{
        console.log(res.data);
        this.setState({
            novedad:res.data
        })
    })
    .catch(err =>{console.log(err)});
    }

    async componentDidMount(){
        this.getDatos()
    }


    render() {

        return (
            <div class="card col-md-6 offset-md-3 text-light " >
                <div class="card-body button"  key={this.state.novedad._id}>
                
               
                     <div class="card-body">
                        <img alt='' width="550px" height="400px" src={portada + `${this.state.novedad.portada}`} />
                        <h5 class="card-header">{this.state.novedad.titulo}</h5>
                        <h6 class="card-subtitle mb-2 text-light"> {this.state.novedad.descripcion}</h6>
                        <h6 class="card-subtitle mb-2 text-light">Publicada: {this.state.novedad.publicacion}</h6>
                     </div>
                </div>
                
            </div>
        )
    }
}

export default  VisualizarNovedad ;
