import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Chip,
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
}));

function Brief({ place, className, ...rest }) {
  const classes = useStyles();

  return (
    <>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
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
                variant="subtitle2"
                color="textSecondary"
              >
                Địa chỉ
              </Typography>
              <Typography
                variant="h6"
                color="textPrimary"
              >
                {place.address}
              </Typography>
              <Box mt={3}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                >
                  Thông tin chung
                </Typography>
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
                    <ListItemText primary="Diện tích" secondary={place.area} />
                  </ListItem>
                </List>
              </Box>
              <Box mt={3}>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                >
                  Cơ sở vật chất
                </Typography>
                <Chip
                  icon={<FaceIcon />}
                  label={place.kitchen}
                  clickable
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<FaceIcon />}
                  label={`Phòng tắm ${place.bathroom}`}
                  clickable
                  color="primary"
                  variant="outlined"
                />
                {place.host && (
                <Chip
                  icon={<FaceIcon />}
                  label="Chung chủ"
                  clickable
                  color="primary"
                  variant="outlined"
                />
                )}
                {place.airconditioner
              && (
              <Chip
                icon={<FaceIcon />}
                label="Điều hòa"
                clickable
                color="primary"
                variant="outlined"
              />
              )}
                {place.balcony && (
                <Chip
                  icon={<FaceIcon />}
                  label="Ban công"
                  clickable
                  color="primary"
                  variant="outlined"
                />
                )}
                {place.waterHeater && (
                <Chip
                  icon={<FaceIcon />}
                  label="Nóng lạnh"
                  clickable
                  color="primary"
                  variant="outlined"
                />
                )}
              </Box>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              Thông tin thêm
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
            >
              {place.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <Maps marker={place.location} />
      </Card>
    </>
  );
}

Brief.propTypes = {
  place: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Brief;
