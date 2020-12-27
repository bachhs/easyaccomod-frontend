import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Chip,
  Divider,
  Input,
  Slider,
  Typography,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';

const selectOptions = [
  {
    label: 'Loại phòng',
    options: [
      'Phòng trọ',
      'Chung cư',
      'Nhà nguyên căn']
  },
  {
    label: 'Phòng tắm',
    options: ['Khép kín', 'Chung']
  },
  {
    label: 'Bếp',
    options: [
      'Khu bếp riêng',
      'Khu bếp chung',
      'Không nấu ăn',
    ]
  },
  {
    label: 'Đồ đạc',
    options: ['Điều hòa', 'Nóng lạnh']
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

function Filter({ className, ...rest }) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [price, setPrice] = useState([0, 100]);

  const handleChipDelete = (chip) => {
    setChips((prevChips) => prevChips.filter((prevChip) => chip !== prevChip));
  };

  const handleMultiSelectChange = (value) => {
    setChips(value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        p={2}
        display="flex"
        alignItems="center"
      >
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              setInputValue(event.target.value);
            }
          }}
          placeholder="Enter a keyword"
          value={inputValue}
        />
      </Box>
      <Divider />
      <Box
        p={2}
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        <Typography id="range-slider" gutterBottom>
          Temperature range
        </Typography>
        <Slider
          value={price}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
        />
        {chips.map((chip) => (
          <Chip
            className={classes.chip}
            key={chip}
            label={chip}
            onDelete={() => handleChipDelete(chip)}
          />
        ))}
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        p={1}
      >
        {selectOptions.map((option) => (
          <MultiSelect
            key={option.label}
            label={option.label}
            onChange={handleMultiSelectChange}
            options={option.options}
            value={chips}
          />
        ))}
        <Box flexGrow={1} />
      </Box>
    </Card>
  );
}

Filter.propTypes = {
  className: PropTypes.string
};

export default Filter;
