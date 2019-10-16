import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import DocumentItem from './DocumentItem';
import DocTypeForm from './DocTypeForm';
import { Button, Icon } from 'semantic-ui-react';

class UserDocumentTypes extends Component {

  state = { document_types: [], editing: false }

  toggleEdit = () => this.setState({ editing: !this.state.editing })


  componentDidMount(){
    const { auth: { user } } = this.props
    if (user)
    {
      axios.get(`/api/users/${user.id}/document_types`)
      .then( res => {
      this.setState({document_types: res.data})
      })
    }
  }

  addDocType = (document_type) => {
    const { auth: { user } } = this.props
    axios.post(`/api/users/${user.id}/document_types`, { document_type })
      .then( res => {
        const { document_types } = this.state
        this.setState({ document_types: [...document_types, res.data] })
      })
      .catch( err => {
        console.log(err)
      })
  }

  updateDocType = (id, document_type) => {
    const { auth: { user } } = this.props
    axios.put(`/api/users/${user.id}/document_types/${id}`, { document_type } )
      .then( res => {
        const document_types = this.state.document_types.map( dt => {
          if (dt.id === id)
            return res.data
          return dt
        })
        this.setState({ document_types })
      })
      .catch( err => {
        console.log(err)
      })
  }

  deleteDocType = (id) => {
    const { auth: { user } } = this.props
    axios.delete(`/api/users/${user.id}/document_types/${id}`)
      .then( res => {
        alert(res.data.message)
        const { document_types } = this.state
        this.setState({ document_types: document_types.filter( dt => dt.id !== id) })
      })
  }

  renderDocTypes = () => {
    const { editing } = this.state
    return(
      this.state.document_types.map( type =>
        <div key={type.id} >
        {
          editing ?
          <DocTypeForm
          update={this.updateDocType}
          toggleEdit={this.toggleEdit}
          id={type.id}
          /> :
          <>
          <h2>{type.name}</h2>
          <Button onClick={this.toggleEdit}>
            Edit
          </Button>
          <Button onClick={ () => this.deleteDocType(type.id) }>
            Delete
          </Button>
          </>
        }
          {
            this.renderDocs(type.id).map( doc =>
            <DocumentItem key={doc.id} myDocument={doc} />
          )
        }
        </div>
      )
    )
  }

  renderDocs = (id) => {

    let myDocs = [];
    this.props.documents.forEach( doc => {
      if(doc.document_type_id === id) {
        myDocs.push(doc);
      }
    })
    return(
      myDocs
    )
  }

  render() {
    return(
      <div>
        <DocTypeForm add={this.addDocType} />
        {this.renderDocTypes()}
      </div>
    )
  }
}

export class ConnectedDocumentTypes extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <UserDocumentTypes { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedDocumentTypes);
