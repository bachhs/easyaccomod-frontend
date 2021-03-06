import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import ProfileForm from './ProfileForm';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    minHeight: '100%',
    paddingBottom: 120,
    paddingTop: 80
  }
}));

function RegisterView() {
  const classes = useStyles();
  const history = useHistory();
  const { uid } = useParams();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const [user, setUser] = useState(null);

  const getUser = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/${uid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setUser(response.data.user);
        }
      })
      .catch(() => {
        enqueueSnackbar('Không thể tìm thấy người dùng', {
          variant: 'error'
        });
        history.push('/404');
      });
  }, [isMountedRef]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleSubmitSuccess = () => {
    enqueueSnackbar('Thay đổi thông tin thành công', { variant: 'success' });
    history.push(`/users/${user.id}`);
  };

  const handleSubmitFail = (error) => {
    const errorMessage = error.message || 'Something went wrong';
    enqueueSnackbar(errorMessage, { variant: 'error' });
  };

  if (!user) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          alignItems="center"
          mb={1}
        >
          <Grid
            container
            justify="space-between"
          >
            <Typography
              variant="h3"
              color="textPrimary"
            >
              Chỉnh sửa thông tin
            </Typography>
            <Button
              component={RouterLink}
              to={`/users/${uid}`}
              className={classes.backButton}
            >
              Hủy
            </Button>
          </Grid>
        </Box>
        <Card>
          <CardContent>
            <Box>
              <ProfileForm
                onSubmitSuccess={handleSubmitSuccess}
                onSubmitFail={handleSubmitFail}
                user={user}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterView;
