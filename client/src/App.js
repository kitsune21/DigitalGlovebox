import React from 'react';
import { Switch, Route, } from 'react-router-dom';

import Home from './Components/Shared/Home';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import NoMatch from './Components/Shared/NoMatch';

const App = () => (
  <>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        
        <Route component={NoMatch} />
      </Switch>
    </div>
  </>
)

export default App;
