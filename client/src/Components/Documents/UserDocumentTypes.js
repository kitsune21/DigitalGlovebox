import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from '../../Providers/AuthProvider';
import { withRouter, } from 'react-router-dom';


class UserDocumentTypes extends Component {
  state = { document_types: []}

  componentDidMount(){
    const { auth: { user } } = this.props

    if (user)
    {
      axios.get(`/api/users/${user.id}/document_types`)
      .then( res => {
      this.setState({document_types: res.data})
      })
    }
  }

	render() {
    const { document_types } = this.state
		return(
      document_types.map( type =>
        <div key={type.id} >
          <p>{type.name}</p>
        </div>
      )
    )
	}
}

export class ConnectedDocumentTypes extends Component {
  render() {
    return (
      <AuthConsumer>
        { auth =>
          <UserDocumentTypes { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedDocumentTypes);
