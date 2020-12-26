/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  makeStyles
} from '@material-ui/core';
import ImageViewer from 'react-simple-image-viewer';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  helperText: {
    textAlign: 'right',
    marginRight: 0
  }
}));

function ImageView({
  images,
  open,
  onClose,
  onApply,
  className,
  ...rest
}) {
  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <ImageViewer
        src={images}
        currentIndex={0}
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: 'transparent'
        }}
      />
    </Dialog>
  );
}

ImageView.propTypes = {
  className: PropTypes.string,
  images: PropTypes.array,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

ImageView.defaultProps = {
  onApply: () => {},
  onClose: () => {}
};

export default ImageView;
