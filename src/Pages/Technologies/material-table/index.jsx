import React, { useContext, useEffect, memo, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import useURL from 'hooks/useURL';
import ConfigContext from 'contexts/ConfigContext';
import TableWrapper from 'Pages/Technologies/material-table/TableWrapper';
import axios from 'axios';

const genAPICall = ({ media, page = 0, count = 10, search = {} } = {}) => {
  const combined = { limit: count, offset: page * count, ...search };
  return `https://gateway.marvel.com:443/v1/public/${media}?apikey=${
    process.env.REACT_APP_MARVEL_API_KEY
  }${Object.entries(combined).reduce(
    (acc, [key, value]) => `${acc}&${key}=${value}`,
    ['']
  )}`;
};

const MaterialTable = () => {
  /* Ref used to refresh the table when outside changes happen */
  const tableRef = useRef();
  const styles = useStyles();
  const [
    {
      params: { technology, media },
      search,
    },
    setURL,
  ] = useURL();
  const config = useContext(ConfigContext);

  const { columns, ...options } = config[technology].media[media].tableOptions;

  /* Useing short circuit because `0` is not a valid option and can be safely considered falsy */
  options.pageSize = search.count || 10;

  const onPageChange = (newPage) => {
    setURL({ params: { page: newPage } });
  };

  useEffect(() => {
    /* Reloads the page on initial load and every subsequent URL change */
    tableRef.current.onQueryChange();
  }, [technology, media, search]);

  const fetchData = async (query) => {
    const final = {
      media,
      ...query,
      ...(search.count || search.count === 0 ? { pageSize: search.count } : {}),
      ...(search.page || search.count === 0 ? { page: search.page } : {}),
    };
    try {
      const response = await axios(genAPICall(final));
      const { results, offset, limit, total } = response.data.data;
      /* API uses offset / limit but table requires page information */
      const page = Math.floor(offset / limit);
      const maxPage = Math.floor(total / limit);

      if (page > maxPage) {
        throw new Error(
          `Requested page is outside accepted page range ${0} - ${maxPage}`
        );
      }
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
        <TableWrapper
          tableRef={tableRef}
          title={`${technology} ${media}`}
          colDefs={columns}
          data={fetchData}
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
