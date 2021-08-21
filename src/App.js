import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import PublicRoutes from './Components/Routes/PublicRoutes';
import BackofficeRoutes from './Components/Routes/BackofficeRoutes';

function App() {
  return (
    <Router>
      <AnimatedSwitch
        atActive={{ opacity: 1 }}
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        className="switch-wrapper"
      >
        <Route component={BackofficeRoutes} path="/backoffice" />
        <Route component={PublicRoutes} path="/" />
      </AnimatedSwitch>
    </Router>
  );
}

export default App;
