/* eslint-disable global-require */
import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button,
  colors
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Header from './Header';
import Filter from './Filter';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  cover: {
    position: 'relative',
    height: 800,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    },
    [theme.breakpoints.down('md')]: {
      height: 220
    },
    backgroundImage: `url(${'/static/images/covers/cover.jpg'})`
  },
  title: {
    color: '#ffffff',
    fontFamily: '"Segoe UI"',
    fontWeight: 'bold',
    fontSize: '3rem',
  },
  span: {
    color: 'greenyellow'
  },
  container: {
    textAlign: 'center',
    paddingLeft: 150,
    marginTop: 60
  },
  changeButton: {
    position: 'absolute',
    marginTop: 20,
    left: 300,
    backgroundColor: '#ffffff',
    color: theme.palette.common.dark,
    [theme.breakpoints.down('md')]: {
      visibility: 'hidden',
      top: theme.spacing(3),
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[500]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  }
}));

function ProjectBrowseView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [places, setPlaces] = useState([]);
  const [placeCount, setPlaceCount] = useState(3);

  const getPlaces = useCallback((page) => {
    axios
      .get(`${process.env.REACT_APP_API}/places?page=${page}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPlaceCount(response.data.placeCount);
          setPlaces(response.data.places);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPlaces();
  }, [getPlaces]);

  return (
    <div
      className={classes.rot}
    >
      <div
        className={classes.cover}
      >
        <div maxWidth="lg" className={classes.container}>
          <h1 className={classes.title}>
            Chào mừng đến
            {' '}
            <br />
            {' '}
            <span className={classes.span}>FLASH HOME</span>
            {' '}
          </h1>
          <h3 style={{ color: '#ffffff', fontFamily: '"Segoe UI"', marginTop: 10 }}>Tìm nhà nhanh như người yêu cũ trở mặt!!!</h3>
          <Button
            className={classes.changeButton}
            variant="contained"
          >
            <FingerprintIcon className={classes.addPhotoIcon} />
            Tham gia với chúng tôi
          </Button>
        </div>
      </div>
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
            <Results places={places} getPlaces={getPlaces} placeCount={placeCount} />
          </Box>
        </Container>
      </Page>
    </div>
  );
}

export default ProjectBrowseView;
