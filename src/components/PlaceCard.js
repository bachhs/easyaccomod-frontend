import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  VisibilityIcon: {
    marginRight: theme.spacing(1),
    opacity: 0.75
  },
  box: {
    height: 100
  }
}));

function PlaceCard({ place, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box p={3}>
        <CardMedia
          className={classes.media}
          image={place.image}
        />
        <Box
          display="flex"
          alignItems="center"
          mt={2}
        >
          <Avatar
            alt="Author"
            src={place.creator.avatar}
          >
            {getInitials(place.creator.name)}
          </Avatar>
          <Box ml={2}>
            <Link
              color="textPrimary"
              component={RouterLink}
              to={`/places/${place.id}`}
              variant="h4"
            >
              {place.title}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              đăng bởi
              {' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to={`/users/${place.creator.id}`}
                variant="h6"
              >
                {place.creator.username}
              </Link>
              {' '}
              | Đăng lúc
              {' '}
              {moment(place.createdDate).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        pb={1}
        px={3}
        className={classes.box}
      >
        <Typography
          color="textPrimary"
          variant="subtitle2"
          style={{ marginBottom: 6, fontSize: 15 }}
        >
          Địa chỉ :
          {' '}
          {place.address}
        </Typography>
        <Typography
          color="textPrimary"
          variant="body2"
        >
          {place.description.slice(0, 138)}
        </Typography>
      </Box>
      <Box
        py={2}
        px={3}
      >
        <Grid
          alignItems="center"
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              Giá phòng
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
            >
              {place.price}
              {' '}
              VND
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              Loại phòng
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
            >
              {place.type}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              Diện tích
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
            >
              {place.area}
              {' '}
              m
              <sup>2</sup>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box
        py={2}
        pl={2}
        pr={3}
        display="flex"
        alignItems="center"
      >
        <VisibilityIcon className={clsx(classes.VisibilityIcon, className)} fontSize="small" />
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {place.views}
        </Typography>
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {place.subscribers}
        </Typography>
        <Box flexGrow={1} />
        <Rating
          precision={0.1}
          value={place.star}
          size="small"
          readOnly
        />
      </Box>
    </Card>
  );
}

PlaceCard.propTypes = {
  className: PropTypes.string,
  place: PropTypes.object.isRequired
};

export default PlaceCard;
