import React, { Component } from 'react';
import { AuthConsumer, } from "../../Providers/AuthProvider";
import Dropzone from 'react-dropzone';

export class DocumentPagesForm extends Component {

  render() {
    return(
      <div>
        <p>hi</p>
      </div>
    )
  }
}

const ConnectedDocPagesForm = (props) => (
  <AuthConsumer>
    { auth => 
      <DocumentPagesForm {...props} auth={auth}/>
    }
  </AuthConsumer>
)

export default ConnectedDocPagesForm;