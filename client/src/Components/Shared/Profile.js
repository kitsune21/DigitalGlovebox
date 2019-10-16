import React, { Component } from 'react';
import { AuthConsumer, } from "../../Providers/AuthProvider";
import Dropzone from 'react-dropzone';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class Profile extends Component {
  state = { editing: false, formValues: { name: '', email: '', file: '', }, };

  onDrop = (files) => {
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
          <img width='25%' alt='Pretty' src={user.image || defaultImage} />
        </div>
        <div>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
        </div>
      </>
    )
  }
  
  editView = () => {
    const { auth: { user }, } = this.props;
    const { formValues: { name, email, file, } } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <Dropzone
            onDrop={this.onDrop}
            multiple={false}
          >
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <div
                  {...getRootProps()}
                  style={styles.dropzone}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop files here...</p> :
                      <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div>
              )
            }}
          </Dropzone>
        </div>
        <div>
          <input
            label="Name"
            name="name"
            value={name}
            required
            onChange={this.handleChange}
          />
          <input
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
        <br />
        <div>
          <div>
            { editing ? this.editView() : this.profileView()}
            <div>
              <button onClick={this.toggleEdit}>{editing ? 'Cancel' : 'Edit'}</button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}

const ConnectedProfile = (props) => (
  <AuthConsumer>
    { auth => 
      <Profile { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedProfile;