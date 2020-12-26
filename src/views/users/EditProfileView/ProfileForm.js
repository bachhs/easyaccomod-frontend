/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import _ from 'lodash';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
  Link,
  Radio,
  RadioGroup,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

function ProfileForm({
  className, onSubmitSuccess, onSubmitFail, user, ...rest
}) {
  const classes = useStyles();
  return (
    <Formik
      initialValues={_.omit(user, ['email', 'id', 'role', 'activated', 'avatar'])}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('User Name is required'),
        citizen: Yup.string().required('Citizen ID is required').matches(/^[0-9]+$/, 'Must be only digits').min(6, 'Must be at least 6 digits')
          .max(12, 'Must be max 12 digits'),
        address: Yup.string().max(255).required('Address is required'),
        phone: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Must be only digits').min(6, 'Must be at least 6 digits')
          .max(12, 'Must be max 12 digits'),
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        axios
          .put(`${process.env.REACT_APP_API}/users/${user.id}`, values)
          .then(() => {
            onSubmitSuccess();
          })
          .catch((error) => {
            setStatus({ success: false });
            setErrors({ submit: error.message });
            onSubmitFail(error);
            setSubmitting(false);
          });
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
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.username && errors.username)}
            fullWidth
            helperText={touched.username && errors.username}
            label="User Name"
            margin="normal"
            name="username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="username"
            value={values.username}
            variant="outlined"
          />
          {Boolean(touched.role && errors.role)
            && <FormHelperText className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">You must select a role</FormHelperText>}
          <TextField
            error={Boolean(touched.citizen && errors.citizen)}
            fullWidth
            helperText={touched.citizen && errors.citizen}
            label="Citizen ID"
            margin="normal"
            style={{ marginTop: 10 }}
            name="citizen"
            onBlur={handleBlur}
            onChange={handleChange}
            type="citizenID"
            value={values.citizen}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.address && errors.address)}
            fullWidth
            helperText={touched.address && errors.address}
            label="Address"
            margin="normal"
            name="address"
            onBlur={handleBlur}
            onChange={handleChange}
            type="address"
            value={values.address}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.phone && errors.phone)}
            fullWidth
            helperText={touched.phone && errors.phone}
            label="Phone Number"
            margin="normal"
            name="phone"
            onBlur={handleBlur}
            onChange={handleChange}
            type="phone"
            value={values.phone}
            variant="outlined"
          />
          {Boolean(touched.policy && errors.policy) && (
          <FormHelperText error>
            {errors.policy}
          </FormHelperText>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Thay đổi thông tin
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

ProfileForm.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
  onSubmitFail: PropTypes.func
};

ProfileForm.default = {
  onSubmitSuccess: () => { },
  onSubmitFail: () => { }
};

export default ProfileForm;
