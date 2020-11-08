import React, { Component } from 'react';
import tvApi from '../services/tv-api';
import propTypes from 'prop-types';

class Review extends Component {
    state = {
        reviews: []
    }

    componentDidMount() {
        tvApi.getReviewsById(this.props.id).then(reviews => this.setState({ reviews: reviews.results }));
    }

    render() {

        return (
            <>
                <h2>reviews:</h2>
                <ul>
                    {this.state.reviews && this.state.reviews.length > 0 ?
                        this.state.reviews.map(el => <li key={el.id}>
                            <p>Character: {el.content}</p>
                        </li>) :
                        <p>We don't have any reviews for this movie</p>}
                </ul>
            </>
        )
    }
}

Review.propTypes = {
    id: propTypes.string.isRequired
}

export default Review;