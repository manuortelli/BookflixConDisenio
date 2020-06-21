import React, { Component } from "../../../../node_modules/react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "../../../../node_modules/react-datepicker";
import "../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import axios from "../../../../node_modules/axios";
import { Redirect } from "react-router-dom";

const cargar = "http://localhost:4000/api/libros/cargarArchivoCapitulo";

class CargarCapitulo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: sessionStorage.getItem("token"),
      lanzamiento: new Date(),
      vencimiento: null,
      titulo: "",
      numero: "",
      ultimoCapitulo: false,
      pdf: null,
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

  onSubmit = async (e) => {
    console.log(this.state.lanzamiento);
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", this.state.id);
    formData.append("nombre", this.state.titulo);
    formData.append("lanzamiento", this.state.lanzamiento);
    formData.append("expiracion", this.state.vencimiento);
    formData.append("n", this.state.numero);
    formData.append("ultimoCapitulo", this.state.ultimoCapitulo);
    formData.append("portadaImg", this.state.pdf);

    axios
      .post(cargar, formData, {
        headers: { xaccess: this.state.token },
      })
      .then((res) => {
        alert(JSON.stringify(res.response.data.msg));
        return <Redirect to="http://localhost:3000/libros" />;
      })

      .catch((err) => {
        alert(JSON.stringify(err.msg));
      });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="form-novedad">
        <div className="col-md-6 offset-md-3">
          <div className="card card-body text-light bg-dark">
            <h3 className="card-header">Cargar Archivo de capitulo</h3>

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
                ></input>{" "}
                <label for="cbox2">SI</label>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success float-right">
                  {" "}
                  Agregar{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CargarCapitulo;