import React, { Suspense, lazy, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';

/**
 * Lazy load React component dynamically.
 * @param {string} technology - Name of the Component to load
 */
const importView = (technology) =>
  lazy(() =>
    import(`Pages/Technologies/${technology}`).catch(() =>
      import('Pages/Technologies/LazyError')
    )
  );

/**
 * Handle the routing to the various technologies.
 */
const Technologies = () => {
  const styles = useStyles();
  const { technology } = useParams();

  const [componentMap, setComponentMap] = useState({});

  useEffect(() => {
    if (componentMap[technology]) return;

    const Technology = importView(technology);
    setComponentMap({ [technology]: Technology });
  }, [technology, componentMap]);

  const Component = componentMap[technology] || (() => 'Loading');
  return (
    <main className={styles.root}>
      <Suspense fallback="Loading...">
        <Component />
      </Suspense>
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

Technologies.whyDidYouRender = true;

export default Technologies;
