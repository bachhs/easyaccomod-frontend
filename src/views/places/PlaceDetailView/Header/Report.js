import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Alert } from '@material-ui/lab';
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  helperText: {
    textAlign: 'right',
    marginRight: 0
  }
}));

function Report({
  open,
  onClose,
  onApply,
  className,
  ...rest
}) {
  const [value, setValue] = useState('');
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleApply = () => {
    enqueueSnackbar('Request sent', {
      variant: 'success'
    });
    onApply();
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <div
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Typography
          align="center"
          className={classes.title}
          gutterBottom
          variant="h3"
          color="textPrimary"
        >
          Báo cáo bài đăng
        </Typography>
        <Alert
          severity="error"
        >
          <Typography
            align="center"
            variant="subtitle2"
            color="textSecondary"
          >
            Nếu bạn chắc chắn đây là một nội dung vi phạm, viết lí do vào form bên dưới
          </Typography>
        </Alert>
        <Box mt={3}>
          <TextField
            autoFocus
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            fullWidth
            helperText={`${300 - value.length} kí tự còn lại`}
            label="Báo cáo"
            multiline
            onChange={handleChange}
            placeholder="Bài đăng đã vi phạm gì?"
            rows={5}
            value={value}
            variant="outlined"
          />
        </Box>
        <Box
          mt={3}
          p={3}
        >
          <Button
            onClick={handleApply}
            variant="contained"
            fullWidth
            color="primary"
          >
            Hoàn tất báo cáo
          </Button>
        </Box>
      </div>
    </Dialog>
  );
}

Report.propTypes = {
  className: PropTypes.string,
  onApply: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

Report.defaultProps = {
  onApply: () => {},
  onClose: () => {}
};

export default Report;
