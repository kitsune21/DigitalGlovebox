import React, { Component } from 'react';
import axios from 'axios';
import DocumentPageItem from './DocumentPageItem';

class DocumentPages extends Component {

  state = {pages: [], currentPage: 0}

  componentDidMount() {
    axios.get(`/api/documents/${this.props.doc_id}/document_pages`)
    .then( res => {
      this.setState({pages: res.data})
    })
  }

  renderPage = () => {
    const {pages, currentPage } = this.state;
    return(
      pages.length > 0 ? <DocumentPageItem page={pages[currentPage]} deletePage={this.deletePage}/> : null
    )
  }

  nextPage = () => {
    const {pages, currentPage } = this.state;
    if(currentPage < pages.length -1) {
      this.setState({currentPage: this.state.currentPage + 1})
    }
  }

  previousPage = () => {
    const { currentPage } = this.state;
    if(currentPage >= 1) {
      this.setState({currentPage: this.state.currentPage - 1})
    }
  }

  deletePage = (id) => {
    axios.delete(`api/documents/${this.props.doc_id}/document_pages/${id}`)
      .then( res => {
        const {pages} = this.state;
        this.setState({ pages: pages.filter( p => p.id !== id)})
      })
  }

  render() {
    return(
      <div>
        <h4>Pages</h4>
        {this.renderPage()}
        <button onClick={() => this.previousPage()}>Previous Page</button>
        <button onClick={() => this.nextPage()}>Next Page</button>
      </div>
    )
  }
}

export default DocumentPages;