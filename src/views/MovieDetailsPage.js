import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import tvApi from '../services/tv-api';
import styles from './MovieDetailsPage.module.css';
import Cast from './Cast';
import Review from './Reviews';
import propTypes from 'prop-types';

class MovieDetailsPage extends Component {
    state = {
        show: null
    }

    componentDidMount() {
        console.log('movieId: ', this.props.match.params.movieId);
        tvApi.getFilmById(this.props.match.params.movieId)
            .then(show => this.setState({ show }))
    }

    handleGoBack = () => {
        if (this.props.location.state && this.props.location.state.from) {
            this.props.history.push(this.props.location.state.from);
        }
    }

    render() {
        const imgBasePath = tvApi.imgBasePath;

        return (
            <>
                <button onClick={this.handleGoBack}> Назад</button>

                {this.state.show && (
                    <div>
                        <div className={styles.wrapPage}>
                            <div className={styles.posterWrap}>
                                <img className={styles.posterImg}
                                    src={imgBasePath + this.state.show.poster_path}
                                    alt={this.state.show.title}>
                                </img>
                            </div>

                            <div className={styles.description}>
                                <h2>
                                    {this.state.show.title}
                                    {this.state.show.release_date &&
                                        ` (${this.state.show.release_date.substring(0, 4)})`}
                                </h2>

                                <p>vote_average: {this.state.show.vote_average}</p>
                                <h3>Genres</h3>
                                <p>{this.state.show.genres && this.state.show.genres.map(genre => genre.name + ' ')}</p>
                            </div>

                        </div>
                        <h3>Additional information</h3>
                        <ul>
                            <li>
                                <Link to={{
                                    pathname: `/movies/${this.props.match.params.movieId}/cast`,
                                    state: { from: this.props.location }
                                }}>Cast</Link>
                            </li>
                            <li>
                                <Link to={{
                                    pathname: `/movies/${this.props.match.params.movieId}/review`,
                                    state: { from: this.props.location }
                                }}>Reviews</Link>
                            </li>
                        </ul>
                        <Switch>
                            <Route
                                path={`/movies/${this.props.match.params.movieId}/cast`}
                                render={props => <Cast {...props}
                                id={this.props.match.params.movieId}
                                />}
                            />
                            <Route
                                path={`/movies/${this.props.match.params.movieId}/review`}
                                render={props => <Review {...props} id={this.props.match.params.movieId} />}
                            />
                        </Switch>
                    </div>

                )
                }
            </>
        )
    }
}

export default MovieDetailsPage;

