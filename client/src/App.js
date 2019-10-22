import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import Navbar from './Components/Shared/Navbar';
import Home from './Components/Shared/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Profile from './Components/Shared/Profile';
import NoMatch from './Components/Shared/NoMatch';
import ConnectedDocuments from './Components/Documents/Documents';
import FetchUser from './Components/Auth/FetchUser';
import { ConnectedDashboard } from './Components/Dashboard/dashboard';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: #000000;
  color: #ffffff;
  height: 100%;
`

const App = () => (
  <>
  <AppContainer>
    <div>
      <FetchUser>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/dashboard" component={ConnectedDashboard} />
          <ProtectedRoute exact path="/documents" component={ConnectedDocuments} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
      </FetchUser>
    </div>

    </AppContainer>
  </>
)

export default App;
