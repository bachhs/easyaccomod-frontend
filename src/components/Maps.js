/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { TextField, makeStyles } from '@material-ui/core';
import {
  GoogleMap, LoadScript, StandaloneSearchBox, Marker
} from '@react-google-maps/api';

const mapContainerStyle = {
  height: '350px'
};

const useStyles = makeStyles(() => ({
  root: {},
  mapContainerStyle: {
    width: '350px',
    height: '350px'
  }
}));

const libraries = ['places'];

function Maps({ className, ...rest }) {
  const classes = useStyles();
  const [searchBox, setSearchBox] = useState();
  const onLoad = (ref) => setSearchBox(ref);
  const [coordinate, setCoordinate] = useState();

  const onPlacesChanged = () => {
    const location = {
      lat: searchBox.getPlaces()[0].geometry.location.lat(),
      lng: searchBox.getPlaces()[0].geometry.location.lng()
    };
    setCoordinate(location);
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
        libraries={libraries}
      >
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </StandaloneSearchBox>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={coordinate}
        >
          {searchBox && (
          <Marker
            position={coordinate}
          />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

Maps.propTypes = {
  className: PropTypes.string
};

export default Maps;
