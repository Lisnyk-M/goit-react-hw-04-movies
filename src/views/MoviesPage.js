import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getQueryParams from '../utils/getQueryParams';
import tvApi from '../services/tv-api';


export default class MoviesPage extends Component {
    state = {
        show: null,
        searchValue: ''
    }

    componentDidMount() {
        const { query } = getQueryParams(this.props.location.search);
        if (query) {
            tvApi.getSearch(query)
                .then(show => this.setState({ show }))
                .finally(this.setState({ searchValue: '' }));
        }
    }

    componentDidUpdate(prevProps, PrevState) {
        const { query: nextQuery } = getQueryParams(this.props.location.search);
        const { query: prevQuery } = getQueryParams(prevProps.location.search);
        console.log('prevQuery, nextQuery: ', prevQuery, nextQuery);

        if (prevQuery !== nextQuery) {
            tvApi.getSearch(nextQuery)
                .then(show => this.setState({ show }))
                .finally(this.setState({ searchValue: '' }));
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('e.target.value: ', e.target.value);

        this.props.history.push({
            ...this.props.location,
            search: `query=${this.state.searchValue}`
        });
    }

    handleChangeInput = (e) => {
        this.setState({ searchValue: e.target.value });
        // const parsed = getQueryParams(this.props.location.search);
    }

    render() {
        const { match } = this.props;

        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter search ..."
                        onChange={this.handleChangeInput}
                        value={this.state.searchValue} />
                </form>
                <ul>
                    {this.state.show && this.state.show.map(el => <li key={el.id}>
                        <Link to={{
                            pathname: `${match.url}/${el.id}`,
                            state: { from: this.props.location }
                        }}>
                            {el.title}
                        </Link>
                    </li>)}
                </ul>
            </>
        )
    }
}