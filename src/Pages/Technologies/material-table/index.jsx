import React, { useContext, useState, memo, useMemo, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import useURL from 'hooks/useURL';
import ConfigContext from 'contexts/ConfigContext';
import TableWrapper from 'Pages/Technologies/material-table/TableWrapper';
import Banner from 'common/Banner';

const MaterialTable = () => {
  const styles = useStyles();
  const { params: { technology, media } = {}, search = {} } = useURL();
  const config = useContext(ConfigContext);
  const [error, setError] = useState(null);
  const tableOptions = useMemo(
    () => config[technology].media[media].tableOptions,
    [config, technology, media]
  );

  const options = useMemo(() => {
    console.log('useMemo - options - search: ', search);
    return {
      pageSize: search.count,
      exportButton: true,
      columnsButton: true,
    };
  }, [search]);

  const handleError = (error) => {
    setError(error);
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <Banner
          message={error}
          type={Banner.TYPE.error}
          dismiss={dismissError}
        />
      )}
      <div className={styles.root}>
        <TableWrapper
          title={`${technology} ${media}`}
          colDefs={tableOptions.columns}
          options={options}
          query={search}
          handleError={handleError}
        />
      </div>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
  },
}));

MaterialTable.whyDidYouRender = true;

export default memo(MaterialTable);
