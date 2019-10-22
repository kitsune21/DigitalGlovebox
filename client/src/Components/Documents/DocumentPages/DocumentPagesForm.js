import React, { Component } from 'react';
import { AuthConsumer, } from '../../../Providers/AuthProvider'
import Dropzone from 'react-dropzone';
import axios from 'axios';

export class DocumentPagesForm extends Component {

  state = { front_img: '', document_id: 0, files: []}

  componentDidMount() {
    this.setState({document_id: this.props.document_id})
  }

  onDrop = (droppedFiles) => {
    this.setState({ files: [...this.state.files, droppedFiles]})
  } 

  handleSubmit = () => {
    if(!this.props.id){
      this.addPage()
      this.props.setAddPages()
    } else {
      this.updatePage(this.state)
    }
  }

  addPage = () => {
    const { document_id } = this.props;
    let postFile;
    this.state.files.forEach( fileArray => 
      {
        fileArray.forEach( file => {
          postFile = new FormData();
          postFile.append("file", file)
          axios.post(`/api/documents/${document_id}/document_pages`, postFile)
          .then( res => {
            const { pages } = this.state;
            this.setState({ pages: [...pages, res.data]})
          })
          .catch( res => {
            console.log(res)
          })
        })
      }
    )
  }

  updatePage = (doc) => {
    const { document_id } = this.props;
    console.log(doc)
    let file = new FormData();
    file.append("file", doc.front_img)
    console.log(file.get("file"))
    axios.put(`/api/documents/${document_id}/document_pages/${this.props.id}`, file)
      .then( res => {
        const { pages } = this.state;
        this.setState({ pages: [...pages, res.data]})
      })
      .catch( res => {
        console.log(res)
      })
  }

  renderFileName = () => {
    return(
      this.state.files.forEach(file => <p>{file[0].path}</p>)  
    )
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <h3>Add Document Pages</h3>
        <div>
          <Dropzone
            onDrop={this.onDrop}
            multiple={true}
          >
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  style={styles.dropzone}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop files here...</p> :
                      <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div>
              )
            }}
          </Dropzone>
          {this.state.files ? this.renderFileName() : null}
          <button>Add</button>
        </div>
      </form>
    )
  }
}

const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}

const ConnectedDocPagesForm = (props) => (
  <AuthConsumer>
    { auth => 
      <DocumentPagesForm {...props} auth={auth}/>
    }
  </AuthConsumer>
)

export default ConnectedDocPagesForm;