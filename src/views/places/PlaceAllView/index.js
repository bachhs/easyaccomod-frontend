import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import { useSnackbar } from 'notistack';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function PlaceAllView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [places, setPlaces] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getPlaces = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/places`)
      .then((response) => {
        if (isMountedRef.current) {
          setPlaces(response.data.places);
        }
      });
  }, [isMountedRef]);

  const activatePlace = (id) => {
    axios
      .patch(`${process.env.REACT_APP_API}/places/${id}/activate`)
      .then(() => {
        enqueueSnackbar('Duyệt bài thành công', {
          variant: 'success'
        });
        getPlaces();
      })
      .catch(() => {
        enqueueSnackbar('Duyệt bài không thành công', {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  if (!places) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Customer List"
    >
      <Container maxWidth="lg">
        <Header />
        {places && (
          <Box mt={3}>
            <Results places={places} activatePlace={activatePlace} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default PlaceAllView;
