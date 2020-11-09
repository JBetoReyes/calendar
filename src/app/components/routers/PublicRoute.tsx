import React from 'react';
import { InferableComponentEnhancerWithProps } from 'react-redux';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { IStoreState } from 'src/app/store/storeModel';

export type MyProps = {
  isAuthenticated: boolean,
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export type Props = MyProps & RouteProps;

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}: Props): JSX.Element => {
  const componentSwitch = (props: RouteComponentProps) => {
    return !isAuthenticated ? (
      <Component {...props} />
    ) : <Redirect to="/" />;
  }
  return (
    <Route {...rest} component={componentSwitch} />
  );
}

export default PublicRoute;
