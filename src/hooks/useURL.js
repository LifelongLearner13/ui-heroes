import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import compareObject from 'utils/compareObject';

export default function () {
  const { search: rawSearch = '' } = useLocation();
  const params = useParams();
  const [search, setSearch] = useState({});
  console.log('useURL - rawSearch: ', rawSearch, ' params: ', params);

  useEffect(() => {
    const searchObj = queryString.parse(rawSearch);
    if (!compareObject(searchObj, search)) {
      setSearch(searchObj);
    }
  }, [rawSearch, search]);

  return { params, search };
}
