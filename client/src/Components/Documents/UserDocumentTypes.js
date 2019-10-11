import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import DocumentItem from './DocumentItem';



class UserDocumentTypes extends Component {
  state = { document_types: []}

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

  renderDocTypes = () => {
    return(
      this.state.document_types.map( type =>
        <div key={type.id} >
          <h2>{type.name}</h2>
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
