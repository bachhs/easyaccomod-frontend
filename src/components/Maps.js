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
  mapContainerStyle: {
    width: '350px',
    height: '350px'
  }
}));

const libraries = ['places'];

function Maps({ className, ...rest }) {
  const classes = useStyles();
  const [searchBox, setSearchBox] = useState();
  const [address, setAddress] = useState();
  const onLoad = (ref) => setSearchBox(ref);
  const center = { lat: 21.0388785, lng: 105.7780865 };
  const [coordinate, setCoordinate] = useState();
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API);

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
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={address}
            fullWidth
            placeholder="Type your address"
            style={{ marginBottom: 10 }}
          />
        </StandaloneSearchBox>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={center}
          onClick={(e) => {
            setCoordinate({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          }}
        >
          {searchBox && (
          <Marker
            position={coordinate}
            draggable
            onDragEnd={(e) => Geocode.fromLatLng(e.latLng.lat(), e.latLng.lng()).then(
              (response) => {
                setAddress(response.results[0].formatted_address);
              }
            )}
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

export default React.memo(Maps);
