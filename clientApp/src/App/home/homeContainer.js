import React from 'react';
import HomeSpeakersCarousel from './homeSpeakersCarousel';

export default function HomeContainer() {
  return (
    <div className="container-main events">
      <div className="row">
        <div className="col-12">
          <HomeSpeakersCarousel />
        </div>
      </div>
    </div>
  );
}
