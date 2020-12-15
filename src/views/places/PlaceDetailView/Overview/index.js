import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import Brief from './Brief';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Overview({ place, className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
        <Brief place={place} />
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      />
    </Grid>
  );
}

Overview.propTypes = {
  className: PropTypes.string,
  place: PropTypes.object.isRequired
};

export default Overview;
