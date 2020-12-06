import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

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
import { register } from 'src/actions/accountActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

function RegisterForm({
  className, onSubmitSuccess, onSubmitFail, ...rest
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        role: '',
        citizen: '',
        address: '',
        phone: '',
        password: '',
        policy: false
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required('User Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        role: Yup.string().oneOf(['renter', 'owner']).required('Role is required'),
        citizen: Yup.string().required('Citizen ID is required').matches(/^[0-9]+$/, 'Must be only digits').min(6, 'Must be at least 6 digits')
          .max(12, 'Must be max 12 digits'),
        address: Yup.string().max(255).required('Address is required'),
        phone: Yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Must be only digits').min(6, 'Must be at least 6 digits')
          .max(12, 'Must be max 12 digits'),
        password: Yup.string().min(6).max(255).required('Password is required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(register(values));
          onSubmitSuccess();
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          onSubmitFail(error);
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
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            style={{ marginBottom: 15 }}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <FormLabel>Role</FormLabel>
          <RadioGroup row aria-label="role" name="role" value={values.role} onChange={handleChange}>
            <FormControlLabel value="renter" control={<Radio />} label="Renter" />
            <FormControlLabel value="owner" control={<Radio />} label="Owner" />
          </RadioGroup>
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
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box
            alignItems="center"
            display="flex"
            mt={2}
            ml={-1}
          >
            <Checkbox
              checked={values.policy}
              name="policy"
              onChange={handleChange}
            />
            <Typography
              variant="body2"
              color="textSecondary"
            >
              I have read the
              {' '}
              <Link
                component="a"
                href="#"
                color="secondary"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
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
              Create account
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

RegisterForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
  onSubmitFail: PropTypes.func
};

RegisterForm.default = {
  onSubmitSuccess: () => { },
  onSubmitFail: () => { }
};

export default RegisterForm;
