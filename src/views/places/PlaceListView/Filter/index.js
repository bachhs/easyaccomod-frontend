import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  Box,
  Card,
  Chip,
  Divider,
  Input,
  Slider,
  Typography,
  makeStyles,
  Grid,
  Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';

const selectOptions = [
  {
    label: 'Loại phòng',
    options: [
      'Phòng trọ',
      'Chung cư',
      'Nhà nguyên căn'
    ]
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
  },
  slider: {
    width: '88%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: '1.5%'
  },
  button: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: '2%'
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Filter({ className, ...rest }) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [price, setPrice] = useState([0, 20]);
  const history = useHistory();
  const queryString = useQuery();

  useEffect(() => {
    if (queryString.has('q')) { setInputValue(queryString.get('q')); }
    if (queryString.has('type')) {
      setChips((oldChips) => [...oldChips, ...queryString.getAll('type')]);
    }
    if (queryString.has('bathroom')) {
      setChips((oldChips) => [...oldChips, ...queryString.getAll('bathroom')]);
    }
    if (queryString.has('kitchen')) {
      setChips((oldChips) => [...oldChips, ...queryString.getAll('kitchen')]);
    }
    if (queryString.has('airconditioner')) {
      setChips((oldChips) => [...oldChips, 'Điều hòa']);
    }
    if (queryString.has('waterHeater')) {
      setChips((oldChips) => [...oldChips, 'Nóng lạnh']);
    }
    if (queryString.has('start') && queryString.has('end')) {
      setPrice([parseInt(queryString.get('start'), 10), parseInt(queryString.get('end'), 10)]);
    }
  }, []);

  const handleChipDelete = (chip) => {
    setChips((prevChips) => prevChips.filter((prevChip) => chip !== prevChip));
  };

  const handleMultiSelectChange = (value) => {
    setChips(value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const onButtonClick = () => {
    let query = `/?q=${inputValue}`;
    chips.forEach((chip) => {
      if (selectOptions[0].options.includes(chip)) {
        query += `&type=${chip}`;
      }
      if (selectOptions[1].options.includes(chip)) {
        query += `&bathroom=${chip}`;
      }
      if (selectOptions[2].options.includes(chip)) {
        query += `&kitchen=${chip}`;
      }
      if (chip === 'Điều hòa') {
        query += '&airconditioner=1';
      }
      if (chip === 'Nóng lạnh') {
        query += '&waterHeater=1';
      }
    });

    query += `&start=${price[0]}`;
    query += `&end=${price[1]}`;
    query += '&page=1';
    history.push(query);
  };

  const marks = [
    {
      value: 0,
      label: 'triệu VNĐ',
    },
    {
      value: 20,
      label: '20 triệu VNĐ',
    },
  ];

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
          placeholder="Nhập tên bài hoặc địa chỉ"
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
        <Typography
          id="range-slider"
          gutterBottom
          variant="h6"
          color="textPrimary"
        >
          MỨC GIÁ
        </Typography>
        <div className={classes.slider}>
          <Slider
            value={price}
            onChange={handlePriceChange}
            min={0}
            max={20}
            step={0.5}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </div>
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
      <Grid
        container
        justify="space-between"
      >
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
        <Box className={classes.button}>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={onButtonClick}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Grid>
    </Card>
  );
}

Filter.propTypes = {
  className: PropTypes.string
};

export default Filter;
