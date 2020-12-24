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
  makeStyles,
  Button
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
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
  },
  buttonChat: {
    position: 'absolute',
    top: theme.spacing(3.5),
    right: theme.spacing(3),
    borderRadius: 600
  },
  MaiIcon: {
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(1.5)
    }
  }
}));

function Holder({ creator, className, ...rest }) {
  const classes = useStyles();
  const theme = useTheme(Holder);
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {!matchesXS
        ? (
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            className={clsx(classes.buttonChat, className)}
            to={`/chat/${creator.id}`}
          >
            <MailOutlineIcon className={clsx(classes.MaiIcon, className)} />
            {matchesMD ? 'Nhắn tin cho chủ nhà' : ''}
          </Button>
        )
        : (
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            className={clsx(classes.buttonChat, className)}
            to={`/chat/${creator.id}`}
          >
            <MailOutlineIcon />
          </Button>
        )}
      <CardHeader
        avatar={(
          <Avatar
            alt="Creator"
            className={classes.avatar}
            component={RouterLink}
            src={creator.avatar}
            to={`/users/${creator.id}`}
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
            to={`/users/${creator.id}`}
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
