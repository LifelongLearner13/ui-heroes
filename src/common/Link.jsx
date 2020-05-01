import React, { memo } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';

/**
 * Helper function which provides Ref forwardings.
 */
const WrappedRouterLink = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

/**
 *
 * @param {string} to - URL path to navigate to
 * @param {object} classes - Style rules to override thoes defined by the component
 * @param {string} className - CSS class names
 */
const Link = React.forwardRef((props, ref) => (
  <MuiLink
    component={WrappedRouterLink}
    underline="none"
    ref={ref}
    {...props}
  />
));

Link.whyDidYouRender = true;

export default memo(Link);
