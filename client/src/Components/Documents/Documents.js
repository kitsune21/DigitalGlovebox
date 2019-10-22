import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import { withRouter, } from 'react-router-dom';
import DocumentList from './DocumentList'
import ConnectedDocumentTypes from './UserDocumentTypes';
import DocumentForm from './DocumentForm';
import ConnectedDocPagesFrom from './DocumentPages/DocumentPagesForm';
import styled from 'styled-components'
import { Card, Accordion, Icon } from 'semantic-ui-react';

const Container = styled.div`
  background-color: white;
  padding: 10px;
  color: black;
  margin: auto;
  overflow: hidden;
`

const One = styled.div`
  width: 30%;
  float: left;
`

const Two = styled.div`
  margin-left: 30%;
`

const Underlined = styled.h1`
  text-decoration: underline;
`

class Documents extends Component {
  state = {documents: [],
            document_types: [],
            addPages: false,
            addPagesDocID: 0,
            activeIndex: 0 }

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
      />
    )
  }

  deleteDocument = (id, doc) => {
    axios.delete(`/api/users/${this.state.user_id}/documents/${id}`, doc)
      .then( res => {
        const { documents } = this.state;
        this.setState({ documents: documents.filter(d => d.id !== id) })
      })
   }

   updateDocument = (id, doc) => {
     console.log(doc)
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
    const { activeIndex } = this.state
    const { auth: { user } } = this.props;
		return(
      <div>
        <Container>
        <One>
        {
          this.state.addPages ?
            this.renderAddPages()
          :
            <DocumentForm user_id={user.id} add={this.addDocument}/>
        }
        </One>
        <Two>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Underlined>
                <Icon name='dropdown' />
                My Documents
              </Underlined>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <DocumentList
              document_types={this.state.document_types}
              documents={this.state.documents}
              deleteDocument={this.deleteDocument}
              updateDocument={this.updateDocument}
              />
            </Accordion.Content>
            <Accordion.Title
               active={activeIndex === 1}
               index={1}
               onClick={this.handleClick}
             >
               <Underlined>
                 <Icon name='dropdown' />
                 Custom Document Types
               </Underlined>
             </Accordion.Title>
             <Accordion.Content active={activeIndex === 1}>
               <ConnectedDocumentTypes documents={this.state.documents}/>
             </Accordion.Content>
          </Accordion>
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
