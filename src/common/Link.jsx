import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Helper function which provides Ref forwardings.
 * @param {string} to - URL path to navigate to
 */
const Link = React.forwardRef(({ to, ...props }, ref) => (
  <RouterLink ref={ref} to={to} {...props} />
));

Link.whyDidYouRender = true;

export default Link;
