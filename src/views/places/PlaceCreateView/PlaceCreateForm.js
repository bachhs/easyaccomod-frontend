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
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Maps from 'src/components/Maps';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FilesDropzone from 'src/components/FilesDropzone';

const useStyles = makeStyles(() => ({
  root: {},
  datePicker: {
    marginTop: 25
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
        host: false,
        bathroom: '',
        kitchen: '',
        waterHeater: false,
        airconditioner: false,
        balcony: false,
        electricPrice: '',
        waterPrice: '',
        description: '',
        images: [],
        activated: '',
        endDate: new Date(),
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        type: Yup.string().oneOf(['Phòng trọ', 'Chung cư', 'Nhà nguyên căn']).required('Type is required'),
        room: Yup.number().positive('Must be a positive').required('Number is required'),
        area: Yup.number().positive('Must be a positive').required('Number is required'),
        price: Yup.number().positive('Must be a positive').required('Number is required'),
        host: Yup.boolean(),
        bathroom: Yup.string().oneOf(['shared', 'private']).required('Bathroom type is required'),
        waterHeater: Yup.boolean(),
        kitchen: Yup.string().oneOf(['no', 'shared', 'private']).required('Kitchen type is required'),
        airconditioner: Yup.boolean(),
        balcony: Yup.boolean(),
        electricPrice: Yup.number().positive('Must be a positive').required('Number is required'),
        waterPrice: Yup.number().positive('Must be a positive').required('Number is required'),
        endDate: Yup.date().required('End date is required'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
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
        setFieldValue,
        setFieldTouched,
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
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                    fullWidth
                    label="Place title"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                  <Grid container justify="space-around">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classes.datePicker}
                        label="End Date"
                        format="dd/MM/yyyy"
                        name="endDate"
                        inputVariant="outlined"
                        fullWidth
                        value={values.endDate}
                        onBlur={() => setFieldTouched('endDate')}
                        onClose={() => setFieldTouched('endDate')}
                        onAccept={() => setFieldTouched('endDate')}
                        onChange={(date) => setFieldValue('endDate', date)}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
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
                      />
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="place-type"
                          select
                          fullWidth
                          label="Select"
                          value={values.type}
                          onChange={(e) => setFieldValue('type', e.target.value)}
                          variant="outlined"
                        >
                          <MenuItem value="Phòng trọ">Phòng trọ</MenuItem>
                          <MenuItem value="Chung cư mini">Chung cư mini</MenuItem>
                          <MenuItem value="Chung cư nguyên căn">Chung cư nguyên căn</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.room && errors.room)}
                          helperText={touched.room && errors.room}
                          fullWidth
                          label="Room"
                          name="room"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.room}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          helperText={touched.price && errors.price}
                          fullWidth
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.area && errors.area)}
                          helperText={touched.area && errors.area}
                          fullWidth
                          label="Area"
                          name="area"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m2</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.electricPrice && errors.electricPrice)}
                          helperText={touched.electricPrice && errors.electricPrice}
                          fullWidth
                          label="Electric Price"
                          name="electricPrice"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.electricPrice}
                          variant="outlined"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VND/1</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <TextField
                          error={Boolean(touched.waterPrice && errors.waterPrice)}
                          helperText={touched.waterPrice && errors.waterPrice}
                          fullWidth
                          label="Water Price"
                          name="waterPrice"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.waterPrice}
                          variant="outlined"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">VND/1</InputAdornment>,
                          }}
                        />
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
                          select
                          fullWidth
                          label="Bếp"
                          value={values.kitchen}
                          onChange={(e) => setFieldValue('kitchen', e.target.value)}
                          variant="outlined"
                        >
                          <MenuItem value="Khu bếp riêng">Khu bếp riêng</MenuItem>
                          <MenuItem value="Khu bếp chung">Khu bếp chung</MenuItem>
                          <MenuItem value="Không nấu ăn">Không nấu ăn</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          select
                          fullWidth
                          label="Phòng tắm"
                          value={values.bathroom}
                          onChange={(e) => setFieldValue('bathroom', e.target.value)}
                          variant="outlined"
                        >
                          <MenuItem value="Khép kín">Khép kín</MenuItem>
                          <MenuItem value="Chung">Chung</MenuItem>
                        </TextField>
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
                                checked={values.host}
                                onChange={handleChange}
                                value={values.host}
                                name="host"
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
                      <Maps />
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
