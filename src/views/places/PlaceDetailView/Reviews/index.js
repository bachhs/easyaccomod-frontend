import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import OverallReviews from './OverallReviews';
import ReviewCard from './ReviewCard';

const useStyles = makeStyles((theme) => ({
  root: {},
  review: {
    marginTop: theme.spacing(2)
  }
}));

function Reviews({ className, ...rest }) {
  const classes = useStyles();
  const { pid } = useParams();
  const isMountedRef = useIsMountedRef();
  const [reviews, setReviews] = useState(null);
  let reviewed = false;

  const getReviews = useCallback(() => {
    if (isMountedRef.current) {
      axios
        .get(`${process.env.REACT_APP_API}/places/${pid}/review`)
        .then((response) => {
          setReviews(response.data.reviews);
        });
    }
  }, [isMountedRef]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <OverallReviews
        getReviews={getReviews}
        ratings={reviews ? reviews.map((review) => {
          if (review.creator.id === '5fcc32b365f2eb1d40e22c9c') {
            reviewed = true;
          }
          return review.rating;
        }) : null}
        reviewed={reviewed}
      />
      {reviews && reviews.map((review) => (
        <ReviewCard
          className={classes.review}
          key={review.id}
          review={review}
        />
      ))}
    </div>
  );
}

Reviews.propTypes = {
  className: PropTypes.string,
};

export default Reviews;
