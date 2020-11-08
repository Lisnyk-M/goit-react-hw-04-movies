import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../routes';
import Shows from '../views/Shows';
import NotFound from '../views/NotFound';
import Navigation from './Navigation/Navigation';
import Layout from './Layout/Layout';
import MoviesPage from '../views/MoviesPage';
import MovieDetailsPage from '../views/MovieDetailsPage';
import '../common.css';
import '../views/index.css';

const App = () => <Layout>
    <Navigation />
    <Switch>
        <Route path={routes.home} exact component={Shows} />
        <Route path={routes.movies} exact component={MoviesPage} />
        <Route path={routes.MovieDetailsPage} component={MovieDetailsPage} />
        <Route component={NotFound} />
        {/* <Redirect to="/" /> */}
    </Switch>
</Layout>

export default App;
