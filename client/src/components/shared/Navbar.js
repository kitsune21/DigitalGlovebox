import React from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { AuthConsumer } from '../../Providers/AuthProvider';

class Navbar extends React.Component{

  renderLoginRegisterLink = () => {
    return(
      <li><Link to='/login' >Login</Link>/<Link to='/register'>Register</Link></li>
    )
  }

  render() {
    const { auth: { user, handleLogout, }, } = this.props;
    return (
      <div>
        <h1>Digital Glovebox</h1>
        <ul>
          <li><Link to='/dashboard'>Dashboard</Link></li>
          <li><Link to='/documents'>Documents</Link></li>
          <li>Contact Us</li>
          {
            user ? <li><Link to='/profile'>{user.name}</Link><button onClick={ () => handleLogout(this.props.history) }>Logout</button></li> : this.renderLoginRegisterLink()
          }
          
        </ul>
      </div>
    );
  }
}

export class ConnectedNavbar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <Navbar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavbar);