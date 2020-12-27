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
        username: Yup.string().max(255).required('Vui lòng nhập họ và tên'),
        email: Yup.string().email('Phải là một email hợp lệ').max(255).required('Vui lòng nhập email'),
        role: Yup.string().oneOf(['renter', 'owner']).required('Vui lòng chọn vai trò'),
        citizen: Yup.string().required('Vui lòng nhập số căn cước công dân').matches(/^[0-9]+$/, 'Chỉ có kí tự là chữ số').min(6, 'Ít nhất là 6 chữ số')
          .max(12, 'Tối đa là 12 chữ số'),
        address: Yup.string().max(255).required('Vui lòng nhập địa chỉ'),
        phone: Yup.string().required('Vui lòng nhập số điện thoại').matches(/^[0-9]+$/, 'Chỉ có kí tự là chữ số').min(6, 'Ít nhất là 6 chữ số')
          .max(10, 'Tối đa là 10 chữ số'),
        password: Yup.string().min(6).max(255).required('Vui lòng nhập mật khẩu'),
        policy: Yup.boolean().oneOf([true], 'Vui lòng tích vào ô điều khoản')
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
            label="Họ và Tên"
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
            label="Địa chỉ Email"
            margin="normal"
            style={{ marginBottom: 15 }}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <FormLabel>Bạn là ?</FormLabel>
          <RadioGroup row aria-label="role" name="role" value={values.role} onChange={handleChange}>
            <FormControlLabel value="renter" control={<Radio />} label="Người thuê nhà" />
            <FormControlLabel value="owner" control={<Radio />} label="Chủ sở hữu" />
          </RadioGroup>
          {Boolean(touched.role && errors.role)
            && <FormHelperText className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error">Vui lòng chọn vai trò của mình</FormHelperText>}
          <TextField
            error={Boolean(touched.citizen && errors.citizen)}
            fullWidth
            helperText={touched.citizen && errors.citizen}
            label="Số Căn cước công dân"
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
            label="Địa chỉ"
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
            label="Số điện thoại"
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
            label="Mật khẩu"
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
              Bạn đã đọc
              {' '}
              <Link
                component="a"
                href="#"
                color="secondary"
              >
                Điều khoản và Điều kiện
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
              Tạo tài khoản
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
