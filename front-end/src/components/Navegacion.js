import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navegacion.css';


class App extends Component {
    render (){
        return (
          
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <img width="185px" height="50px" src={'http://localhost:4000/uploads/bookflix.png'}/> 
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto" >
                  <li className="nav-item ">
                  <Link className="nav-link" to="/login">Log In</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/singup">Sign Up </Link>
                    
                  </li>
                  
                </ul>
              </div>
          </nav>
        );
    }
}

export default App; 

