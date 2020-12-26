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
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import { useParams } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Overview from './Overview';
import Reviews from './Reviews';

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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { pid } = useParams();
  const [currentTab, setCurrentTab] = useState('overview');
  const [place, setPlace] = useState(null);
  const [creator, setCreator] = useState(null);
  const tabs = [
    { value: 'overview', label: 'Thông tin chung' },
    { value: 'reviews', label: 'Đánh giá' },
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getPlace = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/places/${pid}`)
      .then((response) => {
        if (isMountedRef.current) {
          setCreator(response.data.creator);
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

  const activatePlace = (id) => {
    axios
      .patch(`${process.env.REACT_APP_API}/places/${id}/activate`)
      .then(() => {
        enqueueSnackbar('Duyệt bài thành công', {
          variant: 'success'
        });
        getPlace();
      })
      .catch(() => {
        enqueueSnackbar('Duyệt bài không thành công', {
          variant: 'error'
        });
      });
  };

  const setAvailablePlace = (id) => {
    axios
      .patch(`${process.env.REACT_APP_API}/places/${id}/available`)
      .then(() => {
        enqueueSnackbar('Thay đổi trạng thái thành công', {
          variant: 'success'
        });
        getPlace();
      })
      .catch(() => {
        enqueueSnackbar('Thay đổi trạng thái không thành công', {
          variant: 'error'
        });
      });
  };

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
        <Header place={place} activatePlace={activatePlace} setAvailablePlace={setAvailablePlace} />
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
          {currentTab === 'overview' && <Overview place={place} creator={creator} />}
          {currentTab === 'reviews' && <Reviews reviews={place.reviews} />}
        </Box>
      </Container>
    </Page>
  );
}

export default PlaceDetailView;
