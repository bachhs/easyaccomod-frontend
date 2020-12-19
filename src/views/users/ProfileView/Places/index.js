import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import PlaceCard from 'src/components/PlaceCard';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Places({ className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [places, setPlaces] = useState(null);

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
        image: 'https://www.google.com/logos/doodles/2020/december-holidays-days-2-30-6753651837108830.3-law.gif',
        star: 4.5,
        views: 100,
        area: '12',
        creator: {
          username: 'Bach Luu',
          avatar: 'https://www.google.com/logos/doodles/2020/december-holidays-days-2-30-6753651837108830.3-law.gif'
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

  if (!places) {
    return null;
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
      >
        {places.map((place) => (
          <Grid
            item
            key={place.id}
            lg={4}
            lx={4}
            md={6}
            xs={12}
          >
            <PlaceCard place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Places.propTypes = {
  className: PropTypes.string
};

export default Places;
