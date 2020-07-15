import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack';


const capitulo = 'http://localhost:4000/uploads/'

class LeerLibros extends Component {

  constructor(props) {
    super(props)
    this.state = {
      numPages: null,
      pageNumber: 1,
      terminado: false,
      capitulos:this.props.match.params.id,

    }
  }

  Termino = () => {
    if (this.state.pageNumber == this.state.numPages) {
      this.state.terminado = true;
      alert("Ha terminado el libro satisfactoriamente");

    } else {
      alert("Aun no has terminado de leer")
    }
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  componentDidMount = async () =>{
      console.log(this.props.match.params.id)
  }


  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div className="container-leer">
        <span className="span text-light"> Página {pageNumber} de {numPages}</span>
        <button onClick={(e) => {
          e.preventDefault();
          if (this.state.pageNumber > 1) {
            this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }))
          }
        }}>
          Atras
        </button>
        <button onClick={(e) => {
          e.preventDefault();
          if (this.state.pageNumber < this.state.numPages) {
            this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }))
          }
          else {
            alert('El capitulo ha llegado a su fin')
          }
        }}>
          Siguiente
        </button>
       
        <div className="lector">
          <Document
            file={'http://localhost:4000/uploads/' + this.state.capitulos[0].archivo}

            onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    );
  }
}


export default LeerLibros;