import React, { Component } from 'react';
import ConnectedDocPagesForm from './DocumentPagesForm';
import { Icon, Button, Modal } from 'semantic-ui-react';

class DocumentPageItem extends Component {

  state = { editing: false }

  toggleEditing = () => {
    this.setState({editing: !this.state.editing})
  }

  renderItem = () => {
    const {page} = this.props;
    return (
      <div>
        <Modal
          trigger={<img height='200px' src={page.front_img} alt='page' onClick={this.handleOpen} />}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon
        >
          <Modal.Header>Images</Modal.Header>
          <Modal.Content>
            <img width='100%' src={page.front_img} alt='page' />
            <Button onClick={() => this.props.previousPage()}>Previous Image</Button>
            <Button onClick={() => this.props.nextPage()}>Next Image</Button>
          </Modal.Content>
        </Modal>
      </div>
    )
  }

  render() {
    const { editing } = this.state
    return(
      <div>
        <Button onClick={() => this.toggleEditing()}><Icon name='edit'/></Button>
        { editing ? <ConnectedDocPagesForm id={this.props.page.id} document_id={this.props.page.document_id} doc_page_id={this.props.page.id} toggleEdit={this.toggleEditing}/> : this.renderItem() }
      </div>
    )
  }
}

export default DocumentPageItem;