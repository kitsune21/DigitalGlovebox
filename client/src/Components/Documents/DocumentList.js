import React, { Component } from 'react';
import DocumentItem from './DocumentItem';
import axios from 'axios';
import { Card, Accordion, Icon } from 'semantic-ui-react';

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

  renderDocTypes = () => {
    const { activeIndex } = this.state
    return(
      this.state.document_types.map( type =>
        <div key={type.id} >
        <Accordion>
          <Accordion.Title
           active={activeIndex === 0}
           index={0}
           onClick={this.handleClick}
         >
           <h2>
             <Icon name='dropdown' />
             {type.name}
           </h2>
         </Accordion.Title>
         <Accordion.Content active={activeIndex === 0}>
           {
             this.renderDocs(type.id).map( doc =>
            <Card key={doc.id} style={{width: "500px", height: '500px'}}>
             <DocumentItem
             myDocument={doc}
             deleteDocument={this.props.deleteDocument}
             updateDocument={this.props.updateDocument}
             />
           </Card>)
           }
         </Accordion.Content>
        </Accordion>
        </div>
      )
    )
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
        {this.renderDocTypes()}
      </div>
    )
  }
}

export default DocumentList;
