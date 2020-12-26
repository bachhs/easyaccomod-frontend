/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Grid,
  SvgIcon,
  Typography,
  IconButton,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ReportIcon from '@material-ui/icons/Report';
import CheckIcon from '@material-ui/icons/Check';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Report from './Report';

const useStyles = makeStyles((theme) => ({
  root: {},
  badge: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  badgeIcon: {
    marginRight: theme.spacing(1)
  },
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  buttonActivated: {
    '&:hover': {
      backgroundColor: theme.palette.background.dark
    }
  },
  checkCircleIcon: {
    fill: theme.palette.success.main,
    fontSize: 20
  },
  HighlightOffIcon: {
    fill: theme.palette.error.main,
    fontSize: 20
  }
}));

function Header({
  place, activatePlace, setAvailablePlace, className, ...rest
}) {
  const classes = useStyles();
  const account = useSelector((state) => state.account);
  const history = useHistory();
  const [openReport, setOpenReport] = useState(false);

  const handleReportOpen = () => {
    setOpenReport(true);
  };

  const handleReportClose = () => {
    setOpenReport(false);
  };
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (account.user) {
      axios
        .get(`${process.env.REACT_APP_API}/users/${account.user.id}/favorite`)
        .then((response) => {
          setLiked(response.data.user.places.some((favorite) => favorite.id === place.id));
        });
    }
  }, []);

  const addFavorite = () => {
    if (!account.user) {
      history.push('/login');
    }
    axios.patch(`${process.env.REACT_APP_API}/users/favorite`, { placeId: place.id })
      .then(setLiked(!liked));
  };

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {place.title}
          {' '}
          <IconButton disabled style={{ marginLeft: -12 }}>
            {place.activated
              ? (<CheckCircleOutlineIcon className={clsx(classes.checkCircleIcon, className)} />)
              : (<HighlightOffIcon className={clsx(classes.HighlightOffIcon, className)} />)}
          </IconButton>
          {place.available && account.user && (account.user.role === 'admin' || place.creator === account.user.id) && (
            <Button
              className={classes.badgeIcon}
              variant="outlined"
              color="secondary"
              startIcon={<HomeOutlinedIcon />}
              onClick={() => setAvailablePlace(place.id)}
            >
              Hết phòng
            </Button>
          )}
          {!place.activated && account.user && (account.user.role === 'admin') && (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => activatePlace(place.id)}
              >
                Duyệt
              </Button>
            </>
          )}
          {account.user && (account.user.role === 'admin' || place.creator === account.user.id) && (
          <Tooltip title="Sửa bài đăng">
            <IconButton href={`${place.id}/edit`}>
              <EditOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
          )}
        </Typography>
        <Box
          mx={-2}
          display="flex"
          color="text.secondary"
          alignItems="center"
          flexWrap="wrap"
        >
          <div className={classes.badge}>
            <SvgIcon
              fontSize="small"
              className={classes.badgeIcon}
            >
              {place.available ? <CheckIcon /> : <ClearIcon /> }
            </SvgIcon>
            <Typography
              variant="body1"
              color="inherit"
              component="span"
            >
              {place.available ? 'Còn phòng' : 'Không còn phòng'}
            </Typography>
          </div>
          <div className={classes.badge}>
            {moment(place.endDate).isAfter(moment().toDate())
              ? (
                <>
                  <SvgIcon
                    fontSize="small"
                    className={classes.badgeIcon}
                  >
                    <EventAvailableIcon />
                  </SvgIcon>
                  <Typography
                    variant="body1"
                    color="inherit"
                    component="span"
                  >
                    {`Kết thúc vào ${moment(place.endDate).fromNow()}`}
                  </Typography>
                </>
              )
              : (
                <>
                  <SvgIcon
                    fontSize="small"
                    className={classes.badgeIcon}
                  >
                    <EventBusyIcon />
                  </SvgIcon>
                  <Typography
                    variant="body1"
                    color="inherit"
                    component="span"
                  >
                    Liên hệ với admin để gia hạn bài viết
                  </Typography>
                </>
              )}
          </div>
          <div className={classes.badge}>
            <SvgIcon
              fontSize="small"
              className={classes.badgeIcon}
            >
              <AttachMoneyIcon />
            </SvgIcon>
            <Typography
              variant="body1"
              color="inherit"
              component="span"
            >
              {`Giá phòng: ${place.price} VNĐ`}
            </Typography>
          </div>
        </Box>
      </Grid>
      <Grid item>
        <Button className={classes.action} onClick={handleReportOpen}>
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <ReportIcon />
          </SvgIcon>
          Báo cáo
        </Button>
        <Button
          className={classes.action}
          variant="contained"
          color="secondary"
          onClick={addFavorite}
          startIcon={liked ? <CheckIcon /> : <FavoriteIcon />}
        >
          Yêu thích
        </Button>
        <Report
          author={place.creator}
          onApply={handleReportClose}
          onClose={handleReportClose}
          open={openReport}
        />
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  activatePlace: PropTypes.func,
  setAvailablePlace: PropTypes.func,
  place: PropTypes.object.isRequired
};

Header.defaultProps = {};

export default Header;
