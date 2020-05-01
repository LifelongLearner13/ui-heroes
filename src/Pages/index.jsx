import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ConfigContextProvider } from 'contexts/ConfigContext';
import Header from 'common/Header';

/* Only loads components when requested by user, must be called within `Suspense` */
const Technologies = lazy(() => import('Pages/Technologies'));
const NavigationGrid = lazy(() => import('Pages/NavigationGrid'));
const Attribution = lazy(() => import('common/Attribution'));

const Pages = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <ConfigContextProvider>
        <Router>
          <Header />
          <Suspense fallback="Loading...">
            <Switch>
              <Route path="/:technology/:media" component={Technologies} />
              <Route path="/:technology" component={NavigationGrid} />
              <Route component={NavigationGrid} />
            </Switch>
            <Route path="/:technology/:media" component={Attribution} />
          </Suspense>
        </Router>
      </ConfigContextProvider>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flexGrow: 1,
  },
}));

Pages.whyDidYouRender = true;

export default Pages;
