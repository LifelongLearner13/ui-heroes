import React, { useContext, useState, memo, useMemo, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import useURL from 'hooks/useURL';
import ConfigContext from 'contexts/ConfigContext';
import TableWrapper from 'Pages/Technologies/material-table/TableWrapper';
import Banner from 'common/Banner';
import useDataApi from 'hooks/useDataApi';
import axios from 'axios';

const MARVEL_API =
  'https://gateway.marvel.com:443/v1/public/characters?apikey=2b2eeb57dfb3e66a6df0e42978977d70';

const genAPICall = ({ page = 0, count = 10, search = {} } = {}) => {
  const combined = { limit: count, offset: page * count, ...search };
  return `${MARVEL_API}${Object.entries(combined).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    ['']
  )}`;
};

const MaterialTable = () => {
  const styles = useStyles();
  const [
    {
      params: { technology, media },
      searchRef,
    },
    setURL,
  ] = useURL();
  const config = useContext(ConfigContext);
  // const [{ data, isLoading, isError }, doFetch] = useDataApi(
  //   genAPICall(search)
  // );
  console.log(
    'MaterialTable - searchRef: ',
    JSON.parse(JSON.stringify(searchRef))
  );
  const tableOptions = config[technology].media[media].tableOptions;

  const options = {
    pageSize: searchRef.current.count || 10,
    exportButton: true,
    columnsButton: true,
  };

  const onPageChange = (newPage) => {
    console.log('onPageChange - newPage: ', newPage);
    setURL({ params: { page: newPage } });
  };

  const fetchData = (urlParams) => async (query) => {
    console.log('fetchData - query: ', query);
    console.log('fetchData - window.location.search: ', window.location.search);
    console.log(
      'fetchData - urlParams: ',
      JSON.parse(JSON.stringify(urlParams))
    );
    const final = {
      ...query,
      ...(urlParams.count ? { pageSize: urlParams.count } : {}),
      ...(urlParams.page ? { page: urlParams.page } : {}),
    };
    console.log('final: ', final);
    try {
      const response = await axios(genAPICall(final));
      const { results, offset, limit, total } = response.data.data;
      console.log('results: ', results, offset, limit, total);
      const page = Math.floor(offset / limit);
      const maxPage = Math.floor(total / limit);

      if (page > maxPage) {
        throw new Error(
          `Requested page is outside accepted page range ${0} - ${maxPage}`
        );
      }
      console.log({
        data: results,
        page: page,
        totalCount: total,
      });
      return {
        data: results,
        page: page,
        totalCount: total,
      };
    } catch (error) {
      throw new Error('Something went wrong!');
    }
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
          data={fetchData(searchRef.current)}
          options={options}
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
