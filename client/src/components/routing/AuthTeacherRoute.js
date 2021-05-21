import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinners from '../layouts/Spinners';



const AuthTeacherRoute = ({
  component: Component,
  authTeacher: { isAuthenticated, loading },
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

AuthTeacherRoute.propTypes = {
    authTeacher: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authTeacher: state.authTeacher
});

export default connect(mapStateToProps)(AuthTeacherRoute);
