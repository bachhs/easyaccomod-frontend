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
  CardHeader
} from '@material-ui/core';
import Maps from 'src/components/Maps';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FaceIcon from '@material-ui/icons/Face';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HouseIcon from '@material-ui/icons/House';
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
    position: 'relative'
  },
  image1Container: {
    backgroundColor: 'red',
    height: 400,
    borderRight: 3,
    borderRightColor: '#ffffff',
    borderRightStyle: 'solid',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      height: 250
    }
  },
  image2Container: {
    backgroundColor: 'yellow',
    height: 200,
    borderBottom: 3,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ffffff',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      height: 0
    }
  },
  image3Container: {
    backgroundColor: 'green',
    height: 200,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      height: 0
    }
  },
  changeButton: {
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
      backgroundColor: '#red'
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  },
  image1111: {
    objectFit: 'cover',
    height: 400
  }
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
          <Divider />
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
                <image className={clsx(classes.image1111, className)} src="https://i.imgur.com/BzjmIgD.png" alt="Minh hoa" />
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
                    sm={6}
                    md={12}
                    style={{ backgroundImage: `url(${'https://img3.goodfon.com/wallpaper/nbig/3/b1/asus-rog-wallpaper-dark.jpg'})` }}
                  />
                  <Grid
                    item
                    className={clsx(classes.image3Container, className)}
                    sm={6}
                    md={12}
                    style={{ backgroundImage: `url(${'https://rog.asus.com/media/1589570302548.jpg'})` }}
                  />
                </Grid>
                <Button
                  className={classes.changeButton}
                  variant="contained"
                >
                  <ViewComfyIcon className={classes.addPhotoIcon} />
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
                      sm={12}
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
                      sm={12}
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
                      icon={<FaceIcon />}
                      label={place.kitchen}
                      clickable
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid>
                    <Chip
                      className={clsx(classes.chip, className)}
                      icon={<FaceIcon />}
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
                      icon={<FaceIcon />}
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
                      icon={<FaceIcon />}
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
                      icon={<FaceIcon />}
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
