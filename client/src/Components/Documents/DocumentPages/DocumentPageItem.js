import React from 'react';

const DocumentPageItem = ({page, deletePage}) => (
  <div>
    <img width='200px' src={page.front_img} alt='page' />
    <button onClick={() => deletePage(page.id)}>Delete</button>
  </div>
)

export default DocumentPageItem;