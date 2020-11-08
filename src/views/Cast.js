import React, { Component } from 'react';
import tvApi from '../services/tv-api';
import styles from './Cast.module.css';
import propTypes from 'prop-types';

class Cast extends Component {
    state = {
        cast: []
    }

    componentDidMount() {
        tvApi.getCastById(this.props.id).then(cast => this.setState({ cast: cast.cast }));
    }

    render() {
        const imgBasePath = tvApi.imgBasePath;

        return (
            <>
                <h2>Cast:</h2>
                <ul>
                    {this.state.cast && this.state.cast.map(el => <li className={styles.castItem} key={el.id}>
                        <img className={styles.castImage} src={imgBasePath + el.profile_path} alt={el.name} />
                        <p className={styles.castTitle}>{el.name}</p>
                        <p className={styles.castTitle}>Character: {el.character}</p>
                    </li>)}
                </ul>
            </>
        )
    }
}

Cast.propTypes = {
    id: propTypes.string.isRequired
}

export default Cast;