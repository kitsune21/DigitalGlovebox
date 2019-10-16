import React, { Component } from 'react';
import axios from 'axios';
import DocumentPageItem from './DocumentPageItem';

class DocumentPages extends Component {

  state = {pages: []}

  componentDidMount() {
    axios.get(`/api/documents/${this.props.doc_id}/document_pages`)
    .then( res => {
      this.setState({pages: res.data})
    })
  }

  render() {
    return(
      <div>
        <h4>Pages</h4>
        {
          this.state.pages.map(page => <DocumentPageItem page={page}/> )
        }
      </div>
    )
  }
}

export default DocumentPages;