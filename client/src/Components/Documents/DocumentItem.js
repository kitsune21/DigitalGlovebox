import React, { Component } from 'react';
import DocumentPages from './DocumentPages/DocumentPages';
import DocumentForm from './DocumentForm';
import { Icon } from 'semantic-ui-react';


class DocumentItem extends Component {
  state = { formOpen: false}
  toggleFormOpen = () => this.setState({formOpen: !this.state.formOpen})

  render() {
    const { myDocument, deleteDocument, updateDocument } = this.props;
    return (
      <div>
        <p>{ myDocument.name }</p>
        <button style={{color:'red'}} onClick={() => deleteDocument(myDocument.id)}><Icon name='trash'/></button>
        <button style={{color:'blue'}} onClick={() => this.toggleFormOpen()}><Icon name='pencil'/></button>
        {
          this.state.formOpen &&
          <DocumentForm {...myDocument}
          update={updateDocument}
          toggleEdit={this.toggleFormOpen}
           />
        }
        <DocumentPages doc_id={myDocument.id}/>
      </div>
    )
  }
}




export default DocumentItem;
