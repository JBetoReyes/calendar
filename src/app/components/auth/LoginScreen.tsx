/* eslint-disable prettier/prettier */
import React from 'react';
import Swal from 'sweetalert2';
import {connect} from 'react-redux';
import {AppSubmitEvent} from '../../../typings/htmlEvents';
import {startLogin, startRegister} from '../../reducers/authActions';
import useForm from '../../hooks/useForm';
import {IStoreState} from '../../store/storeModel';
import './LoginScreen.scss';

type LoginUserType = {
  lEmail: string;
  lPassword: string;
};

type RegisterUserType = {
  rName: string;
  rEmail: string;
  rPassword: string;
  rConfirmPassword: string;
};

const mapDispatchToProps = {
  startLogin,
  startRegister,
};

type MapDispatchToPropsType = typeof mapDispatchToProps;

type MyProps = Record<string, any>;
type Props = MyProps & MapDispatchToPropsType;

export const LoginScreen = (props: MyProps): JSX.Element => {
  const {formData: formDataLogin, handleChange: handleLoginChange} = useForm<
  LoginUserType
  >({
    lEmail: '',
    lPassword: '',
  });
  const {lEmail, lPassword} = formDataLogin;
  const {
    formData: formDataRegister,
    handleChange: handleRegisterChange,
  } = useForm<RegisterUserType>({
    rName: '',
    rEmail: '',
    rPassword: '',
    rConfirmPassword: '',
  });
  const {rName, rEmail, rPassword, rConfirmPassword} = formDataRegister;
  const {
    startLogin: dispatchStartLogin,
    startRegister: dispatchStartRegister,
  } = props as Props;
  const handleLogin = (e: AppSubmitEvent) => {
    e.preventDefault();
    dispatchStartLogin(lEmail, lPassword);
  };
  const handelRegister = (e: AppSubmitEvent) => {
    e.preventDefault();
    if (rPassword === rConfirmPassword) {
      dispatchStartRegister(rName, rEmail, rPassword);
    } else {
      Swal.fire('Error', 'Password should match.', 'error');
    }
  };
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
                  name="lEmail"
                  value={lEmail}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="lPassword"
                  value={lPassword}
                  onChange={handleLoginChange}
                />
              </div>
              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
            </form>
          </div>

          <div className="col-md-6 login-form-2 h-75">
            <h3>Register</h3>
            <form onSubmit={handelRegister}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="rName"
                  value={rName}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="rEmail"
                  value={rEmail}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="rPassword"
                  value={rPassword}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  name="rConfirmPassword"
                  value={rConfirmPassword}
                  onChange={handleRegisterChange}
                />
              </div>

              <div className="form-group">
                <input type="submit" className="btnSubmit" value="Register" />
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
