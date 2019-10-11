import React, { Component } from 'react';

class DocumentType extends Component {

  state = { doc_types: [] }

  componentDidMount(){
    axios.get(`api/user/${user.id}/document_types`)
    .then( res => { this.setState(res.data)})
  }

	render() {
		return(
      console.log(res.data)
    )
	}

}

export default DocumentType;
