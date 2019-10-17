import React from 'react';
import DocumentPages from './DocumentPages/DocumentPages';

const DocumentItem = ({ myDocument }) => (
  <div>
    <p>{ myDocument.name }</p>
    <DocumentPages doc_id={myDocument.id}/>
  </div>
)

export default DocumentItem;
