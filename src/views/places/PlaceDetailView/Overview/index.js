import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Grid,
  makeStyles
} from '@material-ui/core';
import Brief from './Brief';
import Holder from './Holder';
import ImageView from './ImageView';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Overview({
  place, creator, className, ...rest
}) {
  const classes = useStyles();
  const [openImage, setOpenImage] = useState(false);
  const handleImageOpen = () => {
    setOpenImage(true);
  };

  const handleImageClose = () => {
    setOpenImage(false);
  };

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
        <Brief
          place={place}
          handleImageOpen={handleImageOpen}
        />
        <ImageView
          images={place.images}
          author={place.creator}
          onApply={handleImageClose}
          onClose={handleImageClose}
          open={openImage}
        />
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
        <Box>
          <Holder creator={creator} />
        </Box>
      </Grid>
    </Grid>
  );
}

Overview.propTypes = {
  className: PropTypes.string,
  place: PropTypes.object.isRequired,
  creator: PropTypes.object.isRequired
};

export default Overview;
