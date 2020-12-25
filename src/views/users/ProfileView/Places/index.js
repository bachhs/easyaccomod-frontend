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
import axios from 'src/utils/axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Places({
  className, uid, variant, ...rest
}) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [places, setPlaces] = useState([]);

  const getPlaces = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API}/users/${uid}/${variant}`)
      .then((response) => {
        if (isMountedRef.current) {
          setPlaces(response.data.user.places);
        }
      });
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
  className: PropTypes.string,
  uid: PropTypes.string,
  variant: PropTypes.string
};

export default Places;
