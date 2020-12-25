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

function CustomerListView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [customers, setCustomers] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getCustomers = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users`)
      .then((response) => {
        if (isMountedRef.current) {
          setCustomers(response.data.users);
        }
      });
  }, [isMountedRef]);

  const activateCustomer = (id) => {
    axios
      .patch(`${process.env.REACT_APP_API}/users/${id}/activate`)
      .then(() => {
        enqueueSnackbar('Xác thực thành công', {
          variant: 'success'
        });
        getCustomers();
      })
      .catch(() => {
        enqueueSnackbar('Xác thực không thành công', {
          variant: 'error'
        });
      });
  };

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  if (!customers) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Customer List"
    >
      <Container maxWidth="lg">
        <Header />
        {customers && (
          <Box mt={3}>
            <Results customers={customers} activateCustomer={activateCustomer} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CustomerListView;
