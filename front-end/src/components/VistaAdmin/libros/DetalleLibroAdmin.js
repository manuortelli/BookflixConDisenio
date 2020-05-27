import React, { Component } from 'react';
import axios from 'axios';

const editoriales= 'http://localhost:4000/api/editoriales/'
const generos ='http://localhost:4000/api/generos/'
const autores = 'http://localhost:4000/api/autores/'

const portada = 'http://localhost:4000/uploads/';
const me = 'http://localhost:4000/api/libros/me';

export default class DetalleLibrosAdmin extends Component {

    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            token: sessionStorage.getItem('token'),
            libro:'',

            editorial:'',
            genero:'',
            autor:'',
        }
        this.fechaExpiracion = this.fechaExpiracion.bind(this)
    }

    getNombres= async ()=>{
          //traigo el autor actual
          await axios.post(autores+'me',
          { id: this.state.libro.autor },
          { headers:{'xaccess': this.state.token}}
      )
      .then(res =>{
          console.log(res.data);
          this.setState({
              autor:res.data
          })
      })
      .catch(err =>{console.log(err)});

      //traigo el genero actual
      await axios.post(generos+'me',
          { id:  this.state.libro.genero },
          { headers:{'xaccess': this.state.token}}
      )
      .then(res =>{
          console.log(res.data);
          this.setState({
              genero:res.data
          })
      })
      .catch(err =>{console.log(err)});

       //traigo la editorial actual
      await axios.post(editoriales+'me',
          { id: this.state.libro.editorial },
          { headers:{'xaccess': this.state.token}}
      )
      .then(res =>{
          console.log(res.data);
          this.setState({
              editorial:res.data
          })
      })
      .catch(err =>{console.log(err)});
    }

    getDatos=async()=>{
        await axios.post(me,
            { id: this.state.id },
            { headers:{'xaccess': this.state.token}}
        ).then(res =>{
            console.log(res.data);
            this.setState({
                libro:res.data
            });
           this.getNombres();

        })
        .catch(err =>{console.log(err)});

    }
    
    componentDidMount(){
     this.getDatos();
    }

    

    fechaExpiracion= ()=>{
        if(!this.props.libro.fechaExpiracion){
            return (<h6 className="card-subtitle mb-2 text-muted">Fecha de expiración: {this.state.libro.expiracion}</h6>)
        }else{
            return (<div/>)
        }
    }
  render(){
   
    


  
    
    return (
        <div class="card col-md-6 offset-md-3 text-light bg-dark" >
            <div className="card-body">
                <h4 className="card-title card-group"> {this.state.libro.titulo}</h4>
                <img width="580px"height="auto" src={portada + `${this.state.libro.portada}`} />
                <div></div>
                <h6 className="card-subtitle mb-2 text-muted">ISBN:{this.state.libro.isbn}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Autor: {this.state.autor.nombre}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Genero: {this.state.genero.nombre}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Editorial: {this.state.editorial.nombre}</h6>
               
                <h6 className="card-subtitle mb-2 text-muted">Publicado: {this.state.libro.lanzamiento}</h6>
               
                {this.fechaExpiracion}
                
                
            </div>
                  
            </div>
      



    )
}
}
