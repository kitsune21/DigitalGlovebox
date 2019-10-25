import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import DocumentList from './DocumentList'
import DocumentForm from './DocumentForm';
import ConnectedDocPagesFrom from './DocumentPages/DocumentPagesForm';
import styled from 'styled-components'
import { Icon, Modal, Button, Header } from 'semantic-ui-react';

const Container = styled.div`
  background-color: white;
  padding: 10px;
  color: black;
  margin: auto;
  overflow: scroll;
  height: auto;
  min-height: 1500px;
  max-height: 100%;
  width: 85%;
`

const One = styled.div`
  width: 30%;
  float: left;
`

const Two = styled.div`
  margin-left: 30%;
  float: left;
`

class Documents extends Component {
  state = {documents: [],
            document_types: [],
            addPages: false,
            addPagesDocID: 0,
            addDocModal: false,  
          }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  componentDidMount(){
    const { auth: { user } } = this.props

    if (user)
    {
      axios.get(`/api/users/${user.id}/documents`)
      .then( res => {
      this.setState({documents: res.data})
      })
    }

    this.setState({user_id: user.id});
  }

  addDocument = (doc) => {
    const document = {name: doc.name, document_type_id: doc.doc_type_id}
    axios.post(`/api/users/${this.state.user_id}/documents`, { document })
      .then( res => {
        const { documents } = this.state;
        this.setState({ documents: [...documents, res.data], addPagesDocID: res.data.id})
        this.setAddPages();
      })
      .catch( res => {
        console.log(res)
      })
  }

  setAddPages = () => {
    this.setState({addPages: !this.state.addPages})
  }

  renderAddPages = () => {
    return (
      <ConnectedDocPagesFrom
        document_id={this.state.addPagesDocID}
        setAddPages={this.setAddPages}
        toggleModal={this.toggleAddDocModal}
      />
    )
  }

  toggleAddDocModal = () => {
    this.setState({ addDocModal: !this.state.addDocModal})
  }

  deleteDocument = (id, doc) => {
    axios.delete(`/api/users/${this.state.user_id}/documents/${id}`, doc)
      .then( res => {
        const { documents } = this.state;
        this.setState({ documents: documents.filter(d => d.id !== id) })
      })
   }

   updateDocument = (id, doc) => {
    axios.put(`/api/users/${this.state.user_id}/documents/${id}`, {document: doc})
      .then( res => {
        const documents = this.state.documents.map( d => {
          if (d.id === id)
            return res.data;
          return d;
        });
        this.setState({ documents });
    })
  }

	render() {
    const { auth: { user } } = this.props;
		return(
      <div>
        <Container>
          <One>
            <Modal
              trigger={<Button onClick={this.toggleAddDocModal}><Icon name='plus circle'/>   Add Document</Button>}
              open={this.state.addDocModal}
              onClose={this.toggleAddDocModal}
              closeIcon
            >
              <Modal.Header>Add Document</Modal.Header>
              <Modal.Content>
              {
                this.state.addPages ?
                  this.renderAddPages()
                :
                  <DocumentForm user_id={user.id} add={this.addDocument}/>
              }
              </Modal.Content>
            </Modal>
          </One>
          <Two>
            <Header>Documents</Header>
            <p>Upload and store all of your car-related documents, including insurance, registration and service records.</p>
            <DocumentList
              document_types={this.state.document_types}
              documents={this.state.documents}
              deleteDocument={this.deleteDocument}
              updateDocument={this.updateDocument}
            />
          </Two>
        </Container>
      </div>
    )
    }
}

export class ConnectedDocuments extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <Documents { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedDocuments);
