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
     

       
          











        <div class="card bg-dark text-light detalleLibro   offset-md-3  ">
            <img className="card-img "  src={portada + `${this.state.libro.portada}`} />  
            <div className="card-img-overlay ">

                <div className='tituloLibro'>
                 <h2 className="card-title "> {this.state.libro.titulo}</h2>
                </div>
                
                
               
                <div className="card-body">
                        <br></br>
                        <div className='bodyDetalleLibro'>
                        <h5 className="card-subtitle mb-2 text-light">Editorial: {' '+this.state.editorial.nombre}</h5>
                        <p></p>
                        <h5 className="card-subtitle mb-2 text-light">Autor: {' '+this.state.autor.nombre+' '+this.state.autor.apellido  }</h5>
                        <p></p>
                        <h5 className="card-subtitle mb-2 text-light">Genero: {' '+this.state.genero.nombre}</h5>
   
                        
                        <br></br>
                        <br></br>
                        <br></br>
                        
                       

                        <h5 className="card-subtitle mb-2 text-light isbn ">ISBN: {' '+this.state.libro.isbn}</h5>
                        </div>  
                
                {this.fechaExpiracion}
                
                </div>
            </div>
            </div>
                  

           
           


    )
}
}
