import React, { Component } from 'react';
import DocumentItem from './DocumentItem';
import axios from 'axios';
import ConnectedDocumentTypes from './UserDocumentTypes';
import { Card, Tab } from 'semantic-ui-react';

class DocumentList extends Component {

  state = {document_types: [],
          custom_doc_types: [],
          activeIndex: 0,
          }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  componentDidMount() {
    this.pullDocTypes();
  }

  pullDocTypes = () => {
    axios.get(`/api/users/1/document_types`)
      .then( res => {
        this.setState({document_types: res.data})
      })
  }

  renderTabs = () => {
    let panes = this.state.document_types.map( type => {
      return({
        menuItem: type.name,
        render: () => <Tab.Pane attached={false}>{
          this.renderDocs(type.id).map( doc =>
         <Card key={doc.id} style={{width: "100%"}}>
          <DocumentItem
          myDocument={doc}
          deleteDocument={this.props.deleteDocument}
          updateDocument={this.props.updateDocument}
          />
        </Card>)
        }</Tab.Pane>
      })
    })
    panes.push({menuItem: 'Others', render: () => <Tab.Pane attached={false}><ConnectedDocumentTypes documents={this.props.documents}/></Tab.Pane>})
    return panes;
  }

  renderDocs = (id) => {
    let myDocs = [];
    this.props.documents.forEach( doc => {
      if(doc.document_type_id === id) {
        myDocs.push(doc);
      }
    })
    return(
      myDocs
    )
  }

  render() {
    return(
      <div>
        <Tab menu={{ secondary: true, pointing: true }} panes={this.renderTabs()} />
      </div>
    )
  }
}

export default DocumentList;
