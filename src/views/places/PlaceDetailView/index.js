import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tabs,
  Tab,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';
import Files from './Files';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function PlaceDetailView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { pid } = useParams();
  const [currentTab, setCurrentTab] = useState('overview');
  const [place, setPlace] = useState(null);
  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'files', label: 'Files' },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getPlace = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/places/${pid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPlace(response.data.place);
          console.log(place);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPlace();
  }, [getPlace]);

  if (!place) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title={place.title}
    >
      <Container maxWidth="lg">
        <Header place={place} />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
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
        <Box mt={3}>
          {currentTab === 'overview' && <Overview place={place} />}
          {currentTab === 'files' && <Files files={place.files} />}
        </Box>
      </Container>
    </Page>
  );
}

export default PlaceDetailView;
