import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import getInitials from 'src/utils/getInitials';
import { labels } from './Rate';

const useStyles = makeStyles((theme) => ({
  root: {},
  rating: {
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold
  }
}));

function ReviewCard({ review, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        avatar={(
          <Avatar
            alt="Reviewer"
            className={classes.avatar}
            src={review.creator.avatar}
          >
            {getInitials(review.creator.username)}
          </Avatar>
        )}
        disableTypography
        subheader={(
          <Box
            flexWrap="wrap"
            display="flex"
            alignItems="center"
          >
            <Box
              display="flex"
              alignItems="center"
              mr={1}
            >
              <Rating value={review.rating} readOnly />
              <Typography
                className={classes.rating}
                variant="h6"
              >
                {review.rating}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              | Đăng bởi
              {' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to={`/users/${review.creator.id}`}
                variant="h6"
              >
                {review.creator.username}
              </Link>
              {' '}
              |
              {' '}
              {moment(review.createdAt).fromNow()}
            </Typography>
          </Box>
        )}
        title={(
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {labels[review.rating]}
          </Typography>
        )}
      />
      <Box
        pb={2}
        px={3}
      >
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {review.message}
        </Typography>
      </Box>
    </Card>
  );
}

ReviewCard.propTypes = {
  className: PropTypes.string,
  review: PropTypes.object.isRequired
};

export default ReviewCard;
