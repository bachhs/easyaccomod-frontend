import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Link,
  List,
  ListItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    paddingTop: 0
  },
  listItem: {
    padding: theme.spacing(2, 0),
    justifyContent: 'space-between'
  }
}));

function Holder({ place, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        avatar={(
          <Avatar
            alt="Author"
            className={classes.avatar}
            component={RouterLink}
            src=""
            to="#"
          >
            {getInitials('Bach Luu')}
          </Avatar>
        )}
        className={classes.header}
        disableTypography
        subheader={(
          <Link
            color="textPrimary"
            component={RouterLink}
            to="#"
            underline="none"
            variant="h6"
          >
            Bach Luu
          </Link>
        )}
        title={(
          <Typography
            display="block"
            variant="overline"
            color="textSecondary"
          >
            Contest holder
          </Typography>
        )}
      />
      <CardContent className={classes.content}>
        <List>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Deadline
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              ABC
            </Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Per Project
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {place.price}
              {' '}
              {place.host}
            </Typography>
          </ListItem>
          <ListItem
            className={classes.listItem}
            disableGutters
            divider
          >
            <Typography
              variant="subtitle2"
              color="textPrimary"
            >
              Last Update
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              ABC
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

Holder.propTypes = {
  className: PropTypes.string,
  place: PropTypes.object.isRequired
};

export default Holder;
