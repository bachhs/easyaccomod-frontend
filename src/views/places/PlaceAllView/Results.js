import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  makeStyles,
  TableContainer
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import getInitials from 'src/utils/getInitials';
import Label from 'src/components/Label';

const tabs = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: 'unactivated',
    label: 'Chưa duyệt'
  },
];

function applyFilters(places, filters) {
  return places.filter((place) => {
    let matches = true;

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && place.activated === value) {
        matches = false;
      }
    });

    return matches;
  });
}
const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

function Results({
  className, places, activatePlace, ...rest
}) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    unactivated: null,
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      unactivated: null,
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }
    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const filteredPlaces = applyFilters(places, filters);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
          />
        ))}
      </Tabs>
      <Divider />
      <PerfectScrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Tên bài
                </TableCell>
                <TableCell>
                  Chủ sở hữu
                </TableCell>
                <TableCell>
                  Địa chỉ
                </TableCell>
                <TableCell>
                  Trạng Thái
                </TableCell>
                <TableCell>
                  Phòng
                </TableCell>
                <TableCell>
                  Lượt xem
                </TableCell>
                <TableCell>
                  Sao
                </TableCell>
                <TableCell align="right">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlaces.map((place) => (
                <TableRow
                  hover
                  key={places.id}
                >
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to={`/places/${place.id}`}
                      variant="h6"
                    >
                      {place.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={place.creator.avatar}
                      >
                        {getInitials(place.creator.avatar)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to={`/users/${place.creator.id}`}
                          variant="h6"
                        >
                          {place.creator.username}
                        </Link>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {place.creator.email}
                        </Typography>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {place.address}
                  </TableCell>
                  <TableCell>
                    <Label color={(!place.activated) ? 'error' : 'success'}>
                      {(!place.activated)
                        ? 'Chưa duyệt'
                        : 'Đã duyệt'}
                    </Label>
                  </TableCell>
                  <TableCell>
                    <Label color={(!place.available) ? 'error' : 'success'}>
                      {(!place.available)
                        ? 'Hết phòng'
                        : 'Còn phòng'}
                    </Label>
                  </TableCell>
                  <TableCell>
                    {place.views}
                  </TableCell>
                  <TableCell>
                    {place.star}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => activatePlace(place.id)}
                    >
                      <CheckIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </PerfectScrollbar>
    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  activatePlace: PropTypes.func,
  places: PropTypes.array
};

Results.defaultProps = {
  places: []
};

export default Results;
