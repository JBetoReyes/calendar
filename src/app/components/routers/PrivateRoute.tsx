import React from 'react';
import {Redirect, Route, RouteComponentProps, RouteProps} from 'react-router-dom';

export type MyProps = {
  isAuthenticated: boolean;
  component: React.ComponentType<RouteComponentProps>
}

export type Props = MyProps & RouteProps;

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: Props): JSX.Element => {
  if (rest.location) {
    localStorage.setItem('lastPath', rest.location.pathname);
  }
  const componentSwitch = (props: RouteComponentProps) => {
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to='/auth/login'/>
    );
  }
  return <Route {...rest} component={componentSwitch} />
}

export default PrivateRoute;
