import React, { Component } from 'react';
import ConnectedDocPagesForm from './DocumentPagesForm';

class DocumentPageItem extends Component {

  state = { editing: false }

  toggleEditing = () => {
    this.setState({editing: !this.state.editing})
  }

  renderItem = () => {
    const {page, deletePage} = this.props;
    return (
      <div>
        <img width='200px' src={page.front_img} alt='page' />
        <button onClick={() => deletePage(page.id)}>Delete</button>
      </div>
    )
  }

  render() {
    const { editing } = this.state
    return(
      <div>
        <button onClick={() => this.toggleEditing()}>Edit</button>
        { editing ? <ConnectedDocPagesForm id={this.props.page.id} document_id={this.props.page.document_id}/> : this.renderItem() }
      </div>
    )
  }
}

export default DocumentPageItem;