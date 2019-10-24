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
          <Menu.Item>{user.name}</Menu.Item>
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
              id='login'
              name='login'
              active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='register'
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
        <Menu pointing secondary inverted>
          <Link to='/dashboard'>
            <Menu.Item
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
            <Menu.Item
              name='accident'
              id='accident'
              active={this.props.location.pathname === '/accident'}
            />
          </Link>
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
