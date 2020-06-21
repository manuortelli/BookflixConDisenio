
import React, { Component } from 'react'
import { Redirect} from 'react-router-dom';

import HomeAdmin from './VistaAdmin/HomeAdmin';
import HomePerfiles from './HomePerfiles';
import HomeSuscriptor from './VistaSuscriptor/HomeSuscriptor';
import axios from 'axios';
import VisualizacionInicial from './VisualizacionInicial';
import Login from './IniciarSesion';

const soyAdminApi = 'http://localhost:4000/api/suscriptores/soyAdmin'

export default class Home extends Component {

    constructor(){
        super();
        this.state={
            user: '',
            token: sessionStorage.getItem('token'),
            soyAdmin: sessionStorage.getItem('soyAdmin')
        };
        //this.setSoyAdmin = this.setSoyAdmin.bind(this)
       
    }  
    componentDidMount(){
        //this.setSoyAdmin();
        //console.log(this.state.soyAdmin)
    }

    /*async setSoyAdmin() {
        await axios.get( soyAdminApi ,
            
            {headers:{'xaccess':this.state.token}  
        }).then(res =>{
            console.log(res.data)
            this.setState({
                soyAdmin : res.data
            });
        })
    };*/



    render() {
        //const admin=sessionStorage.getItem('soyAdmin');
        return (
            (this.state.token === '' || null) 
            
            ?    <Login/>

            :    (this.state.soyAdmin === "false"

                    ? <HomePerfiles></HomePerfiles>
                    
                     : <HomeAdmin></HomeAdmin> 
                    
            )
        )
    }
}
//<Navegacion/>