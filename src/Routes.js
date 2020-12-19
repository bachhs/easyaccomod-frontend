import React, {
  lazy,
  Suspense
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import GuestRoute from 'src/components/GuestRoute';
import ActivatedRoute from 'src/components/ActivatedRoute';
import MainLayout from 'src/layouts/MainLayout';

function Routes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <GuestRoute
          exact
          path="/login"
          component={lazy(() => import('src/views/auth/LoginView'))}
        />
        <GuestRoute
          exact
          path="/register"
          component={lazy(() => import('src/views/auth/RegisterView'))}
        />
        <Route
          exact
          path="/404"
          component={lazy(() => import('src/views/pages/Error404View'))}
        />
        <Route
          path="*"
          render={(props) => (
            <MainLayout {...props}>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={lazy(() => import('src/views/places/PlaceListView'))}
                />
                <ActivatedRoute
                  exact
                  path="/places/new"
                  component={lazy(() => import('src/views/places/PlaceCreateView'))}
                />
                <Route
                  exact
                  path="/places/:pid"
                  component={lazy(() => import('src/views/places/PlaceDetailView'))}
                />
                <Route
                  exact
                  path="/users/:uid"
                  component={lazy(() => import('src/views/users/ProfileView'))}
                />
                <Redirect to="/404" />
              </Switch>
            </MainLayout>
          )}
        />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
}

export default Routes;
