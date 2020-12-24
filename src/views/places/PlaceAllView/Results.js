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

export const roles = {
  Unapproved: 'Chưa duyệt',
  Approved: 'Đã duyệt'
};

const tabs = [
  {
    value: 'all',
    label: 'Tất cả'
  },
  {
    value: 'Unapproved',
    label: 'Chưa duyệt'
  },
  {
    value: 'Approved',
    label: 'Đã duyệt'
  }
];

function applyFilters(customers, filters) {
  return customers.filter((customer) => {
    let matches = true;

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && customer.role !== key) {
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
  className, customers, activateCustomer, ...rest
}) {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    Unapproved: null,
    Approved: null
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      Unapproved: null,
      Approved: null
    };

    if (value !== 'all') {
      updatedFilters[value] = true;
    }

    setFilters(updatedFilters);
    setCurrentTab(value);
  };

  const filteredCustomers = applyFilters(customers, filters);

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
                  Chủ sở hữu
                </TableCell>
                <TableCell>
                  Trạng Thái
                </TableCell>
                <TableCell>
                  Loại phòng
                </TableCell>
                <TableCell>
                  Địa chỉ
                </TableCell>
                <TableCell align="right">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={customer.avatar}
                      >
                        {getInitials(customer.username)}
                      </Avatar>
                      <div>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          to={`/users/${customer.id}`}
                          variant="h6"
                        >
                          {customer.username}
                        </Link>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {customer.email}
                        </Typography>
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Label color={(customer.role === 'Unapproved' && !customer.activated) ? 'error' : 'success'}>
                      {(customer.role === 'Unapproved' && !customer.activated)
                        ? 'Chưa duyệt'
                        : 'Đã duyệt'}
                    </Label>
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {customer.address}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => activateCustomer(customer.id)}
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
  activateCustomer: PropTypes.func,
  customers: PropTypes.array
};

Results.defaultProps = {
  customers: []
};

export default Results;
