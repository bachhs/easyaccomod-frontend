/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { TextField, makeStyles } from '@material-ui/core';
import Geocode from 'react-geocode';
import {
  GoogleMap, LoadScript, Marker, StandaloneSearchBox
} from '@react-google-maps/api';

const mapContainerStyle = {
  height: '350px'
};

const useStyles = makeStyles(() => ({
  root: {},
}));

const libraries = ['places'];

function Maps({
  className, search, onAddressChange, onLocationChange, error, helperText, marker, ...rest
}) {
  const classes = useStyles();
  const [searchBox, setSearchBox] = useState();
  const onLoad = (ref) => setSearchBox(ref);
  const [center, setCenter] = useState({ lat: 21.0388785, lng: 105.7780865 });
  let address;
  const [coordinate, setCoordinate] = useState();
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);

  const onPlacesChanged = () => {
    const location = {
      lat: searchBox.getPlaces()[0].geometry.location.lat(),
      lng: searchBox.getPlaces()[0].geometry.location.lng()
    };
    setCenter(location);
    onAddressChange(searchBox.getPlaces()[0].formatted_address);
    onLocationChange(location);
    setCoordinate(location);
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
        libraries={libraries}
      >
        {search
        && (
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <TextField
            error={error}
            helperText={helperText}
            variant="outlined"
            value={address}
            fullWidth
            placeholder="Nhập địa chỉ"
          />
        </StandaloneSearchBox>
        )}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={marker || center}
        >
          {marker && (
          <Marker
            position={marker}
          />
          )}
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
  className: PropTypes.string,
  search: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onAddressChange: PropTypes.func,
  onLocationChange: PropTypes.func,
  marker: PropTypes.object
};

export default React.memo(Maps);
