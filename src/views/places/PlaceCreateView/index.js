import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import PlaceCreateForm from './PlaceCreateForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: 100
  }
}));

function PlaceCreateView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Place Create"
    >
      <Container maxWidth="lg">
        <Header />
        <PlaceCreateForm />
      </Container>
    </Page>
  );
}

export default PlaceCreateView;
