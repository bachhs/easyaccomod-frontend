import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  active: {
    boxShadow: `inset 4px 0px 0px ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.action.active
  },
  avatar: {
    height: 40,
    width: 40
  },
  unreadIndicator: {
    marginTop: 2,
    padding: 2,
    height: 18,
    minWidth: 18
  }
}));

function ThreadItem({
  active,
  thread,
  className,
  ...rest
}) {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const { uid } = useParams();
  const contact = thread.recipients[0] === uid ? thread.recipients[0] : thread.recipients[1];
  const lastMessageInfo = `${thread.lastestMessage.sender === account.user.id ? 'Bạn:' : ''} ${thread.lastestMessage.body}`;

  return (
    <ListItem
      button
      className={clsx(
        {
          [classes.active]: active
        },
        className
      )}
      component={RouterLink}
      to={`/chat/${contact.id}`}
      {...rest}
    >
      <ListItemAvatar>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={contact.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primary={contact.username}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6',
          color: 'textPrimary'
        }}
        secondary={lastMessageInfo}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body2',
          color: 'textSecondary'
        }}
      />
    </ListItem>
  );
}

ThreadItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  thread: PropTypes.object.isRequired
};

ThreadItem.defaultProps = {
  active: false,
  className: ''
};

export default ThreadItem;
