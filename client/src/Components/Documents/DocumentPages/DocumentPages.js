import React, { Component } from 'react';
import axios from 'axios';
import DocumentPageItem from './DocumentPageItem';
import { Button, Icon } from 'semantic-ui-react';
import ConnectedDocPagesForm from './DocumentPagesForm';

class DocumentPages extends Component {

  state = {pages: [], currentPage: 0}

  componentDidMount() {
    this.pullPages();
  }

  pullPages = () => {
    axios.get(`/api/documents/${this.props.doc_id}/document_pages`)
    .then( res => {
      this.setState({pages: res.data})
    })
  }

  renderPage = () => {
    const {pages, currentPage } = this.state;
    return(
      pages.length > 0 ? <DocumentPageItem nextPage={this.nextPage} previousPage={this.previousPage} page={pages[currentPage]} /> : <ConnectedDocPagesForm document_id={this.props.doc_id} setAddPages={this.pullPages}/>
    )
  }

  nextPage = () => {
    const {pages, currentPage } = this.state;
    if(currentPage < pages.length -1) {
      this.setState({currentPage: this.state.currentPage + 1})
    } else {
      this.setState({currentPage: 0})
    }
  }

  previousPage = () => {
    const { currentPage } = this.state;
    if(currentPage >= 1) {
      this.setState({currentPage: this.state.currentPage - 1})
    } else {
      this.setState({currentPage: this.state.pages.length - 1})
    }
  }

  deletePage = (id) => {
    axios.delete(`api/documents/${this.props.doc_id}/document_pages/${id}`)
      .then( res => {
        const {pages} = this.state;
        this.nextPage()
        this.setState({ pages: pages.filter( p => p.id !== id)})
      })
  }

  getPageID = () => {
    const { pages } = this.state;
    return pages[this.state.currentPage].id
  }

  render() {
    return(
      <div>
        <h4>Images</h4>
        {this.renderPage()}
        <Button onClick={() => this.previousPage()}>Previous Image</Button>
        <Button onClick={() => this.deletePage(this.getPageID())}><Icon name='trash'/></Button>
        <Button onClick={() => this.nextPage()}>Next Image</Button>
      </div>
    )
  }
}

export default DocumentPages;