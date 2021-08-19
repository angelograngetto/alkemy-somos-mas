import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PublicRoutes from './Components/Routes/PublicRoutes';
import BackofficeRoutes from './Components/Routes/BackofficeRoutes';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={BackofficeRoutes} path="/backoffice" />
        <Route component={PublicRoutes} path="/" />
      </Switch>
    </Router>
  );
}

export default App;
