import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export default (initialUrl) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: { data: [], page: 0, totalCount: 0 },
  });

  useEffect(() => {
    console.log('useDataApi useEffect - url: ', url);
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await axios(url);
        const { results, offset, limit, total } = response.data.data;
        console.log('results: ', results, offset, limit, total);
        const page = Math.floor(offset / limit);
        const maxPage = Math.floor(total / limit);

        if (page > maxPage) {
          throw new Error(
            `Requested page is outside accepted page range ${0} - ${maxPage}`
          );
        }

        if (!didCancel) {
          dispatch({
            type: 'FETCH_SUCCESS',
            payload: {
              data: results,
              page: page,
              totalCount: total,
            },
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
