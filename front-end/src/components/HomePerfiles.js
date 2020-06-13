import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ItemPerfil from './ItemPerfil';
import { Link } from 'react-router-dom';
import HomeSuscriptor from './VistaSuscriptor/HomeSuscriptor';



//Poner constante a la cual le hacemos la consulta de nuestros pefiles como suscriptor
const perfilesApi = 'http://localhost:4000/api/suscriptores/loginPerfiles'
const miperfilApi = 'http://localhost:4000/api/perfiles/me'
const loginPerfilApi = 'http://localhost:4000/api/suscriptores/loginPerfil'

class ListarPerfiles extends Component {
    constructor() {
        super();
        this.state = {
            token: sessionStorage.getItem('token'),
            perfiles: [],
            perfilesNombre: [],
            perfilselected: false

        }


    }





    irAHomeDePerfil = async (event) => {



        await axios.post(loginPerfilApi,
            { id: this.state.perfiles[0] },
            {
                headers: { 'xaccess': sessionStorage.getItem('token') }
            })
            .then(res => {
                const { user, token } = res.data;
                sessionStorage.setItem('token', token);
                this.setState({ perfilselected: true });
            });



    }




    async componentDidMount() {
        var perfilesid = new Array(), perfilesNombre1 = new Array()
        await axios.get(perfilesApi,
            { headers: { 'xaccess': sessionStorage.getItem('token') } }
        )
            .then(res => {
                res.data.map(info => {
                    { perfilesid.push(info.id) }
                    { perfilesNombre1.push(info.nombre) }

                })


            });

        this.setState({
            perfiles: perfilesid,
            perfilesNombre: perfilesNombre1

        })



        console.log(this.state.perfiles[0])
        console.log(this.state.perfilesNombre[0])
        console.log(this.state.perfilesNombre)


    }



    render() {

        return (
            (this.state.token === '' || this.state.perfilselected == false) ?

                <div className="container">
                    <div className="cardPerfil col-md-6 offset-md-3 text-light bg-dark " >
                        <h3 className="card-header">Perfiles:</h3>
                        <div className="card-header">
                            <h3>{this.state.perfilesNombre[0]}</h3>
                            <button className="btnPerfil float-right login_btn" onClick={this.irAHomeDePerfil}>
                                Ingresar
                            </button>
                        </div>
                    </div>
                </div>

                : <HomeSuscriptor></HomeSuscriptor>





        )
    }

}



export default ListarPerfiles;
