/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {AppClickEvent} from 'src/typings/htmlEvents';
import {IStoreState} from '../../store/storeModel';
import {startLogout} from '../../reducers/authActions';

const mapStateToProps = (state: IStoreState) => {
  return {
    name: state.auth.name,
  };
};

const mapDispatchToProps = {
  startLogout,
};

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchToPropsType = typeof mapDispatchToProps;
type MyProps = Record<string, any>;
type Props = MyProps & MapStateToPropsType & MapDispatchToPropsType;
const Navbar = (props: MyProps): JSX.Element => {
  const {name, startLogout: dispatchLogOut} = props as Props;
  const handleLogout = (e: AppClickEvent) => {
    dispatchLogOut();
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faSignInAlt} /> <span>exit</span>
      </button>
    </div>
  );
};

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  MyProps,
  IStoreState
>(
  mapStateToProps,
  mapDispatchToProps,
)(Navbar);
