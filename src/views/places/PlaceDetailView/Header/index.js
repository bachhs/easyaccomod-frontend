import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/vi';
import {
  Box,
  Button,
  Grid,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReportIcon from '@material-ui/icons/Report';
import CheckIcon from '@material-ui/icons/Check';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ClearIcon from '@material-ui/icons/Clear';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FavoriteIcon from '@material-ui/icons/Favorite';

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
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ place, className, ...rest }) {
  const classes = useStyles();

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
        <Button className={classes.action}>
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
        >
          <SvgIcon
            fontSize="small"
            className={classes.actionIcon}
          >
            <FavoriteIcon />
          </SvgIcon>
          Yêu thích
        </Button>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  place: PropTypes.object.isRequired
};

Header.defaultProps = {};

export default Header;