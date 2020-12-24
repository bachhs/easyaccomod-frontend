/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Link,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    height: 32,
    width: 32
  },
  image: {
    cursor: 'pointer',
    height: 'auto',
    maxWidth: '100%',
    width: 380
  }
}));

function Message({
  className,
  message,
  ...rest
}) {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        maxWidth={500}
        ml={message.sender.id === account.user.id ? 'auto' : 0}
      >
        <Avatar
          className={classes.avatar}
          src={message.sender.avatar}
        />
        <Box ml={2}>
          <Box
            bgcolor={message.sender.id === account.user.id ? 'secondary.main' : 'background.default'}
            color={message.sender.id === account.user.id ? 'secondary.contrastText' : 'text.primary'}
            py={1}
            px={2}
            borderRadius="borderRadius"
            boxShadow={1}
          >
            <Link
              color="inherit"
              component={RouterLink}
              to="#"
              variant="h6"
            >
              {message.sender.username}
            </Link>
            <Box mt={1}>
              <Typography
                color="inherit"
                variant="body1"
              >
                {message.body}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

Message.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired
};

export default Message;
