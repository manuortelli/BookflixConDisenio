import React, { Component } from '../../../../node_modules/react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from '../../../../node_modules/react-datepicker';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import axios from '../../../../node_modules/axios';

const modificar = 'http://localhost:4000/api/trailers/modificar';
const me ='http://localhost:4000/api/trailers/me';
const portada = 'http://localhost:4000/uploads/';
const libros = 'http://localhost:4000/api/libros';

class ModificarTrailer extends Component {

    constructor(props){
        super(props);
            this.state = {
                user: JSON.parse(sessionStorage.getItem('user')),
                token: sessionStorage.getItem('token'),
                id: this.props.match.params.id,
                titulo: '',
                descripcion: '',
                libroseleccionado: '',
                hola: '',
                video: '',
                libros: [],
                formData: new FormData()
    };
        this.getPortada=this.getPortada.bind(this);
    }
    
    

    onSubmit = async (e) => {
        e.preventDefault();
        this.state.formData.append('idTrailer', this.props.match.params.id);
        this.state.formData.append('titulo', this.state.titulo);
        this.state.formData.append('descripcion', this.state.descripcion);
        if (this.state.libroseleccionado != null){
            this.state.formData.append('libro', this.state.libroseleccionado);}
        if (this.state.archivo != null){
            this.state.formData.append('hola', this.state.archivo);
        }
        if (this.state.video != null){
            this.state.formData.append('video', this.state.video);
        }
        for (var value of this.state.formData.values()) {
            console.log("Valores de form data",value); }
        await axios.post(modificar,this.state.formData,
            { headers: { 'xaccess':this.state.token }
            })
            .then(res => {
                alert("Trailer modificado con exito");
                return (window.location = '/trailers')
            })
            .catch(err => {
                alert(JSON.stringify(err.response.data.msg))
            } );
          
         /*await fetch(modificar, {
            method: 'POST',
            body: this.state.formData
          })
          .then(res => {
              console.log(res.data)
          })
*/
          



    };

    onInputChangeLibro =  async (e) => {
        this.setState({
            libroseleccionado: e.target.value
        })
        console.log(this.state.libroseleccionado)
    };

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    getPortada(e){
        
        this.setState({
            portadaImg: e.target.files[0]
        })

    }
    setTrailer=(trailer)=>{
        console.log("Libro seleccionado", trailer.libro)
        this.setState({

            titulo: trailer.titulo,
            descripcion:  trailer.descripcion,
            libroseleccionado: trailer.libro,
            hola: trailer.hola,
            video: trailer.video,
            archivo:trailer.archivo

        })

    };

    getPdf = (e) => {
        if (this.state.archivo != null)
        { return alert ("Ya se ha cargado un video, no se pueden cargar ammbos")}
        else {
        this.state.video="no";
        this.state.archivo= e.target.files[0];}
    console.log(this.state.video, this.state.archivo)
}


getVideo = (e) => {
    if (this.state.archivo != null)
    { return alert ("Ya se ha cargado un pdf, no se pueden cargar ammbos")}
    else {
        this.state.video='si';
        this.state.archivo= e.target.files[0];
       }
   
    
}

getLibros = async () => {
        const {user} = this.state.user;
        await axios.get(libros,{
            user: user,
            headers:{'xaccess':this.state.token}  
        })
        .then(res =>{
                this.setState({ libros :res.data
                })
        })
        .catch();



    }


    getData = async () => {
    
        
        await axios.post(me,
          { id: this.state.id },
          { headers:{'xaccess': this.state.token}}
        ).then(res =>{
            console.log("Lo que devuelve me",res.data)
            this.setTrailer(res.data);
        })
        .catch(err =>{console.log(err)})
      
    }

    async componentDidMount(){
        this.getData();
        this.getLibros();
    }
   

    render(){
        const show = this.state.video
        return (
        <div className="form-novedad" >
       
        <div className="col-md-6 offset-md-3">
        <div className="card card-body text-light bg-dark">
        
        <form onSubmit={this.onSubmit} >
           

        <h2 className="card-header"> Modifcar Trailer</h2>
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
            <label className="text-light">Libro asociado (Opcional)</label>
            <select className="form-control"  onChange={this.onInputChangeLibro} id="exampleFormControlSelect1" name="libros" >
            <option value="" >Elija un libro asociado (Opcional)</option>
                {this.state.libros.map(libro =>
        
                <option selected={ libro._id === this.state.libroseleccionado  } key={libro._id} value={libro._id} >{libro.titulo}</option>
                
                )}
            </select>

            <br></br>     
            
            {show == "si" ? (
              <React.Fragment>
              <label className="text-light">Archivo PDF/Video subido anteriormente</label>
              <video
                width="500"
                height="300"
                controls="controls"
                autoPlay="false"
                src={portada + `${this.state.archivo}`}
              />
              </React.Fragment>
            ) : show == "no" ? (
                <React.Fragment>  
              <label className="text-light">Archivo PDF/Video subido anteriormente</label>
              <iframe
                src={portada + `${this.state.archivo}`}
                scrolling="auto"
                height="700"
                width="500"
                options="false"
              />
              </React.Fragment>
            )
            : <React.Fragment></React.Fragment>
            }

            <br></br>        
            <label className="text-light">Seleccione Archivo PDF (Opcional)</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='archivo' onChange={this.getPdf} accept=".pdf">
               </input>
                
            </div >
            <br></br>

            <label className="text-light">Seleccione un Video (Opcional)</label>
            <div className="form-group">

               <input type='file' encType="multipart/form-data" name='archivo' onChange={this.getVideo}>
               </input>
                
            </div >

            <br></br>
            <div className="form-group">
                <button type ="submit" className="btn btn-success float-right">
                    Modificar Trailer       
                </button>
            </div>
                    
          
         </form>
         </div>
         </div>   
         </div>
        )
    }
}
export default  ModificarTrailer;