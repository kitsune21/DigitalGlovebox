import React from 'react';
import DocumentItem from './DocumentItem';

const DocumentList = ({documents}) => (
  <div>
    {
      documents.map(doc =>
        <DocumentItem
          myDocument={doc}
          key={doc.id}
      />
    )
  }
  </div>
)

export default DocumentList;
