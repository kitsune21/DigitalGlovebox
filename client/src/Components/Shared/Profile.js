import React, { Component } from 'react';
import { AuthConsumer, } from "../../Providers/AuthProvider";
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { Form, Icon } from "semantic-ui-react";

const FormWrapper = styled.div`
  align: 'center';
  background: #FFFFFF;
  color: #000000;
  width: 600px;
  height: 450px;
  margin-top: 35px;
  margin-bottom: 25px;
  margin-left: 550px;`

class Profile extends Component {
  state = { editing: false, formValues: { name: '', email: '', file: '', }, };

  onDrop = (files) => {
    console.log(files)
    this.setState({ formValues: { ...this.state.formValues, file: files[0], } });
  }

  componentDidMount() {
    const { auth: { user: { name, email, }, }, } = this.props;
    this.setState({ formValues: { name, email, }, });
  }

  toggleEdit = () => {
    this.setState( state => {
      return { editing: !state.editing, };
    })
  }

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formValues: { name, email, file, }, } = this.state;
    const { auth: { user, updateUser, }, } = this.props;
    updateUser(user.id, { name, email, file, });
    this.setState({
      editing: false,
      formValues: {
        ...this.state.formValues,
        file: "",
      },
    });
  }

  profileView = () => {
    const { auth: { user }, } = this.props;
    return (
      <>
        <div>
          <h2 style={{marginLeft: '10px'}}>Name: {user.name}</h2>
          <h2 style={{marginLeft: '10px'}}>Email: {user.email}</h2>
        </div>
      </>
    )
  }

  editView = () => {
    const { formValues: { name, email, } } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            autofocus
            label="Name"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />
          <input
            autofocus
            label="Email"
            name="email"
            value={email}
            required
            onChange={this.handleChange}
          />
          <button>Update</button>
        </div>
      </form>
    )
  }

  render() {
    const { editing, } = this.state;
    return (
      <>
      <FormWrapper> <br /><h1 align='center'>Account Settings</h1>
        <br />
          <div>
            { editing ? this.editView() : this.profileView()}
            <div>
              <button
              onClick={this.toggleEdit}>{
                editing ? <Icon name='cancel'/> : <Icon name='pencil'/>
              }
              </button>
            </div>
          </div>
          </FormWrapper>
      </>
    )
  }
}

// const styles = {
//   dropzone: {
//     height: "50px",
//     width: "50px",
//     border: "1px dashed black",
//     borderRadius: "5px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "10px",
//   },
// }

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth =>
      <Profile { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProfile;
