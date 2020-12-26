import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import EditIcon from '@material-ui/icons/Edit';
import { roles } from 'src/constants';

const useStyles = makeStyles((theme) => ({
  root: {},
  cover: {
    position: 'relative',
    height: 450,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${'/static/images/users/userBG.png'})`,
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    },
    [theme.breakpoints.down('md')]: {
      height: 220
    }
  },
  changeButton: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(3),
      bottom: 'auto'
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[900]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute'
  },
  action: {
    marginLeft: theme.spacing(1)
  }
}));

function Header({
  className,
  user,
  ...rest
}) {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={classes.cover}
      />
      <Container maxWidth="lg">
        <Box
          position="relative"
          mt={1}
          display="flex"
          alignItems="center"
        >
          <Avatar
            alt="Person"
            className={classes.avatar}
            src={user.avatar}
          />
          <Box marginLeft="160px">
            <Typography
              variant="overline"
              color="textSecondary"
            >
              {user.bio}
            </Typography>
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {user.username}
            </Typography>
            <Label color="secondary">
              {roles[user.role]}
            </Label>
          </Box>
          <Box flexGrow={1} />
          {account.user && account.user.id !== user.id && (
          <Hidden smDown>
            <Button
              color="secondary"
              component={RouterLink}
              size="small"
              to={`/chat/${user.id}`}
              variant="contained"
              className={classes.action}
            >
              Gửi tin nhắn
            </Button>
          </Hidden>
          )}
          {account.user && (account.user.role === 'admin' || account.user.id === user.id) && (
          <Tooltip title="Thay đổi thông tin">
            <IconButton className={classes.action} href={`/users/${user.id}/edit`}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          )}
        </Box>
      </Container>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default Header;
