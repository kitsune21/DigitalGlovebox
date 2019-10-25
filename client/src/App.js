import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import Navbar from './Components/Shared/Navbar';
import Home from './Components/Shared/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Profile from './Components/Shared/Profile';
import Footer from './Components/Shared/Footer';
import NoMatch from './Components/Shared/NoMatch';
import ConnectedDocuments from './Components/Documents/Documents';
import FetchUser from './Components/Auth/FetchUser';
import { ConnectedDashboard } from './Components/Dashboard/dashboard';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import AfterAnAccident from './Components/Shared/AfterAnAccident';
import styled from 'styled-components';

const AppContainer = styled.div`
  background: #1C2226;
  color: #ffffff;
  width: 100%;
  height: 100vh;`

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
          <ProtectedRoute exact path="/accident" component={AfterAnAccident} />
          <Route component={NoMatch} />
        </Switch>
      </FetchUser>
    </div>
    </AppContainer>
    <Footer />
  </>
)

export default App;
