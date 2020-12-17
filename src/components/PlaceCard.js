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
  IconButton,
  Link,
  SvgIcon,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 200,
    backgroundColor: theme.palette.background.dark
  },
  likedButton: {
    color: colors.red[600]
  },
  subscribersIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1)
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
          image={place.creator.avatar}
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
              to="#"
              variant="h5"
            >
              {place.title}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              by
              {' '}
              <Link
                color="textPrimary"
                component={RouterLink}
                to="#"
                variant="h6"
              >
                {place.creator.username}
              </Link>
              {' '}
              | Updated
              {' '}
              {moment(place.date).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        pb={2}
        px={3}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {place.description}
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
              {place.location}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Location
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {place.type}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Type
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              color="textPrimary"
            >
              {place.technology}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Technology
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
        <Tooltip title="Like">
          <IconButton>
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          4
        </Typography>
        <SvgIcon
          fontSize="small"
          color="action"
          className={classes.subscribersIcon}
        >
          <AccountCircleIcon />
        </SvgIcon>
        <Typography
          variant="subtitle2"
          color="textSecondary"
        >
          {place.subscribers}
        </Typography>
        <Box flexGrow={1} />
        <Rating
          value={place.rating}
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
