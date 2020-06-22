import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';

const modificar = 'http://localhost:4000/api/novedades/modificar';
const me ='http://localhost:4000/api/novedades/me';
const portada = 'http://localhost:4000/uploads/';

class ModificarNovedad extends Component {

    constructor(props){
        super(props);
            this.state = {
                token: sessionStorage.getItem('token'),
                id: this.props.match.params.id,

                titulo: '',
                descripcion: '',
                publicacion: '', 
                portadaImg: null,
    };
        this.getPortada=this.getPortada.bind(this);
    }
    
    

    onSubmit = async (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('titulo', this.state.titulo);
        formData.append('descripcion', this.state.descripcion);
        formData.append('portadaImg', this.state.portadaImg);
        formData.append('publicacion',this.state.publicacion)
        formData.append('id', this.state.id);
    
        axios.post(modificar,formData,{
                headers: { 'xaccess':this.state.token }
            })
            .then(res => {
            
                alert(JSON.stringify(res.data));
            })
    
            .catch(err => {
                alert(JSON.stringify(err.data))
            } );
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onChangeFecha = publicacion => {
        this.setState({ publicacion });
    };

    getPortada(e){
        
        this.setState({
            portadaImg: e.target.files[0]
        })

    }
    setNovedad=(nove)=>{

        this.setState({

            titulo: nove.titulo,
            descripcion:  nove.descripcion,
            publicacion:  new Date(nove.publicacion), 
            portadaImg: nove.portada

        })

    };


    getData = async () => {
    
        
        await axios.post(me,
          { id: this.state.id },
          { headers:{'xaccess': this.state.token}}
        ).then(res =>{
            
            this.setNovedad(res.data);
        })
        .catch(err =>{console.log(err)})
      
    }

    async componentDidMount(){
        this.getData();
    }
   

    render(){
        return (
        <div className="form-novedad" >
       
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        
        <form onSubmit={this.onSubmit} >
           

        <h2 className="card-header"> Modifcar Novedad</h2>
            <div className="form-group">
                <h5>Titulo</h5>
                <input 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    name ="titulo"
                    onChange={this.onInputChange}
                    value={this.state.titulo}
                    placeholder="Título"
                    required>
                </input>
            </div>

            <div className="form-group">
            <h5>Descripción</h5>
                <textarea className="form-control" 
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    name ="descripcion"
                    onChange={this.onInputChange}
                    value={this.state.descripcion}
                    placeholder="Descripción"
                    required >
                </textarea> 
            </div>

            <div className="form-group">
            <h5>Fecha de publicacion</h5>
                <DatePicker className="form-control"
                        selected={this.state.publicacion}
                        name='publicacion'
                        onChange={this.onChangeFecha}
                        required />
            </div>

            <label className="text-light">Imagen actual</label>
            <div className="form-group">
                <img width="280px" height="auto" src={portada + `${this.state.portadaImg}`} /> 
            </div>

            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='portadaImg' onChange={this.getPortada}>
               </input>
                
            </div >

            <div className="form-group">
                <button type ="submit" className="btn btn-success float-right">
                    Modificar Novedad          
                </button>
            </div>
                    
          
         </form>
         </div>
         </div>   
         </div>
        )
    }
}
export default  ModificarNovedad;