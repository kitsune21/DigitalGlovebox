import React, { Component } from 'react';
import { AuthConsumer, } from '../../../Providers/AuthProvider'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';

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
      this.props.toggleModal()
    } else {
      this.updatePage()
      this.props.toggleEdit();
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
            this.setState({files: []})
          })
          .catch( res => {
            console.log(res)
          })
        })
      }
    )
  }

  updatePage = () => {
    const { document_id, doc_page_id } = this.props;
    let postFile;
    console.log('hi')
    this.state.files.forEach( fileArray => 
      {
        fileArray.forEach( file => {
          postFile = new FormData();
          postFile.append("file", file)
          axios.put(`/api/documents/${document_id}/document_pages/${doc_page_id}`, postFile)
          .then( res => {
            this.setState({ files: []})
            this.props.returnNewImage(file)
          })
          .catch( res => {
            console.log(res)
          })
        })
      }
    )
  }

  multiOrSingle = () => {
    if(this.props.doc_page_id) {
      return false
    } else {
      return true
    }
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <h3>{this.props.id ? 'Edit Page' : 'Add Document Pages'}</h3>
        <div>
          <Dropzone
            onDrop={this.onDrop}
            multiple={this.multiOrSingle()}
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
          <Button type='submit'>Submit</Button>
        </div>
      </Form>
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