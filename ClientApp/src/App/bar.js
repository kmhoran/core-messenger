import React from 'react';
import PropTypes from 'prop-types';

class Foo extends React.Component {
    render() {
        return (
            <div>Foo Bar!!!</div>
        );
    }
}

Foo.propTypes = {};
Foo.defaultProps = {};

export default Foo;