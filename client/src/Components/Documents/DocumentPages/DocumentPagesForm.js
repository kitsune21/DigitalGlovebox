import React, { Component } from 'react';
import { AuthConsumer, } from '../../../Providers/AuthProvider'
import Dropzone from 'react-dropzone';
import axios from 'axios';

export class DocumentPagesForm extends Component {

  state = { front_img: '', document_id: 0}

  componentDidMount() {
    this.setState({document_id: this.props.document_id})
  }

  onDrop = (files) => {
    console.log(files)
    this.setState({ front_img: files[0]})
  }

  handleSubmit = () => {
    this.addPage(this.state)
    this.props.setAddPages()
  }

  addPage = (document_page) => {
    const { auth: { user } } = this.props
    const { document_id } = this.props;
    axios.post(`/api/users/${user.id}/documents/${document_id}/document_pages`, {document_page})
      .then( res => {
        const { pages } = this.state;
        this.setState({ pages: [...pages, res.data]})
      })
      .catch( res => {
        console.log(res)
      })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <h3>Add Document Pages</h3>
        <div>
          <Dropzone
            onDrop={this.onDrop}
            multiple={false}
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