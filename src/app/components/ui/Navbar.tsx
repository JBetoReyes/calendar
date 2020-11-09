import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { IStoreState } from '../../store/storeModel';

const mapStateToProps = (state: IStoreState) => {
  return {
    name: state.auth.name
  };
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MyProps = Record<string, any>;
type Props = MyProps & MapStateToPropsType;
const Navbar = (props: MyProps): JSX.Element => {
  const { name } = props as Props;
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <button type="button" className="btn btn-outline-danger">
        <FontAwesomeIcon icon={faSignInAlt} /> <span>exit</span>
      </button>
    </div>
  );
};

export default connect<MapStateToPropsType, null, MyProps, IStoreState>(mapStateToProps)(Navbar);
