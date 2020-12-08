import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FilesDropzone from 'src/components/FilesDropzone';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

function PlaceCreateForm({ className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        title: '',
        address: '',
        location: {
          lat: '',
          lng: ''
        },
        type: '',
        number: '',
        area: '',
        price: '',
        Hostt: '',
        bathroom: {
          shared: '',
          waterHeater: ''
        },
        kitchen: '',
        airconditioner: '',
        balcony: '',
        electricPrice: '',
        description: '',
        images: [],
        activated: '',
        endDate: '',
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        type: Yup.string().oneOf(['Phòng trọ', 'Chung cư', 'Nhà nguyên căn']).required('Type is required'),
        number: '',
        area: '',
        price: '',
        Hostt: '',
        bathroom: {
          shared: '',
          waterHeater: ''
        },
        kitchen: '',
        airconditioner: '',
        balcony: '',
        electricPrice: '',
        description: '',
        images: [],
        activated: '',
        endDate: '',
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Do api call
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Product Created', {
            variant: 'success'
          });
          history.push('/app/products');
        } catch (err) {
          setErrors({ submit: err.message });
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              lg={12}
            >
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Product Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      Description
                    </Typography>
                  </Box>
                  {(touched.description && errors.description) && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Choose Option" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        xs={12}
                        md={12}
                      >
                        <TextField
                          error={Boolean(touched.address && errors.address)}
                          fullWidth
                          helperText={touched.address && errors.address}
                          label="Address"
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.address}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          fullWidth
                          label="Type select"
                          value={values.type}
                          onChange={handleChange}
                          SelectProps={{
                            native: true,
                          }}
                          helperText="Please select your type"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          fullWidth
                          label="Room"
                          name="totalRoom"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.totalRoom}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="outlined-adornment-price">Price</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-price"
                            value={values.price}
                            onChange={handleChange('price')}
                            endAdornment={<InputAdornment position="end">VND</InputAdornment>}
                            aria-describedby="outlined-price-helper-text"
                            inputProps={{
                              'aria-label': 'price',
                            }}
                            labelWidth={39}
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="outlined-adornment-area">Area</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-area"
                            value={values.area}
                            onChange={handleChange('area')}
                            endAdornment={<InputAdornment position="end">m2</InputAdornment>}
                            aria-describedby="outlined-area-helper-text"
                            inputProps={{
                              'aria-label': 'area',
                            }}
                            labelWidth={35}
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="outlined-adornment-electricPrice">Electric Price</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-electricPrice"
                            value={values.electricPrice}
                            onChange={handleChange('electricPrice')}
                            endAdornment={<InputAdornment position="end">VND/1</InputAdornment>}
                            aria-describedby="outlined-electricPrice-helper-text"
                            inputProps={{
                              'aria-label': 'electricPrice',
                            }}
                            labelWidth={100}
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="outlined-adornment-waterPrice">Water Price</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-waterPrice"
                            value={values.waterPrice}
                            onChange={handleChange('waterPrice')}
                            endAdornment={<InputAdornment position="end">VND/1</InputAdornment>}
                            aria-describedby="outlined-waterPrice-helper-text"
                            inputProps={{
                              'aria-label': 'waterPrice',
                            }}
                            labelWidth={90}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Material Facilities" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          fullWidth
                          label="Kitchen select"
                          value={values.kitchen}
                          onChange={handleChange}
                          SelectProps={{
                            native: true,
                          }}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="outlined-select-currency-native"
                          select
                          fullWidth
                          label="Bathroom select"
                          value={values.bathroom}
                          onChange={handleChange}
                          SelectProps={{
                            native: true,
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid item xs={12} md={6}>
                        <Box>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={values.Host}
                                onChange={handleChange}
                                value={values.Host}
                                name="Host"
                              />
                        )}
                            label="Host"
                          />
                        </Box>
                        <Box mt={2}>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={values.balcony}
                                onChange={handleChange}
                                value={values.balcony}
                                name="balcony"
                              />
                        )}
                            label="Balcony"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={values.airconditioner}
                                onChange={handleChange}
                                value={values.airconditioner}
                                name="airconditioner"
                              />
                        )}
                            label="Air Conditioner"
                          />
                        </Box>
                        <Box mt={2}>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                checked={values.waterHeater}
                                onChange={handleChange}
                                value={values.waterHeater}
                                name="waterHeater"
                              />
                        )}
                            label="Water Heater"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Google Maps" />
                  <Divider />
                  <CardContent>
                    <Grid
                      item
                    >
                      <TextField
                        fullWidth
                        label="Maps"
                        name="salePrice"
                        type="number"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.salePrice}
                        variant="outlined"
                      />
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropzone />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Create product
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

PlaceCreateForm.propTypes = {
  className: PropTypes.string
};

export default PlaceCreateForm;
