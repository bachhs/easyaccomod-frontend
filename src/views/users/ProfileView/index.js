import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Places from './Places';

const tabs = [
  { value: 'favorite', label: 'Yêu thích' },
  { value: 'places', label: 'Bài đăng' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

function ProfileView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState('favorite');
  const [user, setUser] = useState(null);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getPosts = useCallback(() => {
    const mock = {
      cover: 'https://www.google.com/logos/doodles/2020/december-holidays-days-2-30-6753651837108830.3-law.gif',
      avatar: 'https://www.google.com/logos/doodles/2020/december-holidays-days-2-30-6753651837108830.3-law.gif',
      bio: 'ABC',
      name: 'Bach Luu',
      role: 'owner',
      activated: false
    };
    setUser(mock);
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!user) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Profile"
    >
      <Header user={user} />
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            textColor="secondary"
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box
          py={3}
          pb={6}
        >
          {currentTab === 'places' && <Places />}
        </Box>
      </Container>
    </Page>
  );
}

export default ProfileView;