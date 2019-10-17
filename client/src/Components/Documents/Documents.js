import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import DocumentList from './DocumentList'
import ConnectedDocumentTypes from './UserDocumentTypes';
import DocumentForm from './DocumentForm';



class Documents extends Component {
  state = {documents: [], document_types: []}

  componentDidMount(){
    const { auth: { user } } = this.props

    if (user)
    {
      axios.get(`/api/users/${user.id}/documents`)
      .then( res => {
      this.setState({documents: res.data})
      })
    }

    this.setState({user_id: user.id});
  }

  addDocument = (doc) => {
    const document = {name: doc.name, document_type_id: doc.doc_type_id}
    axios.post(`/api/users/${this.state.user_id}/documents`, { document })
      .then( res => {
        const { documents } = this.state;
        this.setState({ documents: [...documents, res.data]})
      })
      .catch( res => {
        console.log(res)
      })
  }

  deleteDocument = (id, doc) => {
    axios.delete(`/api/users/${this.state.user_id}/documents/${id}`, doc)
      .then( res => {
        const { documents } = this.state;
        this.setState({ documents: documents.filter(d => d.id !== id) })
      })
   }

	render() {
    const { auth: { user } } = this.props;
		return(
      <div>
        <h3>Add Document</h3>
        <DocumentForm user_id={user.id} add={this.addDocument}/>
        <h1>My Documents</h1>
        <DocumentList document_types={this.state.document_types} documents={this.state.documents} deleteDocument={this.deleteDocument}/>
        <h3>Custom Document Types</h3>
        <ConnectedDocumentTypes documents={this.state.documents}/>
      </div>
    )
	}

}

export class ConnectedDocuments extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <Documents { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedDocuments);
