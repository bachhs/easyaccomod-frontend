import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button, makeStyles } from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import OverallReviews from './OverallReviews';
import ReviewCard from './ReviewCard';
import Rate from './Rate';

const useStyles = makeStyles((theme) => ({
  root: {},
  review: {
    marginTop: theme.spacing(2)
  }
}));

function Reviews({ className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [reviews, setReviews] = useState(null);
  const [openRate, setOpenRate] = useState(false);

  const handleRateOpen = () => {
    setOpenRate(true);
  };

  const handleRateClose = () => {
    setOpenRate(false);
  };

  const getReviews = useCallback(() => {
    const mock = [
      {
        id: '5e887f7404ed12e9afb71841',
        rating: 4,
        message: 'Shen was really great during the all time session we created the project',
        reviewer: {
          id: '5e887a62195cc5aef7e8ca5d',
          name: 'Ekaterina Tankova',
          avatar: '/static/images/avatars/avatar_2.png'
        },
        project: {
          title: 'Mella Full Screen Slider',
          price: '5,240.00'
        },
        pricePerHour: '43.00',
        hours: 31,
        currency: '$',
        createdAt: new Date(),
      },
      {
        id: '5e887f7b91b9b5330c49a318',
        rating: 5,
        reviewer: {
          id: '5e887ac47eed253091be10cb',
          name: 'Cao Yu',
          avatar: '/static/images/avatars/avatar_3.png'
        },
        project: {
          title: 'Dashboard Design',
          price: '3,680.00'
        },
        pricePerHour: '38.00',
        hours: 76,
        currency: '$',
        message: 'Being the savage\'s bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale\'s back. You have seen Italian organ-boys holding a dancing-ape by a long cord. Just so, from the ship\'s steep side, did I hold Queequeg down there in the sea, by what is technically called in the fishery a monkey-rope, attached to a strong strip of canvas belted round his waist.',
        createdAt: new Date(),
      }
    ];
    setReviews(mock);
  }, [isMountedRef]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  if (!reviews) {
    return null;
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <OverallReviews ratings={reviews.map((review) => review.rating)} />
      <Button onClick={handleRateOpen}>Rate</Button>
      {reviews.map((review) => (
        <ReviewCard
          className={classes.review}
          key={review.id}
          review={review}
        />
      ))}
      <Rate
        onApply={handleRateClose}
        onClose={handleRateClose}
        open={openRate}
      />
    </div>
  );
}

Reviews.propTypes = {
  className: PropTypes.string,
};

export default Reviews;
