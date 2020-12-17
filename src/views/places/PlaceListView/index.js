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
    const mock = [
      {
        id: 'tjwqejew',
        title: 'khanhlinhxacsuat',
        date: new Date(),
        description: 'Chính Chủ cho thuê giá rẻ mặt tiền ngang lớn 8x20m, Nguyễn Tri Phương Q10. 3 lầu, Giá chỉ 120tr/th Vị trí cực kỳ đắc địa. Nằm đoạn đẹp nhất con đường, tuyến phố thương hiệu nổi tiếng về kinh doanh ẩm thực. ',
        address: 'số nhà 3, ngõ 47, Nguyễn Hoàng, phường Mỹ Đình 2, quận Nam Từ Liêm, Hà Nội',
        price: '4000000',
        type: 'Chung cư mini',
        image: 'https://scontent.fhan5-6.fna.fbcdn.net/v/t1.0-9/119138461_1589984874505246_3417111486019479937_o.jpg?_nc_cat=107&ccb=2&_nc_sid=174925&_nc_ohc=HPOzHIoCMVAAX85CxRg&_nc_ht=scontent.fhan5-6.fna&oh=2031c0427e9bd29930e16d09b28e06f8&oe=6000EB2E',
        star: 4.5,
        views: 100,
        area: '12',
        creator: {
          username: 'Bach Luu',
          avatar: 'https://scontent.fhan5-6.fna.fbcdn.net/v/t1.0-9/119138461_1589984874505246_3417111486019479937_o.jpg?_nc_cat=107&ccb=2&_nc_sid=174925&_nc_ohc=HPOzHIoCMVAAX85CxRg&_nc_ht=scontent.fhan5-6.fna&oh=2031c0427e9bd29930e16d09b28e06f8&oe=6000EB2E'
        }
      },
    ];
    if (isMountedRef.current) {
      setPlaces(mock);
    }
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
