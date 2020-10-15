import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from '../auth/LoginScreen';
import CalendarScreen from '../calendar/CalendarScreen';

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <div className="router-wrapper">
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/" component={CalendarScreen} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
