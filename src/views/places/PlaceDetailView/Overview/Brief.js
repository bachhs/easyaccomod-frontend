import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import Maps from 'src/components/Maps';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import FaceIcon from '@material-ui/icons/Face';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles(() => ({
  root: {},
  chip: {
    marginBottom: 8
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
          <CardContent>
            <Typography
              variant="h4"
              color="textPrimary"
            >
              Hình ảnh minh họa
            </Typography>
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
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Loại phòng" secondary={place.type} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <WorkIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Số phòng" secondary={place.room} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <BeachAccessIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Diện tích" secondary={`${place.price} m2`} />
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
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Giá phòng" secondary={`${place.price} VNĐ`} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <WorkIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Giá điện" secondary={`${place.electricPrice} VNĐ/1`} />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <BeachAccessIcon />
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
