import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'common/Header';

/* Only loads components when requested by user, must be called within `Suspense` */
const Technologies = lazy(() => import('Pages/Technologies'));
const Home = lazy(() => import('Pages/Home'));
const Attribution = lazy(() => import('common/Attribution'));

const App = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header />
      <Router>
        <Suspense fallback="Loading...">
          <Switch>
            <Route
              exact
              path="/technologies/:technology"
              component={Technologies}
            />
            <Route component={Home} />
          </Switch>
          <Route
            exact
            path="/technologies/:technology"
            component={Attribution}
          />
        </Suspense>
      </Router>
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

App.whyDidYouRender = true;

export default App;
