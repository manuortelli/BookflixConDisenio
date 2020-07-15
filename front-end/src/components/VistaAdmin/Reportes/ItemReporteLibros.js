import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const editoriales = "http://localhost:4000/api/editoriales/";
const generos = "http://localhost:4000/api/generos/";
const autores = "http://localhost:4000/api/autores/";



class ItemReporteLibros extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: sessionStorage.getItem("token"),
            reporte:props.reporte,
            autor:'',
            genero:'',
            editorial:'',
        }
        

    }
    getNombres = async () => {
        //traigo el autor actual
        await axios
          .post(
            autores + "me",
            { id: this.props.reporte.libro.autor },
            { headers: { xaccess: this.state.token } }
          )
          .then((res) => {
            console.log(res.data);
            this.setState({
              autor: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
    
        //traigo el genero actual
        await axios
          .post(
            generos + "me",
            { id: this.props.reporte.libro.genero },
            { headers: { xaccess: this.state.token } }
          )
          .then((res) => {
            console.log(res.data);
            this.setState({
              genero: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
    
        //traigo la editorial actual
        await axios
          .post(
            editoriales + "me",
            { id: this.props.reporte.libro.editorial },
            { headers: { xaccess: this.state.token } }
          )
          .then((res) => {
            this.setState({
              editorial: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };
   

    componentDidMount = async () => {
        this.getNombres();
        
    }


    

    render() {
      

        return (
            <div>
                <div class="card-body" >
                </div>
                <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                    <div class="card-body">
                             {/*cantEnCurso: 0
    cantTerminados: 0
                   cantTotal:*/} 
                        <h5 className="card-title "> {this.props.reporte.libro.titulo} </h5>
                        <h6 className="card-title "> Autor :{' '+ this.state.autor.nombre} </h6>   
                        <h6 className="card-title "> Genero :{' '+ this.state.genero.nombre} </h6> 
                        <h6 className="card-title "> Editorial :{' '+ this.state.editorial.nombre} </h6> 
                        <h6 className="card-title "> Lectores en curso: {' '+this.props.reporte.cantEnCurso} </h6>    
                        <h6 className="card-title "> Lectores que lo terminaron de leer:{ ' '+this.props.reporte.cantTerminados} </h6>       
                        <h6 className="card-title "> Total de Lectores:{' '+ this.props.reporte.cantTotal} </h6>      
                                                   
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemReporteLibros;