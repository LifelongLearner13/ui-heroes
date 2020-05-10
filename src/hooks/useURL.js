import { useEffect, useState } from 'react';
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

  const [search, setSearch] = useState(searchParams.normalize(rawSearch));

  useEffect(() => {
    const denormalized = searchParams.denormalized(search);
    console.log(
      'useURL - useEffect - denormalized: ',
      denormalized,
      ' rawSearch: ',
      rawSearch
    );
    if (denormalized !== rawSearch) {
      setSearch(searchParams.normalize(queryString.parse(rawSearch)));
    }
  }, [rawSearch]);

  const setURL = ({ pathname, search }) => {
    const prevSearch = searchParams.normalize(rawSearch);

    const newPathname = pathname ? pathname : rawPathname;
    const newSearch = queryString.stringify({ ...prevSearch, ...search });
    if (rawSearch !== newSearch || rawPathname !== newPathname) {
      history.push({ pathname: newPathname, search: newSearch });
    }
  };

  return [
    {
      params,
      search,
    },
    setURL,
  ];
}
