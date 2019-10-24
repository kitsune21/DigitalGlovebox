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
          <Link to=' /service'>
            <Menu.Item
              name='service records'
              id='service records'
            />
            </Link>
          <Link to='/contact'>
            <Menu.Item
              name='contact us'
              id='contact'
              active={location.pathname === '/contact'}
            />
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
          <Link to='/dashboard'>
            <Menu.Item
              position='right'
              name='dashboard'
              id='dashboard'
              active={this.props.location.pathname === '/'}
            />
          </Link>
          <Link to='/documents'>
            <Menu.Item
              position='right'
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
          <Link to='/contact'>
            <Menu.Item
              position='right'
              name='contact us'
              id='contact'
              active={this.props.location.pathname === '/contact'}
            />
          </Link>
          <Link to='/profile'>
            <Menu.Item
              position='right'
              name='profile'
              id='profile'
              active={location.pathname === '/profile'}
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
