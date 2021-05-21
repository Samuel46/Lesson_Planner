import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinners from '../layouts/Spinners';


const AuthSchoolRoute = ({
  component: Component,
  authSchool: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
        <Spinners />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

AuthSchoolRoute.propTypes = {
    authSchool: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authSchool: state.authSchool
});

export default connect(mapStateToProps)(AuthSchoolRoute);
