import React, { useContext, useState, memo, useMemo, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import useURL from 'hooks/useURL';
import ConfigContext from 'contexts/ConfigContext';
import TableWrapper from 'Pages/Technologies/material-table/TableWrapper';
import Banner from 'common/Banner';
import useDataApi from 'hooks/useDataApi';

const MARVEL_API =
  'https://gateway.marvel.com:443/v1/public/characters?apikey=2b2eeb57dfb3e66a6df0e42978977d70';

const genAPICall = ({ page = 0, count = 10, search = {} } = {}) => {
  const combined = { limit: count, offset: page * count, ...search };
  return `${MARVEL_API}${Object.entries(combined).map(
    ([key, value]) => `&${key}=${value}`
  )}`;
};

const MaterialTable = () => {
  console.log('MaterialTable Rendered');
  const styles = useStyles();
  const [
    {
      params: { technology, media },
      search,
    },
    setURL,
  ] = useURL();
  const config = useContext(ConfigContext);
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    genAPICall(search)
  );

  const tableOptions = config[technology].media[media].tableOptions;

  const options = useMemo(() => {
    console.log('useMemo - options - search: ', search);
    return {
      pageSize: search.count || 10,
      initialPage: search.page || 0,
      exportButton: true,
      columnsButton: true,
    };
  }, [search]);

  const onPageChange = (newPage) => {
    console.log('onPageChange - newPage: ', newPage);
    setURL({ page: newPage });
  };

  return (
    <Fragment>
      <div className={styles.root}>
        {/* Loading: {isLoading}
        Error: {isError}
        {JSON.stringify(data)} */}
        <TableWrapper
          title={`${technology} ${media}`}
          colDefs={tableOptions.columns}
          data={data.data}
          options={options}
          isLoading={isLoading}
          onPageChange={onPageChange}
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
