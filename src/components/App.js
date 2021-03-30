import React from 'react';
import { connect } from 'react-redux';
import { Route, useHistory, Switch, useParams } from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { fetchCityData } from '../state/actions';
import 'antd/dist/antd.less';
import 'mapbox-gl/dist/mapbox-gl.css';

import { NotFoundPage } from './pages/NotFound';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { config } from '../utils/oktaConfig';
import { LoadingComponent } from './common';
import { CitySearchResultsPage } from './pages/CitySearchResults';
import { UserDashboardPage } from './pages/UserDashboard';
import { PinnedCityPage } from './pages/PinnedCity';

const App = () => {
  const { push } = useHistory();
  const { id, city, state } = useParams();

  const authHandler = () => {
    push('/login');
  };

  const onSearchSubmit = cityAndState => {
    fetchCityData(cityAndState);
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />

        <SecureRoute
          path="/"
          exact
          component={() => (
            <HomePage
              LoadingComponent={LoadingComponent}
              onSearchSubmit={onSearchSubmit}
            />
          )}
        />

        <SecureRoute path="/profile/:id/dashboard" exact>
          <UserDashboardPage id={id} />
        </SecureRoute>

        <SecureRoute path="/:state/:city" exact>
          <CitySearchResultsPage city={city} state={state} />
        </SecureRoute>

        <SecureRoute path="/pinned/:state/:city" exact>
          <PinnedCityPage city={city} state={state} />
        </SecureRoute>

        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
};

export default connect(null, { fetchCityData })(App);
