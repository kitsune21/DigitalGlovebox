import React, { Component } from 'react';
import DocumentPages from './DocumentPages/DocumentPages';
import DocumentForm from './DocumentForm';
import { Button, Icon, Modal, Header } from 'semantic-ui-react';


class DocumentItem extends Component {
  state = { formOpen: false}
  toggleFormOpen = () => this.setState({formOpen: !this.state.formOpen})

  render() {
    const { myDocument, deleteDocument, updateDocument } = this.props;
    return (
      <div>
        
        {
           <Modal
            trigger={<Button style={{float:'right'}} onClick={this.toggleFormOpen}><Icon name='edit' size='small' /></Button>}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            closeIcon
           >
             <Modal.Header>Edit Document:</Modal.Header>
             <Modal.Content>
             <Button style={{color:'red'}} onClick={() => deleteDocument(myDocument.id)}><Icon name='trash'/></Button>
              <DocumentForm {...myDocument}
                update={updateDocument}
                toggleEdit={this.toggleFormOpen}
              />
             </Modal.Content>
           </Modal>
        }
        <Header>{ myDocument.name }</Header>
        <DocumentPages doc_id={myDocument.id}/>
      </div>
    )
  }
}




export default DocumentItem;
