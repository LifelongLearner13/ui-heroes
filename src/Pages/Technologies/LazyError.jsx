import React from 'react';
import Banner from 'common/Banner';

const LazyError = () => (
  <Banner
    type={Banner.TYPE.error}
    message="Something went wrong while loading requested technology."
  />
);

LazyError.whyDidYouRender = true;

export default LazyError;
