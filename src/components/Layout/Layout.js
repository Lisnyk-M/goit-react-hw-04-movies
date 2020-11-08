import React from 'react';
import propTypes from 'prop-types';

const Layout = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

Layout.propTypes = {
    children: propTypes.node
}

export default Layout;