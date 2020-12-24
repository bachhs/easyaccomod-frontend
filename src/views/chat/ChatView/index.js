import React, {
  useRef
} from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Sidebar from './Sidebar';
import ThreadDetails from './ThreadDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative'
  }
}));

function ChatView() {
  const classes = useStyles();
  const pageRef = useRef(null);

  return (
    <Page
      className={classes.root}
      title="Chat"
      ref={pageRef}
    >
      <Sidebar containerRef={pageRef} />
      <ThreadDetails />
    </Page>
  );
}

export default ChatView;
