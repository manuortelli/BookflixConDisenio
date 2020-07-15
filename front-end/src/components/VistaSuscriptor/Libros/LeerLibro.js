import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack';


const libro = 'http://localhost:4000/uploads/'

class LeerLibros extends Component {

  constructor(props) {
    super(props)
    this.state = {
      numPages: null,
      pageNumber: 1,
      terminado: false,
      ruta: this.props.match.params.id,

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
            alert('Ha llegado al final')
          }
        }}>
          Siguiente
        </button>
       
        <div className="lector">
          <Document
            file={'http://localhost:4000/uploads/' + this.state.ruta}

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

/*import React, { Component } from 'react'
import PDFViewer from 'pdf-viewer-reactjs'


const libro = 'http://localhost:4000/uploads/3Cuentos_LasMilNoches.pdf';



class LeerLibros extends Component{
    constructor(props){
        super(props);
        this.state={
            pages:7,
            pagActual:'',
        }

    }

   render(){
    return (
        <PDFViewer
            document={{
                url: 'http://localhost:4000/uploads/Limites-Parte 1.pdf',
            }}

            scale={1.2}

            page={this.state.pages}
            pages={this.state.pages}



        />

    )
    }
}


export default LeerLibros
*/