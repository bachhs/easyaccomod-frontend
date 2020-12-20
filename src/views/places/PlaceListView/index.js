/* eslint-disable global-require */
import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Filter from './Filter';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function ProjectBrowseView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [places, setPlaces] = useState([]);

  const getPlaces = useCallback((page) => {
    axios
      .get(`${process.env.REACT_APP_API}/places?page=${page}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPlaces(response.data.places);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return (
    <Page
      className={classes.root}
      title="Project List"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <Filter />
        </Box>
        <Box mt={6}>
          <Results getPlaces={getPlaces} places={places} />
        </Box>
      </Container>
    </Page>
  );
}

export default ProjectBrowseView;
