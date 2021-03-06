import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  makeStyles,
  Grid,
  Button,
  Typography
} from '@material-ui/core';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import PlaceEditForm from './PlaceEditForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function PlaceEditView() {
  const classes = useStyles();
  const history = useHistory();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { pid } = useParams();
  const [place, setPlace] = useState(null);

  const getPlace = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/places/${pid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPlace(response.data.place);
        }
      })
      .catch(() => {
        enqueueSnackbar('Không thể tìm thấy phòng trọ', {
          variant: 'error'
        });
        history.push('/404');
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
      title="Chỉnh sửa bài đăng"
    >
      <Container maxWidth="md">
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              Chỉnh sửa bài đăng
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={RouterLink}
              to={`/places/${pid}`}
            >
              Hủy
            </Button>
          </Grid>
        </Grid>
        <PlaceEditForm place={place} />
      </Container>
    </Page>
  );
}

export default PlaceEditView;
