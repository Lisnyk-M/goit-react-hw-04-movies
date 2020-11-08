import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import routes from '../../routes';

const Navigation = () => <ul>
    <li>
        <Link exact="true" to={routes.home}>Home</Link>
    </li>
    <li>
        <NavLink
            to={routes.movies}
            className="Navigation-link"
            activeClassName="Navigation-link-active">
            Movies
        </NavLink>
    </li>

</ul>

export default Navigation;