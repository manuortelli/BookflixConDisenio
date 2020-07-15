import React, { Component } from "../../../../node_modules/react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../../../../node_modules/react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import axios from "../../../../node_modules/axios";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

const modificar = "http://localhost:4000/api/libros/modificarCapitulo";
const archivoPath = "http://localhost:4000/uploads/";

var lanzam='';
var vencim='';
var archivo=null;

class ModificarCapitulo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: sessionStorage.getItem("token"),
      lanzamiento: "",
      vencimiento: "",
      titulo: "",
      numero: "",
      ultimoCapitulo: false,
      pdf: null,
      capitulo: "",
      lanzamientoAntiguo:'',
      enviarVenc:null,
      enviarLanza:null,
      formData: new FormData()
    };

    this.getPdf = this.getPdf.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onChangeFechaDeVencimiento = this.onChangeFechaDeVencimiento.bind(
      this
    );
    this.onChangeFechaDeLanzamiento = this.onChangeFechaDeLanzamiento.bind(
      this
    );
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPdf(e) {
    this.setState({
      pdf: e.target.files[0],
    });
  }

  onChangeFechaDeVencimiento = (vencimiento) => {
    this.setState({ vencimiento });
  };

  onChangeFechaDeLanzamiento = (lanzamiento) => {
    this.setState({ lanzamiento });
  };

  ultimoCapitulo = (e) => {
    this.setState({
      ultimoCapitulo: !this.state.ultimoCapitulo,
    });
  };


  validaciones=()=>{
    if(this.state.numero==''){
      alert(' el numero es obligatorio');
      return false;
    }

    let hoy =new Date();
   
    let lanAnt=new Date(this.state.capitulo.lanzamiento);
    let lan=new Date(this.state.lanzamiento);
    let enviarLanz='';
    let enviarVen='';

    console.log(lanAnt);
    console.log(lan);
    console.log(enviarLanz);

    hoy.setHours(0);
    hoy.setMinutes(0);
    hoy.setSeconds(0);
    hoy.setMilliseconds(0);

    lanAnt.setHours(0);
    lanAnt.setMinutes(0);
    lanAnt.setSeconds(0);
    lanAnt.setMilliseconds(0);

    lan.setHours(0);
    lan.setMinutes(0);
    lan.setSeconds(0);
    lan.setMilliseconds(0);

    if(lan.getDay() == lanAnt.getDay() && lan.getMonth() == lanAnt.getMonth() && lan.getFullYear() == lanAnt.getFullYear()){
       console.log("las fechas son identicas las de lanzamiento");
      enviarLanz = '';
    }else{
      //alert("las fechas son distintas");
      if(lan<hoy){
        console.log('la fecha de publicacion debe ser mayor a la actual');
        return false
      }else{
         enviarLanz=lan;
      }
    }
    if(this.state.vencimiento != ''){
      if(this.state.vencimiento < lan){
        console.log('la fecha de vencimiento debe ser mayor que la de lanzamiento')
        return false 
  
      }
    }
   
    
    

    
   /* if(this.state.vencimiento != '' && this.state.capitulo.vencimiento != null){

      let venAnt=new Date(this.state.capitulo.vencimiento);
      let ven=new Date(this.state.vencimiento);
     

      console.log(venAnt);
      console.log(ven);
      console.log(enviarVen);
      if(ven.getDay() == venAnt.getDay() && ven.getMonth() == venAnt.getMonth() && ven.getFullYear() == venAnt.getFullYear()){
        alert("las fechas de venciminto son identicas");
        enviarVen = null;
      }else{
        alert("las fechas son distintas");
        if(ven<lan){
          alert('la fecha de venciemirnto debe ser mayor  que la de lanzamiento');
          return false
        }else{
          enviarVen=ven;
        }
      }




  }else{

   

  }*/
  console.log(enviarVen);
  console.log(enviarLanz);
  lanzam=enviarLanz;
  vencim=enviarVen;

  this.setState({
      enviarVenc: enviarVen,
      enviarLanza: enviarLanz,
  })

  if(this.state.capitulo.portadaImg == this.state.pdf){
    archivo= null;
    alert('no se cargo ningun archivo');

  }else{
    archivo= this.state.pdf;
  }



  return true;


  }


  /*validacion = () => {



    if (this.state.lanzamiento != null) {
      const hoy = JSON.stringify(new Date().getDate());
      const inputHoy = JSON.stringify(
        new Date(this.state.lanzamiento).getDate()
      );
      const mes = JSON.stringify(new Date().getMonth() + 1);
      const inputMes = JSON.stringify(
        new Date(this.state.lanzamiento).getMonth() + 1
      );
      const año = JSON.stringify(new Date().getFullYear());
      const inputAño = JSON.stringify(
        new Date(this.state.lanzamiento).getFullYear()
      );
      if ((hoy == inputHoy) & (mes == inputMes) & (año == inputAño)) {
        return true;
      }
      if (new Date().getTime() != new Date(this.state.lanzamiento).getTime()) {
        if (new Date(this.state.lanzamiento) < new Date()) {
          alert("La fecha de publicacion debe ser igual o mayor a la de hoy ");
          return false;
        }
      }
    } else {
      const hoy = JSON.stringify(new Date().getDate());
      const inputHoy = JSON.stringify(
        new Date(this.state.lanzamiento).getDate()
      );
      const mes = JSON.stringify(new Date().getMonth() + 1);
      const inputMes = JSON.stringify(
        new Date(this.state.lanzamiento).getMonth() + 1
      );
      const año = JSON.stringify(new Date().getFullYear());
      const inputAño = JSON.stringify(
        new Date(this.state.lanzamiento).getFullYear()
      );
      if ((hoy == inputHoy) & (mes == inputMes) & (año == inputAño)) {
        return true;
      }
      if (new Date() > new Date(this.state.lanzamiento)) {
        alert(
          "La fecha de publicacion debe ser igual o mayor mayor a la de hoy  "
        );
        return false;
      }
    }

    if (new Date(this.state.vencimiento) < new Date(this.state.lanzamiento)) {
      alert("La fecha de expiracion no debe ser menor a la de publicacion");
      return false;
    }

    return true;
  };*/


  vali=()=>{
    if(this.state.numero==''){
      alert(' el numero es obligatorio');
      return false;
    }

    let hoy =new Date();
   
    let lanAnt=new Date(this.state.capitulo.lanzamiento);
    let lan=new Date(this.state.lanzamiento);
    let enviarLanz='';

    console.log(lanAnt);
    console.log(lan);
    console.log(enviarLanz);

    hoy.setHours(0);
    hoy.setMinutes(0);
    hoy.setSeconds(0);
    hoy.setMilliseconds(0);

    lanAnt.setHours(0);
    lanAnt.setMinutes(0);
    lanAnt.setSeconds(0);
    lanAnt.setMilliseconds(0);

   if(lan.getDay() == lanAnt.getDay() && lan.getMonth() == lanAnt.getMonth() && lan.getFullYear() == lanAnt.getFullYear()){
      console.log("las fechas son identicas, las de lanzamiento");
      enviarLanz = '';
   }else{
     console.log("las fechas son distintas");
     if(lan<hoy){
       alert('la fecha de publicacion debe ser mayor a la actual');
       return false
     }else{
        enviarLanz=lan;
     }
   }
   if(this.state.vencimiento != ''){
     if(this.state.vencimiento<lan){
        alert('la fecha de vencimiento debe ser mayor que la de lanzamiento ')
        return false
     }

   }

   lanzam=enviarLanz;
   console.log(lanzam);
   return true;




  }

  onSubmit = async (e) => {
    e.preventDefault();
    //this.validaciones();
    if (this.vali()) {
     
      console.log(this.state.enviarLanza);
      console.log(this.state.enviarVenc);


      console.log({
        idCapitulo: this.state.id,
        idLibro: this.state.libro,
        lanzamiento: this.state.lanzamiento,
        titulo: this.state.titulo,
        n: this.state.numero,
        portadaImg: this.state.pdf,
        ultimo: this.state.ultimoCapitulo,
        vencimiento: this.state.vencimiento,
        enviarVenc:vencim,
        enviarLanza:lanzam,

      });

      
      this.state.formData.append("id", this.state.id);
      this.state.formData.append("idCapitulo",this.state.id);
      this.state.formData.append("idLibro",this.state.libro);
     
      this.state.formData.append("lanzamiento",lanzam);
      this.state.formData.append("vencimiento", this.state.vencimiento);
      
      this.state.formData.append("titulo", this.state.titulo);
      this.state.formData.append("n", this.state.numero);
      if(this.state.ultimoCapitulo){
        this.state.formData.append("ultimo", 'SI');
      }else{
        this.state.formData.append("ultimo", 'NO');
      }
     
     
      
      this.state.formData.append("portadaImg", archivo);
      console.log("envio esto");
      for (var value of this.state.formData.values()) {
        console.log("Valores de form data",value); }
      
     

      /*{
        idCapitulo: this.state.id,
        idLibro: this.state.libro,
        lanzamiento: lanzam,
        titulo: this.state.titulo,
        n: this.state.numero,
        portadaImg: archivo,
        ultimo: this.state.ultimoCapitulo,
        vencimiento: vencim,
      }*/
     await axios
        .post(
          modificar,this.state.formData
          ,
          {
            headers: { xaccess: this.state.token },
          }
        )
        .then((res) => {
          alert(JSON.stringify(res.data.msg));
          //return (window.location = "/libros");
        })

        .catch((err) => {
          alert(JSON.stringify(err.response.data.msg));
          //window.location.reload(true);
        });
    }
  };

  componentDidMount() {
    let capi = JSON.parse(sessionStorage.getItem(this.state.id));
    let ven;
    let lan;

    if (capi.vencimiento != null) {
      ven = new Date(capi.vencimiento);
    } else {
      ven = "";
    }
    if (capi.lanzamiento != null) {
      lan = new Date(capi.lanzamiento);
    } else {
      lan = "";
    }

    this.setState({

      libro: capi.libro,
      capitulo: capi,
      titulo: capi.titulo,
      numero: capi.n,
      lanzamiento: lan,
      vencimiento: ven,
      pdf: capi.portadaImg,
      lanzamientoAntiguo:capi.lanzamiento
    });

    console.log(capi);
  }

  render() {
    return (
      <div className="form-novedad">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body text-light bg-dark">
            <h3 className="card-header">
              {" "}
              {" Modificar capitulo del libro " +
                this.state.capitulo.tituloLibro}
            </h3>

            <form onSubmit={this.onSubmit} autoComplete="off">
              <div className="form-group">
                <label className="text-light">Título</label>
                <input
                  className="form-control"
                  id="exampleFormControlInput1"
                  name="titulo"
                  onChange={this.onInputChange}
                  value={this.state.titulo}
                  placeholder="Título"
                  required
                ></input>
              </div>
              <div className="form-group">
                <label className="text-light">Numero de capitulo</label>
                <input
                  className="form-control"
                  type="number"
                  id="exampleFormControlInput1"
                  name="numero"
                  onChange={this.onInputChange}
                  value={this.state.numero}
                  placeholder="numero de capitulo"
                  required
                ></input>
              </div>

              <label className="text-light">Archivo PDF</label>
              <div className="form-group">
                <input
                  type="file"
                  encType="multipart/form-data"
                  name="pdf"
                  onChange={this.getPdf}
                ></input>
              </div>

              <label className="text-light">Fecha De Lanzamiento </label>
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  selected={this.state.lanzamiento}
                  name="lanzamiento"
                  onChange={this.onChangeFechaDeLanzamiento}
                />
              </div>

              <label className="text-light">
                Fecha De Vencimiento (Opcional)
              </label>
              <div className="form-group">
                <DatePicker
                  className="form-control"
                  selected={this.state.vencimiento}
                  name="vencimiento"
                  onChange={this.onChangeFechaDeVencimiento}
                />
              </div>
              <div className="">
                <label>Es el ultimo capitulo?</label>
                <br></br>
                <input
                  type="checkbox"
                  id="cbox2"
                  name="checkbox"
                  onChange={this.ultimoCapitulo}
                  checked={this.state.ultimoCapitulo}
                ></input>{" "}
                <label for="cbox2">SI</label>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success float-right">
                  {" "}
                  Modificar{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ModificarCapitulo;
