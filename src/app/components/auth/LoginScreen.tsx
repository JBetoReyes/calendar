import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../reducers/authActions';
import useForm from '../../hooks/useForm';
import { IAppUser } from './UserModel';
import { IStoreState } from '../../store/storeModel';
import { AppSubmitEvent } from 'src/typings/htmlEvents';
import './LoginScreen.scss';

type LoginUserType = Pick<IAppUser, 'email'> & {
  password: string,
};

const mapDispatchToProps = {
  startLogin: startLogin
};

type MapDispatchToPropsType = typeof mapDispatchToProps;

type MyProps = Record<string, any>;
type Props = MyProps & MapDispatchToPropsType;

export const LoginScreen = (props: MyProps): JSX.Element => {
  const {formData, handleChange} = useForm<LoginUserType>({
    email: '',
    password: '',
  });
  const {email: loginEmail, password: loginPassword} = formData;
  const {startLogin: dispatchStartLogin} = props as Props;
  const handleLogin = (e: AppSubmitEvent) => {
    e.preventDefault();
    dispatchStartLogin(loginEmail, loginPassword);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="login-container">
          <div className="col-md-6 login-form-1 h-75">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={loginEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name='password'
                  value={loginPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
            </form>
          </div>

          <div className="col-md-6 login-form-2 h-75">
            <h3>Register</h3>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Register"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginScreen.propTypes = {};

export default connect<null, MapDispatchToPropsType, MyProps, IStoreState>(
  null,
  mapDispatchToProps,
)(LoginScreen);
