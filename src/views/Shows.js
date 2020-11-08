import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import tvAPI from '../services/tv-api';

class Shows extends Component {
    state = {
        shows: []
    }

    componentDidMount() {
        tvAPI.getTrending().then(shows => this.setState({ shows }));
    }

    render() {
        const { shows } = this.state;
        const { match, location } = this.props;

        return (
            <div>
                <h1>Movies view</h1>
                {shows.length > 0 &&
                    <ul>
                        {shows.map(show => <li key={show.id}>
                            <Link to={{
                                pathname: `/movies${match.url}${show.id}`,
                                state: { from: location }
                            }}>{show.title || show.name}</Link>
                        </li>)}
                    </ul>}                
            </div>
        )
    }
}

export default Shows;