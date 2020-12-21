/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import axios from 'src/utils/axios';

export const labels = {
  1: 'Ghét',
  2: 'Không thích',
  3: 'Chỉ OK',
  4: 'Thích',
  5: 'Rất thích',
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  rating: {
    paddingLeft: 10,
    paddingTop: 3.5
  }
}));

function Rate({
  open,
  onClose,
  onApply,
  className,
  ...rest
}) {
  const classes = useStyles();
  const [rating, setRating] = useState(4);
  const [message, setMessage] = useState('');
  const [hover, setHover] = React.useState(-1);
  const { enqueueSnackbar } = useSnackbar();
  const { pid } = useParams();
  const account = useSelector((state) => state.account);

  const handleApply = () => {
    axios
      .post(`${process.env.REACT_APP_API}/places/${pid}/review`, {
        review: {
          creator: account.user.id,
          rating,
          message
        }
      })
      .then(() => enqueueSnackbar('Đánh giá thành công', {
        variant: 'success'
      }))
      .catch((err) => enqueueSnackbar('Không thể đánh giá', {
        variant: 'error'
      }))
      .finally(() => onApply());
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
                <Rating
                  name="hover-feedback"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <TextField
            autoFocus
            fullWidth
            label="Nhận xét"
            multiline
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Bạn nghĩ gì về căn phòng này?"
            rows={6}
            value={message}
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
