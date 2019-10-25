import React from 'react';
import { Link, withRouter, } from 'react-router-dom';
import { AuthConsumer } from '../../Providers/AuthProvider';
import { Menu } from 'semantic-ui-react';

class Navbar extends React.Component {

  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;

    if (user) {
      return (
        <Menu.Menu position='right'>
          <Link to='/dashboard'>
            <Menu.Item
              width="50px"
              name='dashboard'
              id='dashboard'
              active={this.props.location.pathname === '/'}
            />
          </Link>
          <Link to='/documents'>
            <Menu.Item
              name='documents'
              id='documents'
              active={this.props.location.pathname === '/documents'}
            />
          </Link>
          <Link to='/accident'>
            <Menu.Item>
              Accident
            </Menu.Item>
          </Link>
          <Link to='profile'>
            <Menu.Item>
              {user.name}
            </Menu.Item>
          </Link>
          <Menu.Item
            name='logout'
            onClick={ () => handleLogout(this.props.history) }
          />
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              position='right'
              name='login'
              id='login'
              active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              position='right'
              name='register'
              id='register'
              active={location.pathname === '/register'}
            />
          </Link>
          
        </Menu.Menu>
      )
    }
  }

  render() {
    return (
      <div>
        <Menu inverted background='#1C2226;'>
          <h1>Digital Glovebox</h1>
          { this.rightNavItems() }
        </Menu>
      </div>
    )
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
