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
  root: {
  },
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

function Holder({ creator, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        avatar={(
          <Avatar
            alt="Creator"
            className={classes.avatar}
            component={RouterLink}
            src={creator.avatar}
            // eslint-disable-next-line no-underscore-dangle
            to={`/users/${creator._id}`}
          >
            {getInitials(creator.username)}
          </Avatar>
        )}
        className={classes.header}
        disableTypography
        subheader={(
          <Link
            color="textPrimary"
            component={RouterLink}
            // eslint-disable-next-line no-underscore-dangle
            to={`/users/${creator._id}`}
            underline="none"
            variant="h6"
          >
            {creator.username}
          </Link>
        )}
        title={(
          <Typography
            display="block"
            variant="overline"
            color="textSecondary"
          >
            Chủ sở hữu
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
              Địa chỉ
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {creator.address}
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
              Email
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {creator.email}
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
              Số điện thoại
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              {creator.phone}
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

Holder.propTypes = {
  className: PropTypes.string,
  creator: PropTypes.object.isRequired
};

export default Holder;
