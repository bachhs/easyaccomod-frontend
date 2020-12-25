import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  List,
  ListItem,
  Typography,
  Grid,
  Divider,
  Link
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1, 0),
    backgroundImage: `url(${'http://serquis.com/NEW/wp-content/uploads/2012/12/footerbg.png'})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  footerContainer: {
    maxWidth: '100%',
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(1.5),
    color: 'rgba(255,255,255,.6)',
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 30,
    color: 'black'
  },
  listIcon: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  copyRight: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  Typo: {
    padding: theme.spacing(1.5)
  },
  Container: {
    padding: theme.spacing(1.5)
  }
}));

const Footer = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.footerContainer}>
        <Grid
          container
          justify="space-between"
          className={classes.Container}
        >
          <Grid
            item
          >
            <Typography
              color="inherit"
              variant="h5"
              className={classes.Typo}
            >
              Giới thiệu
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Phương thức hoạt động
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Điều khoản sử dụng
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Quyền riêng tư
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Trợ giúp
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Thông tin doanh nghiêp
            </Typography>
          </Grid>
          <Grid
            item
          >
            <Typography
              color="inherit"
              variant="h5"
              className={classes.Typo}
            >
              Hỗ trợ
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Chủ nhà
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Thành viên
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Gia hạn bài đăng
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Báo cáo bài viết
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Ứng tuyển việc làm công ty
            </Typography>
          </Grid>
          <Grid
            item
          >
            <Typography
              color="inherit"
              variant="h5"
              className={classes.Typo}
            >
              Thanh toán
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              BIDV 12131313133213
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Vietcombank 12131313133213
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              TPbank 12131313133213
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Momo 0387005857
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Momo 0358144758
            </Typography>
          </Grid>
          <Grid
            item
          >
            <Typography
              color="inherit"
              variant="h5"
              className={classes.Typo}
            >
              Liên hệ
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              <Link
                href="https://www.facebook.com/bachhs"
                variant="body2"
                color="inherit"
                target="blank"
              >
                Admin Bachhs
              </Link>
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              <Link
                href="https://www.facebook.com/VSsYii"
                variant="body2"
                color="inherit"
                target="blank"
              >
                Admin VSsYii
              </Link>
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Bà chủ web
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Đội ngũ tư vấn viên
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              className={classes.Typo}
            >
              Đội ngũ hỗ trợ
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          justify="space-between"
        >
          <Grid
            item
            className={classes.copyRight}
          >
            <Typography style={{ marginLeft: 20, paddingTop: 10 }}>
              © 2020 Rune Team. All rights reserved
            </Typography>
          </Grid>
          <Grid
            item
            className={classes.listIcon}
          >
            <List className={classes.listIcon} disablePadding>
              <ListItem disableGutters>
                <IconButton className={classes.socialIcon}>
                  <FacebookIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <InstagramIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <TwitterIcon className={classes.icon} />
                </IconButton>
                <IconButton className={classes.socialIcon}>
                  <YouTubeIcon className={classes.icon} />
                </IconButton>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
