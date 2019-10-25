import React, { Component } from 'react';
import ConnectedDocPagesForm from './DocumentPagesForm';
import { Icon, Button, Modal } from 'semantic-ui-react';

class DocumentPageItem extends Component {

  state = { editing: false, newImage: '' }

  toggleEditing = () => {
    this.setState({editing: !this.state.editing})
  }

  returnNewImage = (newImage) => {
    this.setState({newImage: newImage})
  }

  imageSource = (page) => {
    if(this.state.newImage) {
      return this.state.newImage
    } else {
      return page.front_img
    }
  }

  renderItem = () => {
    const {page} = this.props;
    return (
      <div>
        <Modal
          trigger={<img height='200px' src={this.imageSource(page)} alt='page' onClick={this.handleOpen} />}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeIcon
        >
          <Modal.Header>Images</Modal.Header>
          <Modal.Content>
            {this.renderEditForm(page)}
          </Modal.Content>
          {this.renderModal()}
        </Modal>
      </div>
    )
  }

  renderEditForm = (page) => {
    if(this.state.editing) {
      return(
        <ConnectedDocPagesForm id={page.id} document_id={page.document_id} doc_page_id={page.id} toggleEdit={this.toggleEditing} returnNewImage={this.returnNewImage}/>
      )
    } else {
      return null
    }
  }

  renderModal = (editing) => {
    const { page } = this.props;
    return(
      <Modal.Content>
        <Button onClick={() => this.props.previousPage()}>Previous Image</Button>
        <Button onClick={() => this.props.nextPage()}>Next Image</Button>
        <Button style={{float:'right'}} onClick={() => this.props.deletePage(this.props.page.id)}><Icon name='trash'/></Button>
        <Button style={{float:'right'}} onClick={() => this.toggleEditing()}><Icon name='picture'/></Button>
        <img width='100%' src={page.front_img} alt='page' />
      </Modal.Content>
    )
  }

  render() {
    return(
      <div>
        {this.renderItem()}
      </div>
    )
  }
}

export default DocumentPageItem;