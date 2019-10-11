import React, { Component } from 'react';
import DocumentItem from './DocumentItem';
import axios from 'axios';

class DocumentList extends Component {

  state = {document_types: [], custom_doc_types: []}

  componentDidMount() {
    this.pullDocTypes();
  }

  pullDocTypes = () => {
    axios.get(`/api/users/1/document_types`)
      .then( res => {
        this.setState({document_types: res.data})
      })
  }

  renderDocTypes = () => {
    return(
      this.state.document_types.map( type =>
        <div key={type.id} >
          <h2>{type.name}</h2>
          {this.renderDocs(type.id).map( doc => <p key={doc.id}>{doc.name}</p>)}
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

export default DocumentList;
