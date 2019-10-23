import React, { Component } from 'react';
import ConnectedDocPagesForm from './DocumentPagesForm';
import { Button } from 'semantic-ui-react';

class DocumentPageItem extends Component {

  state = { editing: false }

  toggleEditing = () => {
    this.setState({editing: !this.state.editing})
  }

  renderItem = () => {
    const {page} = this.props;
    return (
      <div>
        <img height='200px' src={page.front_img} alt='page' />
      </div>
    )
  }

  render() {
    const { editing } = this.state
    return(
      <div>
        <Button onClick={() => this.toggleEditing()}>Edit</Button>
        { editing ? <ConnectedDocPagesForm id={this.props.page.id} document_id={this.props.page.document_id} doc_page_id={this.props.page.id} toggleEdit={this.toggleEditing}/> : this.renderItem() }
      </div>
    )
  }
}

export default DocumentPageItem;