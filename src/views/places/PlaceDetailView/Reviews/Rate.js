import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Alert, Rating } from '@material-ui/lab';
import {
  Box,
  Button,
  Dialog,
  TextField,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  helperText: {
    textAlign: 'right',
    marginRight: 0
  }
}));

function Rate({
  author,
  open,
  onClose,
  onApply,
  className,
  ...rest
}) {
  const rating = 4;
  const [value, setValue] = useState('');
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleApply = () => {
    enqueueSnackbar('Request sent', {
      variant: 'success'
    });
    onApply();
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <div
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Typography
          align="center"
          className={classes.title}
          gutterBottom
          variant="h3"
          color="textPrimary"
        >
          Viết nhận xét và đánh giá
        </Typography>
        <Alert
          severity="info"
        >
          <Typography
            align="center"
            variant="subtitle2"
            color="textSecondary"
          >
            Viết nhận xét và đánh giá về bài viết để hữu ích cho nhưng người xem sau
          </Typography>
        </Alert>
        <Box mt={3} mb={3}>
          <Grid
            alignItems="center"
            container
            spacing={3}
          >
            <Grid item>
              <Typography
                variant="h5"
                color="textPrimary"
              >
                Đánh giá
              </Typography>
            </Grid>
            <Grid item>
              <Box
                display="flex"
              >
                <Rating value={rating} />
                <Typography
                  className={classes.rating}
                  variant="h6"
                  color="textPrimary"
                  style={{ paddingLeft: 10, paddingTop: 3.5 }}
                >
                  {rating}
                  {' '}
                  / 5
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <TextField
            autoFocus
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            fullWidth
            helperText={`${300 - value.length} kí tự còn lại`}
            label="Nhận xét"
            multiline
            onChange={handleChange}
            placeholder="Bạn nghĩ gì về căn phòng này?"
            rows={6}
            value={value}
            variant="outlined"
          />
        </Box>
        <Box
          mt={3}
          p={3}
        >
          <Button
            onClick={handleApply}
            variant="contained"
            fullWidth
            color="primary"
          >
            Hoàn tất
          </Button>
        </Box>
      </div>
    </Dialog>
  );
}

Rate.propTypes = {
  author: PropTypes.object.isRequired,
  className: PropTypes.string,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

Rate.defaultProps = {
  onApply: () => {},
  onClose: () => {}
};

export default Rate;
