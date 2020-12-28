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
  colors,
  Typography,
  Divider
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import PlayForWorkOutlinedIcon from '@material-ui/icons/PlayForWorkOutlined';
import Header from './Header';
import Filter from './Filter';
import Footer from './Footer';
import Results from './Results';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

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
      '& $inviteButton': {
        visibility: 'visible'
      }
    },
    [theme.breakpoints.down('lg')]: {
      height: 600
    },
    [theme.breakpoints.down('md')]: {
      height: 400
    },
    backgroundImage: `url(${'/static/images/covers/cover.jpg'})`
  },
  title: {
    color: '#ffffff',
    fontFamily: '"Segoe UI"',
    fontWeight: 'bold',
  },
  span: {
    color: 'greenyellow',
    fontFamily: '"Segoe UI"',
    fontWeight: 'bold',
    marginTop: 7,
  },
  subtext: {
    color: 'white',
    fontFamily: '"Segoe UI"',
    fontWeight: 'bold',
    marginTop: 4
  },
  container: {
    paddingLeft: '10%',
    marginTop: 60
  },
  inviteButton: {
    position: 'absolute',
    marginTop: 20,
    left: '10%',
    backgroundColor: '#ffffff',
    color: theme.palette.common.dark,
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(6),
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[500]
    }
  },
}));

function ProjectBrowseView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [places, setPlaces] = useState([]);
  const [placeCount, setPlaceCount] = useState(0);

  const handleClick = () => {
    const anchor = document.querySelector('#Main');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (window.location.search) {
    handleClick();
  }

  const query = useQuery();

  const getPlaces = useCallback(() => {
    query.delete('fbclid');
    let API_URL = `${process.env.REACT_APP_API}/places?${query.toString()}`;
    if (!query.toString()) {
      API_URL += '?page=1';
    }
    axios
      .get(API_URL)
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
        <Box
          className={classes.container}
        >
          <Typography
            variant="h1"
            className={classes.title}
          >
            Chào mừng đến
          </Typography>
          <Typography
            variant="h1"
            className={classes.span}
          >
            TOMAHAWK HOME
          </Typography>
          <Typography
            variant="h4"
            className={classes.subtext}
          >
            Tìm nhà nhanh như người yêu cũ trở mặt!!!
          </Typography>
          <Button
            className={classes.inviteButton}
            variant="contained"
            startIcon={<PlayForWorkOutlinedIcon />}
            onClick={handleClick}
          >
            Tham gia với chúng tôi
          </Button>
        </Box>
      </div>
      <Page
        className={classes.root}
        title="Tomahawk Home - Tìm nhà trọ nhanh như tên lửa hành trình"
        id="Main"
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
      <Divider />
      <Footer />
    </div>
  );
}

export default ProjectBrowseView;
