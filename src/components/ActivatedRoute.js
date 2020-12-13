import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function ActivatedRoute({ component: Component, render, ...rest }) {
  const account = useSelector((state) => state.account);

  if (!account.user) {
    return <Redirect to="/login" />;
  }

  if (account.user.role === 'renter' || (account.user.role === 'owner' && !account.user.activated)) {
    return <Redirect to="/404" />;
  }

  return render ? render({ ...rest }) : <Component {...rest} />;
}

ActivatedRoute.propTypes = {
  component: PropTypes.any,
  render: PropTypes.func
};

export default ActivatedRoute;
