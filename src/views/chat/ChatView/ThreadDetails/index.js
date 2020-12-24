/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useCallback,
  useState,
  useRef
} from 'react';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import PerfectScrollbar from 'react-perfect-scrollbar';
import io from 'socket.io-client';
import {
  Box,
  Divider,
  makeStyles
} from '@material-ui/core';
import { useParams } from 'react-router';
import Toolbar from './Toolbar';
import Message from '../Message';
import MessageAdd from '../MessageAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark
  }
}));

function ThreadDetails() {
  const classes = useStyles();
  const { uid } = useParams();
  const isMountedRef = useIsMountedRef();
  const messagesRef = useRef(null);
  const [thread, setThread] = useState('');
  const [lastMessage, setLastMessage] = useState(null);

  function scrollMessagesToBottom() {
    if (messagesRef.current) {
      // eslint-disable-next-line no-underscore-dangle
      messagesRef.current._container.scrollTop = messagesRef.current._container.scrollHeight;
    }
  }

  const getThread = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/chat/${uid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setThread(response.data.thread);
          scrollMessagesToBottom();
        }
      })
      .catch(() => {
      });
  }, [isMountedRef]);

  useEffect(() => {
    getThread();
  }, [getThread, lastMessage]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_IO);
    socket.on('messages', (data) => setLastMessage(data));
  }, []);

  return (
    <div className={classes.root}>
      <Toolbar />
      <Divider />
      <Box
        flexGrow={1}
        p={2}
        component={PerfectScrollbar}
        ref={messagesRef}
        options={{ suppressScrollX: true }}
      >
        <div>
          {thread && thread.messages.length > 0 && thread.messages.map((message) => (
            <Message
            // eslint-disable-next-line no-underscore-dangle
              key={message._id}
              message={message}
            />
          ))}
        </div>
      </Box>
      <Divider />
      <MessageAdd onAdd={getThread} />
    </div>
  );
}

export default ThreadDetails;
