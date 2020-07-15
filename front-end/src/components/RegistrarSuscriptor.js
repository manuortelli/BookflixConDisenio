import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Navegacion from './Navegacion';
import DatePicker from '../../node_modules/react-datepicker';
import './styles/cargarsuscriptor.css';

const cargar = 'http://localhost:4000/api/suscriptores/registrar';

class RegistrarSuscriptor extends Component {
    
    constructor (){
        super();
        this.state = {
            nombre: '', 
            email: '',
            password:'',
            password2:'',
            dni:'',
            suscripcion:'',
            numT:'',
            codT:'',
            añoE:'',
            mesE:'',
            token:'',
            user: null,
            errors:[],
           
        };
        this.handleChange = this.handleChange.bind(this);
        this.cargarSuscriptor = this.cargarSuscriptor.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.getToken = this.getToken.bind(this);
        this.getErrors = this.getErrors.bind(this);
        
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }    

    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    setPremium = () => {
        this.setState({
            suscripcion: "PREMIUM"
        })
    }
    setRegular= () => {
        this.setState({
            suscripcion: "REGULAR"
        })
    }


    
  
    getErrors=(err)=>{
      
        const {data} = err;
        
        const {nombre , email, password , password2}=data; 
        
        const error = [nombre , email, password , password2]; 

        
        this.setState(
            {errors:error}
        )
        error.map(err=>{
            if(! err === '') 
                alert(err);
        } );
        
        
    }
    

  

    async cargarSuscriptor(event){
        
        event.preventDefault();  

        if (this.state.numT.length != 16){
            return alert('Pruebe con una tarjeta que contenga 16 dígitos')
        }
        else if (this.state.codT.length != 3){
            return alert('Ingrese un código de seguridad de 3 dígitos')
        }
        var aux = parseInt(this.state.añoE);

        if(this.state.añoE.length == 2){
            if(aux == 20 ){
                var aux2 = parseInt(this.state.mesE);
                if(aux2 < 5){
                    return alert('Ingrese una tarjeta que no esté vencida')
                }
            }else if (aux < 20){
                return alert('Ingrese una tarjeta que no esté vencida')
            }
       
        }else if(this.state.añoE.length == 4){
            
            if(aux == 2020){
                var aux2 = parseInt(this.state.mesE);
                if(aux2 < 5){
                    return alert('Ingrese una tarjeta que no esté vencida')
                }
            } else if (aux < 2020){
                return alert('Ingrese una tarjeta que no esté vencida')
            }
        }

        await axios.post(cargar,{
            nombre:this.state.nombre ,
            email: this.state.email,
            password:this.state.password,
            password2:this.state.password2,
            suscripcion:this.state.suscripcion,
            dni:this.state.dni,
            numT:this.state.numT,
            codT:this.state.codT,
        })
        .then(res => {
        
            this.getToken(res)})
        .catch(err => {
           alert(JSON.stringify(err.response.data.msg))
          
        });

    }

    getToken = async (res) => {
        console.log("Atencion Maderfaqer",res.data)
        const { user, token, soyAdmin } = res.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('tokenSuscriptor', token);
        sessionStorage.setItem('user', JSON.stringify({ user }));
        sessionStorage.setItem ('soyAdmin', soyAdmin );


        this.setState({ token, user, soyAdmin});
    };

    render(){

        return (
           

        !this.state.token && !this.state.user?

        <div>  
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
            <Navegacion/>
        <div className="form-novedad" >
        <div className="col-md-6 offset-md-3">
        <div className="cardRS card-body text-light bg-dark">
        
        <form onSubmit={this.cargarSuscriptor} >
        <div className="card-header">
				    <h3>Registrate</h3>
			    </div>
            <div className="form-group">
                <label className="text-light">Nombre
                </label>
                <input 
                    className="form-control" 
                    id="nombre" 
                    name ="nombre"
                    onChange={this.onInputChange}
                    value={this.state.nombre}
                    placeholder="Ingrese su nombre"
                    required>
                </input>    
            </div>
            
            <div className="form-group">
                <label className="text-light">Email
                </label>
                <input 
                    className="form-control" 
                    id="email" 
                    name ="email"
                    onChange={this.onInputChange}
                    value={this.state.email}
                    required
                    placeholder="Ingrese un email">
                </input>    
            </div>

            <div className="form-group">
                <label className="text-light">Contraseña</label>
                <input type='password' className="form-control" 
                    id="password" 
                    name ="password"
                    onChange={this.onInputChange}
                    value={this.state.password}
                    placeholder="Ingrese una contraseña"
                    required
                ></input> 
            </div>

            <div className="form-group">
                <label className="text-light">Confirmación de contraseña</label>
                <input type='password' className="form-control" 
                    id="password2" 
                    name ="password2"
                    onChange={this.onInputChange}
                    value={this.state.password2}
                    required
                    placeholder="Vuelva a ingresar su contraseña"
                ></input> 
            </div>

            <div className="form-group">
                <label className="text-light">DNI del titular de la tarjeta
                </label>
                <input 
                    className="form-control" 
                    id="dni" 
                    name ="dni"
                    onChange={this.onInputChange}
                    value={this.state.dni}
                    placeholder="Ingrese su DNI"
                    required>
                </input>    
            </div>
            
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className="text-light">Tipo de Suscripción </label>
                        <button type="checkbox" class="btn btn-danger" onClick={this.setRegular} name="suscripcion" value="REGULAR" data-toggle="button"> REGULAR</button> {" "}
                        <button type="checkbox" class="btn btn-danger"  onClick={this.setPremium} name="suscripcion" value="PREMIUM" data-toggle="button"> PREMIUM</button>
                </div>

            

            <div className="form-group">
                <label className="text-light">Número de tarjeta
                </label>
                <input 
                    type="number"
                    className="form-control" 
                    id="numT" 
                    name ="numT"
                    onChange={this.onInputChange}
                    value={this.state.numT}
                    required 
                    placeholder="Ingrese número de tarjeta, deberá contener 16 digitos">
                </input>    
            </div>

            <div className="form-group">
                <label className="text-light">Codigo De Tarjeta
                </label>
                <input 
                    type="number"
                    className="form-control" 
                    id="codT" 
                    name ="codT"
                    onChange={this.onInputChange}
                    value={this.state.codT}
                    required
                   
                    placeholder="Ingrese el codigo de su tajeta, deberá contener 3 dígitos">
                </input>    
            </div>
            <div className="form-group">
                <label className="text-light">Fecha de expiracion
                </label>
                <input 
                    type="number"
                    className="form-control" 
                    id="mesE" 
                    name ="mesE"
                    onChange={this.onInputChange}
                    value={this.state.mesE}
                    required
                   
                    placeholder="MES">
                </input>    
            
                <input 
                    type="number"
                    className="form-control" 
                    id="añoE" 
                    name ="añoE"
                    onChange={this.onInputChange}
                    value={this.state.añoE}
                    required
                   
                    placeholder="AÑO">
                </input>    
            </div>


            <div className="form-group">
                <button  type="submit" className="btn btn-danger btn-lg btn-block"
                        >
                    Suscribirse
                </button>
            </div>
                    
    

         </form>
         </div>
         </div>   
         </div>
         </div> 
         :
         <Redirect
         from="/singup"
         to="/homeperfiles" />
        )
    }
}

export default RegistrarSuscriptor;      