/* eslint-disable import/no-named-as-default */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CalendarScreen from '../calendar/CalendarScreen';
import LoginScreen from '../auth/LoginScreen';
import {renewToken} from '../../reducers/authActions';
import { connect } from 'react-redux';
import { IStoreState } from 'src/app/store/storeModel';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const stateToProps = (state: IStoreState) => {
  return {
    checking: state.auth.checking,
    uid: state.auth.uid,
  }
}
const dispatchToProps = {
  renewToken,
};
type DispatchToPropsType = typeof dispatchToProps;
type StateToPropsType = ReturnType<typeof stateToProps>;
type MyProps = Record<string, any>;
type Props = MyProps & DispatchToPropsType & StateToPropsType;
const AppRouter = (props: MyProps): JSX.Element => {
  const {renewToken: dispatchRenewToken} = props as Props;
  const {checking, uid} = props as Props;
  useEffect(() => {
    dispatchRenewToken();
  }, [dispatchRenewToken]);
  return (
    <Router>
      <div className="router-wrapper">
        <Switch>
          <PublicRoute isAuthenticated={!!uid} exact path="/login" component={LoginScreen} />
          <PrivateRoute isAuthenticated={!!uid} exact path="/" component={CalendarScreen as any} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect<StateToPropsType, DispatchToPropsType, MyProps, IStoreState>(
  stateToProps,
  dispatchToProps
)(AppRouter);
