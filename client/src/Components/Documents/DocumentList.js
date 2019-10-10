import React, { Component } from 'react';
import DocumentItem from './DocumentItem';
import axios from 'axios';

class DocumentList extends Component {

  state = {document_types: []}

  componentDidMount() {
    axios.get(`/api/users/1/document_types`)
    .then( res => {
      console.log(res.data)
    this.setState({document_types: res.data})
  })

  }

  renderDocTypes = () => {
    return(
      this.state.document_types.map( type =>
        <div>
        <h2>{type.name}</h2>
        {this.renderDocs(type.id)}
        </div>
      )
    )
  }

  renderDocs = (id) => {
    let myDocs = [];
    this.props.documents.map( doc => {
      if(doc.document_type_id === id) {
        myDocs.push(doc);
      }
    })
    return(
      console.log(myDocs)
    )
  }

  render() {
    return(
      <div>
      {this.renderDocTypes()}
        {
          this.props. documents.map(doc =>
            <DocumentItem
              myDocument={doc}
              key={doc.id}
          />
        )
      }
      </div>
    )
  }
}

export default DocumentList;
