import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'src/utils/axios';
import moment from 'moment';
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
  makeStyles
} from '@material-ui/core';
import Maps from 'src/components/Maps';
import { KeyboardDatePicker } from '@material-ui/pickers';
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
        room: '',
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
        endDate: moment(new Date()).add(1, 'weeks'),
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        type: Yup.string().oneOf(['Phòng trọ', 'Chung cư', 'Nhà nguyên căn']).required('Type is required'),
        room: Yup.number().positive('Must be a positive').required('Number is required'),
        area: Yup.number().positive('Must be a positive').required('Number is required'),
        price: Yup.number().positive('Must be a positive').required('Number is required'),
        host: Yup.boolean(),
        bathroom: Yup.string().oneOf(['Chung', 'Khép kín']).required('Bathroom type is required'),
        waterHeater: Yup.boolean(),
        kitchen: Yup.string().oneOf(['Khu bếp riêng', 'Khu bếp chung', 'Không nấu ăn']).required('Kitchen type is required'),
        airconditioner: Yup.boolean(),
        balcony: Yup.boolean(),
        electricPrice: Yup.number().positive('Must be a positive').required('Number is required'),
        waterPrice: Yup.number().positive('Must be a positive').required('Number is required'),
        endDate: Yup.date().min(moment(new Date()).add(6, 'days'), 'Thời gian đăng bài tối thiểu 1 tuần').required('End date is required'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        axios.post(`${process.env.REACT_APP_API}/places/new`, values)
          .then((response) => {
            setStatus({ success: true });
            setSubmitting(false);
            enqueueSnackbar('Đăng bài thành công', {
              variant: 'success'
            });
            history.push(`/places/${response.data.placeId}`);
          })
          .catch((err) => {
            setErrors({ submit: err.message });
            setStatus({ success: false });
            setSubmitting(false);
            enqueueSnackbar(err.data.message || 'Không thể tạo phòng thuê', {
              variant: 'error'
            });
          });
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
                    label="Tên bài đăng"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    variant="outlined"
                  />
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      className={classes.datePicker}
                      error={Boolean(touched.endDate && errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                      label="Thời gian hiển thị"
                      format="DD/MM/YYYY"
                      name="endDate"
                      inputVariant="outlined"
                      variant="inline"
                      fullWidth
                      value={values.endDate}
                      onBlur={() => setFieldTouched('endDate')}
                      onClose={() => setFieldTouched('endDate')}
                      onAccept={() => setFieldTouched('endDate')}
                      onChange={(date) => setFieldValue('endDate', date)}
                    />
                  </Grid>
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      helperText={touched.description && errors.description}
                      fullWidth
                      label="Mô tả"
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      multiline
                      rows={4}
                      variant="outlined"
                    />
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
                  <CardHeader title="Thông tin chung" />
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
                          error={Boolean(touched.type && errors.type)}
                          helperText={touched.type && errors.type}
                          select
                          fullWidth
                          label="Loại phòng "
                          value={values.type}
                          onChange={(e) => setFieldValue('type', e.target.value)}
                          variant="outlined"
                        >
                          <MenuItem value="Phòng trọ">Phòng trọ</MenuItem>
                          <MenuItem value="Chung cư">Chung cư mini</MenuItem>
                          <MenuItem value="Nhà nguyên căn">Chung cư nguyên căn</MenuItem>
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
                          label="Số phòng"
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
                          label="Giá cả(theo tháng)"
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
                          label="Diện tích"
                          name="area"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.area}
                          variant="outlined"
                          InputProps={{
                            // eslint-disable-next-line react/jsx-one-expression-per-line
                            endAdornment: <InputAdornment position="end">m<sub>2</sub></InputAdornment>
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
                          label="Giá điện"
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
                          label="Giá nước"
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
                  <CardHeader title="Cơ sở vật chất" />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.kitchen && errors.kitchen)}
                          helperText={touched.kitchen && errors.kitchen}
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
                          error={Boolean(touched.bathroom && errors.bathroom)}
                          helperText={touched.bathroom && errors.bathroom}
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
                            label="Chung chủ"
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
                            label="Ban công"
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
                            label="Điều hòa"
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
                            label="Nóng lạnh"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Địa chỉ" />
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
                  <CardHeader title="Hình ảnh" />
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
              Đăng bài
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
