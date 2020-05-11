import { useEffect, useRef } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import queryString from 'query-string';
import searchParamsFactory from 'utils/search-params';

/* `searchParamsFactory` acepts an options object to overwrite the schema. */
const searchParams = searchParamsFactory();

/**
 * Encapsulate retrieving information from 'react-router'
 */
export default function () {
  const { pathname: rawPathname, search: rawSearch = '' } = useLocation();
  const history = useHistory();
  const params = useParams();

  const searchRef = useRef(searchParams.normalize(rawSearch));
  console.log(
    'useURL - searchRef.current: ',
    JSON.parse(JSON.stringify(searchRef.current))
  );
  useEffect(() => {
    const denormalized = searchParams.denormalized(searchRef.current);
    console.log(
      'useURL - useEffect - denormalized: ',
      denormalized,
      ' rawSearch: ',
      rawSearch
    );
    if (denormalized !== rawSearch) {
      searchRef.current = searchParams.normalize(queryString.parse(rawSearch));
    }
  }, [rawSearch]);

  const setURL = ({ pathname, params }) => {
    const newPathname = pathname ? pathname : rawPathname;
    const newSearch = searchParams.denormalized({
      ...searchRef.current,
      ...params,
    });
    console.log(
      'useURL - setURL - params: ',
      params,
      ' newSearch: ',
      newSearch
    );
    if (rawSearch !== newSearch || rawPathname !== newPathname) {
      history.push({ pathname: newPathname, search: newSearch });
    }
  };

  return [
    {
      params,
      searchRef,
    },
    setURL,
  ];
}
