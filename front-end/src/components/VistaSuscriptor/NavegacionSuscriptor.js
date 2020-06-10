import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import axios from 'axios';

const suscriptor= 'http://localhost:4000/api/suscriptores/me';


class NavegacionSuscriptor extends Component {
  constructor(){
    super();
    this.state={
        user:'',
        token: sessionStorage.getItem('token'),
        nombre: '',
    };
    
   };


async componentDidMount(){
    
    await axios.get(suscriptor,{ headers:{'xaccess':this.state.token} })
      .then(res =>{
        this.setState({ nombre: res.data.nombre });
        console.log(res)
       
      })
        
  }
   cerrarSesion=()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  
   }


    render (){
        return (
          
          this.state.token == '' ?

          <Redirect to='/login'/>

          : <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
               <Link className="nav-link" to="/home">
               <img width="185px"  height="50px" src={'http://localhost:4000/uploads/bookflix.png'}/>
               </Link>
              
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto" >
                  
                <li className="nav-item ">
                  <Link className="nav-link" to="/homesuscriptor">Home</Link>
                  </li>

                  <li className="nav-item ">
                  <Link className="nav-link" to="/suscriptor/libros">Libros</Link>
                  </li>

                  <li className="nav-item">
                  <Link className="nav-link" to="/suscriptor/novedades">Novedades </Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/suscriptor/suscripcion">{this.state.nombre}</Link>
                  </li>
                
                  <li>
                      <Link  className="nav-link" to='/login'  type= 'submit' onClick= {this.cerrarSesion}> Cerrar Sesión </Link>
                  </li>
                  
                    
                </ul>
              </div>
          
      
          </nav>
        );
    }
}

export default NavegacionSuscriptor; 

