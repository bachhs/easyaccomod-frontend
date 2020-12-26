import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  InputBase,
  IconButton,
  Toolbar,
  makeStyles,
  fade
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Account from './Account';
import Notifications from './Notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
  },
  toolbar: {
    minHeight: 56
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    color: 'inherit',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    '&::placeholder': {
      color: '#abc4db'
    }
  },
}));

function TopBar({
  className,
  onMobileNavOpen,
  ...rest
}) {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const [search, setSearch] = useState('');

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box
          ml={2}
          flexGrow={1}
        />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={search}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event) => setSearch(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                // Do code here
                event.preventDefault();
              }
            }}
          />
        </div>
        <IconButton href={`/chat/${account.user.id}`} color="inherit">
          <ChatBubbleIcon />
        </IconButton>
        <Notifications />
        <Account />
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
