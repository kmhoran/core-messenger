import React from 'react';
import PropTypes from 'prop-types';
import HomeHeader from './homeHeader';
import HomeContainer from './homeContainer';

export default function Home(props) {
  return (
    <div>
      <HomeHeader />
      <HomeContainer />
    </div>
  );
}

Home.propTypes = {
  notify: PropTypes.func,
};
