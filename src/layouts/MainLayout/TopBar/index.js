import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import Account from './Account';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
  },
  toolbar: {
    minHeight: 56
  }
}));

function TopBar({
  className,
  onMobileNavOpen,
  ...rest
}) {
  const classes = useStyles();
  const account = useSelector((state) => state.account);

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
        <Search />
        {account.user && (
          <>
            <Box ml={2}>
              <Account />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
