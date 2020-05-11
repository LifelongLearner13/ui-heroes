import { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
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
    const prevSearch = searchParams.denormalized(search);
    const curSearch = searchParams.denormalized(
      searchParams.normalize(rawSearch)
    );
    if (prevSearch !== curSearch) {
      setSearch(searchParams.normalize(rawSearch));
    }
  }, [rawSearch, search]);

  const setURL = ({ pathname, params }) => {
    const newPathname = pathname ? pathname : rawPathname;
    const newSearch = searchParams.denormalized({
      ...search,
      ...params,
    });
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
