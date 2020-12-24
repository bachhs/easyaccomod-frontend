import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  IconButton,
  Input,
  Paper,
  SvgIcon,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

function MessageAdd({
  className,
  disabled,
  onAdd,
  ...rest
}) {
  const classes = useStyles();
  const { uid } = useParams();
  const account = useSelector((state) => state.account);
  const [body, setBody] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSend = async () => {
    axios
      .post(`${process.env.REACT_APP_API}/chat/${uid}`, { message: body })
      .then(() => {
        setBody('');
        onAdd();
      })
      .catch((err) => {
        enqueueSnackbar(err.message || 'Không thể gửi tin nhắn', {
          variant: 'error'
        });
        onAdd();
      });
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13 && body) {
      handleSend();
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Avatar
        alt="Person"
        src={account.user.avatar}
      />
      <Paper
        variant="outlined"
        component={Box}
        flexGrow={1}
        ml={2}
        p={1}
      >
        <Input
          className={classes.input}
          disableUnderline
          fullWidth
          value={body}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip title="Send">
        <span>
          <IconButton
            color="secondary"
            disabled={!body || disabled}
            onClick={handleSend}
          >
            <SvgIcon fontSize="small">
              <SendIcon />
            </SvgIcon>
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

MessageAdd.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onAdd: PropTypes.func
};

MessageAdd.defaultProps = {
  className: '',
  disabled: false,
  onAdd: () => { }
};

export default MessageAdd;
