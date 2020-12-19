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

  const getPlaces = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/places`)
      .then((response) => {
        if (isMountedRef.current) {
          console.log(response.data);
          setPlaces(response.data);
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
          <Results places={places} />
        </Box>
      </Container>
    </Page>
  );
}

export default ProjectBrowseView;
