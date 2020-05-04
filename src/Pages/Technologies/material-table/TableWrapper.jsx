import React, { memo, forwardRef } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function getData({ query: externalQuery, handleError }) {
  return async function (internalQuery) {
    console.log('getData - externalQuery: ', externalQuery);
    console.log('getData - internalQuery: ', internalQuery);
    let url =
      'https://gateway.marvel.com:443/v1/public/characters?apikey=2b2eeb57dfb3e66a6df0e42978977d70';
    url += '&limit=' + externalQuery.count;
    url += '&offset=' + externalQuery.page * externalQuery.count;
    const result = await fetch(url);
    const json = await result.json();
    console.log('json: ', json);
    const { results, offset, limit, total } = json.data;
    console.log('results: ', results);
    const page = Math.floor(offset / limit);
    const maxPage = Math.floor(total / limit);
    if (page > maxPage) {
      handleError(
        `Requested page is outside accepted page range ${0} - ${maxPage}`
      );
    }
    return {
      data: results,
      page: page > maxPage ? maxPage : page,
      totalCount: total,
    };
  };
}

const TableWrapper = ({ options, query, title, colDefs, handleError }) => {
  console.log('TableWrapper');

  return (
    <MaterialTable
      icons={tableIcons}
      title={title}
      columns={colDefs}
      data={getData({ query, handleError })}
      options={options}
    />
  );
};

TableWrapper.whyDidYouRender = true;

export default memo(TableWrapper);
