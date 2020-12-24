/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'src/utils/axios';
import {
  List,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import ThreadItem from './ThreadItem';

const useStyles = makeStyles(() => ({
  root: {},
  contactAvatar: {
    height: 32,
    width: 32
  },
  threadList: {},
  hideThreadList: {
    display: 'none'
  }
}));

function ThreadList({ className, ...rest }) {
  const classes = useStyles();
  const [threads, setThreads] = useState([]);
  const isMountedRef = useIsMountedRef();

  const getThreads = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/chat`)
      .then((response) => {
        if (isMountedRef.current) {
          setThreads(response.data.threads);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getThreads();
  }, [getThreads]);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <List className={classes.threadList}>
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            thread={thread}
          />
        ))}
      </List>
    </div>
  );
}

ThreadList.propTypes = {
  className: PropTypes.string
};

export default ThreadList;
