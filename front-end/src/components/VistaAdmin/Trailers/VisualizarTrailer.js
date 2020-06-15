import React, { Component } from 'react';
import axios from 'axios';



const portada = 'http://localhost:4000/uploads/';
const me='http://localhost:4000/api/trailers/me';


class VisualizarTrailer extends Component {
    /*constructor (props){
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

*/
    render() {

        return (
            <div class="card col-md-6 offset-md-3 text-light " >
                <div class="card-body button" >
                
               
                     <div class="card-body">
                     <h5 class="card-header">Titulo de Trailer</h5>
                        
                        
                        <video width="500" height="300" controls="controls" autoPlay="false" src="http://localhost:4000/uploads/videoprueba.mp4"/>
                        

                     </div>
                </div>
                
            </div>
        )
    }
}

export default  VisualizarTrailer ;