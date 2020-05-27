import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route , Redirect } from 'react-router-dom';


class App extends Component {
  render() { 

    return(
   

        <div className="card card-body text-light bg-dark">
            
            <div className="form-group">
                <label className="text-light">Libro 1 
                </label>
                
            </div>
            <div className="form-group">
                <label className="text-light">Libro 2
                </label>
                
            </div>
            <div className="form-group">
                <label className="text-light">Libro 3
                </label>
                
            </div>
            <div className="form-group">
                <label className="text-light">Libro 4
                </label>
                
            </div>
            <div className="form-group">
                <label className="text-light">Libro 5
                </label>
                
            </div>
            <div className="form-group">
                <label className="text-light">Libro 6
                </label>
                
            </div>
            
         </div>
         
    )
        }
}

export default App;      