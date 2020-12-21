import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  colors,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Rate from './Rate';

const useStyles = makeStyles((theme) => ({
  root: {},
  rating: {
    marginLeft: theme.spacing(2),
    fontWeight: theme.typography.fontWeightBold
  },
  rateButton: {
    '&:hover': {
      backgroundColor: colors.blueGrey[500]
    }
  },
  RateReviewIcon: {
    marginRight: theme.spacing(1)
  }
}));

function OverallReviews({
  ratings, getReviews, reviewed, className, ...rest
}) {
  const classes = useStyles();
  const [openRate, setOpenRate] = useState(false);

  const handleRateOpen = () => {
    setOpenRate(true);
  };

  const handleRateClose = () => {
    setOpenRate(false);
    getReviews();
  };
  let rating = 0;

  if (ratings && ratings.length > 0) {
    rating = ratings.reduce((prev, current) => prev + current, 0) / ratings.length;
    rating = Math.round(rating * 10) / 10;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          justify="space-between"
          {...rest}
        >
          {rating ? (
            <Grid item>
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
                    alignItems="center"
                  >
                    <Rating value={rating} precision={0.1} readOnly />
                    <Typography
                      className={classes.rating}
                      variant="h6"
                      color="textPrimary"
                    >
                      {rating}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    className={classes.total}
                    color="textSecondary"
                    variant="body2"
                  >
                    trên tổng số
                    {' '}
                    {ratings.length}
                    {' '}
                    đánh giá
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )
            : (
              <Grid item>
                <Typography
                  variant="h5"
                  color="textPrimary"
                >
                  Chưa có bài đánh giá nào
                </Typography>
              </Grid>
            )}
          <Grid item>
            <Button
              className={classes.inviteButton}
              variant="contained"
              color="primary"
              onClick={handleRateOpen}
              disabled={reviewed}
            >
              <RateReviewIcon className={classes.RateReviewIcon} />
              Đánh giá và nhận xét
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Rate
        onApply={handleRateClose}
        onClose={handleRateClose}
        open={openRate}
      />
    </Card>
  );
}

OverallReviews.propTypes = {
  className: PropTypes.string,
  ratings: PropTypes.array,
  getReviews: PropTypes.func,
  reviewed: PropTypes.bool
};

export default OverallReviews;
