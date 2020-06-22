import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class VerificarSesion extends Component {
    render() {
        if(sessionStorage.getItem('token') === null)
            return (  <Redirect to ='/login' ></Redirect> )
        else 
            return ( <div> </div> )
        
    }
}
export default VerificarSesion;
