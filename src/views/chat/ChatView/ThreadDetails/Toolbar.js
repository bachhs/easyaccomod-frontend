import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'src/utils/axios';
import { useParams, Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {
  Avatar,
  Box,
  Link,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { roles } from 'src/views/users/CustomerListView/Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: 64,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  searchInput: {
    marginLeft: theme.spacing(2),
    flexGrow: 1
  }
}));

function Toolbar({
  className,
  ...rest
}) {
  const classes = useStyles();
  const [contact, setContact] = useState('');
  const isMountedRef = useIsMountedRef();
  const { uid } = useParams();

  const getContact = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/${uid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setContact(response.data.user);
        }
      })
      .catch(() => {
      });
  }, [isMountedRef]);

  useEffect(() => {
    getContact();
  }, [getContact]);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {contact && (
        <Box
          display="flex"
          alignItems="center"
        >
          <Avatar src={contact.avatar} />
          <Box ml={1}>
            <Link
              color="inherit"
              component={RouterLink}
              to={`/users/${contact.id}`}
              variant="h6"
            >
              {contact.username}
            </Link>
            <Box
              display="flex"
              alignItems="center"
            >
              <Typography
                color="textSecondary"
                variant="caption"
              >
                {roles[contact.role]}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
}

Toolbar.propTypes = {
  className: PropTypes.string,
};

export default Toolbar;
