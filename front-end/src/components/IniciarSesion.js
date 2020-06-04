import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Navegacion from './Navegacion.js';
import './styles/iniciarsesion.css';
import { PDFReader } from 'reactjs-pdf-reader';

const login = 'http://localhost:4000/api/suscriptores/login';

class App extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            token: '',
            user: null,
        };
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }
    getErrors = (err) => {

        const { data } = err;
        alert(data);
    }


    getToken = async (res) => {
        const { user, token } = res.data;

        sessionStorage.setItem('token', token);

        sessionStorage.setItem('user', JSON.stringify({ user }));

        this.setState({ token, user });
    };


    async iniciarSesion(event) {

        event.preventDefault();

        await axios.post(login, {
            email: this.state.email,
            password: this.state.password,
        })
            .then(res => {
                this.getToken(res)
            })
            .catch(error => {

                alert(JSON.stringify(error.response.data.msg));



            });

    }


    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };


    render() {
        return (
                
        !this.state.token && !this.state.user ?

        <div>
            <Navegacion/>
            
       
            
        <div className="container">
	        <div className="d-flex justify-content-center h-100">
		    <div className="cardIS">
            <form onSubmit={this.iniciarSesion}>    
			    <div className="card-header">
				    <h3>Iniciar Sesion</h3>
			    </div>
			<div className="card-body">
				<form>
					<div className="input-group form-group">
                        <input  type="text" 
                                className="form-control" 
                                placeholder="E-Mail"
                                id="email"
                                name="email"
                                onChange={this.onInputChange}
                                value={this.state.email}
                                >
                                </input>
					</div>
					<div className="input-group form-group">
                        <input type="password" 
                               className="form-control" 
                               placeholder="Password"
                               id="password"
                               name="password"
                               onChange={this.onInputChange}
                               value={this.state.password}
                                >
                               </input>
					</div>
					<div className="form-group">
						<input type="submit" value="Login" className="btn float-right login_btn"></input> 
					</div>
				</form>
			</div>
            </form>
            </div>
            </div>
			</div>
			</div> 
        :
        <Redirect
        from="/login"
        to="/home" />
        )

    }
}


export default App; 