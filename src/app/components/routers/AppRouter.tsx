/* eslint-disable import/no-named-as-default */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalendarScreen from '../calendar/CalendarScreen';
import LoginScreen from '../auth/LoginScreen';

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
