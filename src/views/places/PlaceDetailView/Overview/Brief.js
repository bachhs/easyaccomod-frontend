import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  CardMedia
} from '@material-ui/core';
import Maps from 'src/components/Maps';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BathtubIcon from '@material-ui/icons/Bathtub';
import FaceIcon from '@material-ui/icons/Face';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HouseIcon from '@material-ui/icons/House';
import KitchenIcon from '@material-ui/icons/Kitchen';
import OpacityIcon from '@material-ui/icons/Opacity';
import SquareFootIcon from '@material-ui/icons/SquareFoot';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

const useStyles = makeStyles((theme) => ({
  root: {},
  chip: {
    marginBottom: 8
  },
  image: {
    height: 350
  },
  imageRoot: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    }
  },
  image1Container: {
    height: 400,
    [theme.breakpoints.down('md')]: {
      height: 500
    },
    [theme.breakpoints.down('xs')]: {
      height: 250
    }
  },
  image2Container: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      height: 0
    }
  },
  image3Container: {
    height: 200,
    [theme.breakpoints.down('md')]: {
      height: 0
    },
  },
  allWiewButton: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: '#ffffff',
    color: theme.palette.common.dark,
    [theme.breakpoints.down('md')]: {
      bot: theme.spacing(2),
      top: 'auto'
    },
    '&:hover': {
      backgroundColor: '#66c2ff'
    }
  },
  image1: {
    maxWidth: '99%',
    minWidth: '99%',
    height: 400,
    [theme.breakpoints.down('md')]: {
      height: 500
    },
    [theme.breakpoints.down('xs')]: {
      height: 250
    },
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.85'
    }
  },
  image2: {
    maxWidth: '100%',
    minWidth: '100%',
    height: 196,
    [theme.breakpoints.down('md')]: {
      minHeight: 0,
      height: 0
    },
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.85'
    },
  },
  image3: {
    maxWidth: '100%',
    minWidth: '100%',
    height: 200,
    [theme.breakpoints.down('md')]: {
      minHeight: 0,
      height: 0
    },
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.85'
    }
  },
}));

function Brief({ place, className, ...rest }) {
  const classes = useStyles();

  return (
    <>
      <Box mb={3}>
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardHeader
            title="Hình ảnh"
          >
            <Typography
              variant="h4"
              color="textPrimary"
            >
              Hình ảnh
            </Typography>
          </CardHeader>
          <CardContent>
            <Grid
              container
              className={clsx(classes.imageRoot, className)}
            >
              <Grid
                item
                className={clsx(classes.image1Container, className)}
                xl={7}
                lg={7}
                xs={12}
              >
                <CardMedia
                  className={classes.image1}
                  image={place.images[0]}
                />
              </Grid>
              <Grid
                item
                xl={5}
                lg={5}
                xs={12}
              >
                <Grid
                  container
                >
                  <Grid
                    item
                    className={clsx(classes.image2Container, className)}
                    md={12}
                  >
                    <CardMedia
                      className={classes.image2}
                      image={place.images[1]}
                    />
                  </Grid>
                  <Grid
                    item
                    className={clsx(classes.image3Container, className)}
                    md={12}
                  >
                    <CardMedia
                      className={classes.image3}
                      image={place.images[2]}
                    />
                  </Grid>
                </Grid>
                <Button
                  className={classes.allWiewButton}
                  variant="contained"
                  startIcon={<ViewComfyIcon className={classes.ViewComfyIcon} />}
                >
                  Hiển thị tất cả
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  Địa chỉ
                </Typography>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  style={{ marginTop: 3 }}
                >
                  {place.address}
                </Typography>
                <Box mt={1}>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                  >
                    Thông tin chung
                  </Typography>
                  <Grid
                    container
                  >
                    <Grid
                      item
                      sm={6}
                      md={6}
                    >
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <HouseIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Loại phòng" secondary={place.type} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <HouseIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Số phòng" secondary={place.room} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <SquareFootIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Diện tích" secondary={`${place.area} m2`} />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid
                      item
                      sm={6}
                      md={6}
                    >
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <AttachMoneyIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Giá phòng" secondary={`${place.price} VNĐ`} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <FlashOnIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Giá điện" secondary={`${place.electricPrice} VNĐ/1`} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <OpacityIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Giá nước" secondary={`${place.waterPrice} VNĐ/1`} />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    style={{ marginBottom: 10 }}
                  >
                    Cơ sở vật chất
                  </Typography>
                  <Grid>
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<KitchenIcon />}
                      label={place.kitchen}
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid>
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<BathtubIcon />}
                      label={`Phòng tắm ${place.bathroom}`}
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid>
                    {place.host && (
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<FaceIcon />}
                      label="Chung chủ"
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                    )}
                  </Grid>
                  <Grid>
                    {place.airconditioner && (
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<AcUnitIcon />}
                      label="Điều hòa"
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                    )}
                  </Grid>
                  <Grid>
                    {place.balcony && (
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<HouseIcon />}
                      label="Ban công"
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                    )}
                  </Grid>
                  <Grid>
                    {place.waterHeater && (
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<FireplaceIcon />}
                      label="Nóng lạnh"
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                    )}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box mt={0.6}>
              <Typography
                variant="h4"
                color="textPrimary"
              >
                Thông tin thêm
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ marginTop: 3 }}
              >
                {place.description}
              </Typography>
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography
              variant="h3"
              color="textPrimary"
              style={{ marginBottom: 5 }}
            >
              Vị trí
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginBottom: 10 }}
            >
              {place.address}
            </Typography>
            <Maps marker={place.location} />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

Brief.propTypes = {
  place: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Brief;
