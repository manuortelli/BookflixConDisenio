import React, { Component } from 'react';
import axios from 'axios';
import DatosLibro from './DatosLibro';
import { Link } from 'react-router-dom';
import ListarCapitulos from './ListarCapitulos';
import { Button } from 'react-bootstrap';

const editoriales= 'http://localhost:4000/api/editoriales/'
const generos ='http://localhost:4000/api/generos/'
const autores = 'http://localhost:4000/api/autores/'

const portada = 'http://localhost:4000/uploads/';
const me = 'http://localhost:4000/api/libros/me';
const  capi= 'http://localhost:4000/api/libros/misCapitulos';

export default class DetalleLibrosAdmin extends Component {

    constructor(props){
        super(props);
        this.state={
            id: this.props.match.params.id,
            token: sessionStorage.getItem('token'),
            libro:'',
            capitulos:'',
            editorial:'',
            genero:'',
            autor:'',
            bottonCap: false,
            mostrarCapitulos:true,
        }
        this.fechaExpiracion = this.fechaExpiracion.bind(this);
        this.mostrarCapitulos=this.mostrarCapitulos.bind(this);
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
                libro:res.data,
                capitulos:res.data.capitulos
            });
           this.getNombres();
           this.HayCapitulos();

        })
        .catch(err =>{console.log(err)});

       
    }
    
    HayCapitulos = () => {
        if (this.state.capitulos != "") {
            this.state.bottonCap = true;
        }
    }
    
    componentDidMount(){
     this.getDatos();
     this.HayCapitulos();
 
    }

    

    fechaExpiracion= ()=>{
        if(!this.props.libro.fechaExpiracion){
            return (<h6 className="card-subtitle mb-2 text-muted">Fecha de expiración: {this.state.libro.expiracion}</h6>)
        }else{
            return (<div/>)
        }
    }
    mostrarCapitulos(){
        this.setState({
            mostrarCapitulos:! this.state.mostrarCapitulos
        })
    }
  render(){


    const show = this.state.bottonCap;
    const capseleccionado = this.state.capseleccionado-1;
    


    return (

        <div>
            <DatosLibro libro={this.state.libro} autor={this.state.autor} genero={this.state.genero} editorial={this.state.editorial}></DatosLibro>
            <br></br>
        {show ?( 
        <React.Fragment>
        
        <div class="card col-md-6 offset-md-3" >
           
        <button className='btn btn-outline-success' onClick={this.mostrarCapitulos}> Ver Capitulos</button>
      
        </div> 
            {this.state.mostrarCapitulos ? 
             <React.Fragment> </React.Fragment>
            :
            <ListarCapitulos capitulos={this.state.capitulos}></ListarCapitulos>
            }
            
         </React.Fragment>)
        : ( <React.Fragment>
            <div>
                            <div class="card col-md-6 offset-md-3 text-light bg-dark" >
                                <div class="card-body ">
                                <Link className='btn btn-outline-success itemBoton' to={'/suscriptor/libros/leer/' + this.state.libro.archivo}  > Leer Libro </Link>
                                </div>
                            </div>
            </div>  
        </React.Fragment>)
        }
      
       
        </div>
        


    )
 

 }



}

