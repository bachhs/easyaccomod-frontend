import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 64,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

function Toolbar({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Tin nhắn
      </Typography>
    </div>
  );
}

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
