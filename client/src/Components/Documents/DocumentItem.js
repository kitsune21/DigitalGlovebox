import React from 'react';
import DocumentPages from './DocumentPages/DocumentPages';

const DocumentItem = ({ myDocument, deleteDocument }) => (
  <div>
    <p>{ myDocument.name }</p>
    <button onClick={() => deleteDocument(myDocument.id)}>Delete</button>
    <DocumentPages doc_id={myDocument.id}/>
  </div>
)

export default DocumentItem;
