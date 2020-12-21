import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';
import {
  createStyles,
  makeStyles,
  ThemeProvider
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment/locale/vi';
import Auth from 'src/components/Auth';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import Routes from 'src/Routes';

const history = createBrowserHistory();

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

function App() {
  useStyles();

  const { settings } = useSettings();

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
          <Router history={history}>
            <Auth>
              <Routes />
            </Auth>
          </Router>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
