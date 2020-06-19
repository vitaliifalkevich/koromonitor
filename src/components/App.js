import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Global from './Global';
import Settings from './Settings';
import ByCountry from './ByCountry';
import Statistic from './Statistic';

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Global} />
          <Route path="/settings" component={Settings} />
          <Route path="/country/:countryName" component={ByCountry} />
          <Route path="/statistic/:countryName" component={Statistic} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
