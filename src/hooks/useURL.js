import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import normalizeSearchParams from 'utils/normalizeSearchParms';

/* `normalizeSearchParams` is a factory which can acepts an options object to overwrite the schema. */
const normalize = normalizeSearchParams();

/**
 * Encapsulate retrieving information from 'react-router'
 */
export default function () {
  const { search: rawSearch = '' } = useLocation();
  const params = useParams();
  /* Convert and apply defaults to the search string */
  const search = useMemo(() => normalize(queryString.parse(rawSearch)), [
    rawSearch,
  ]);

  return {
    params,
    search,
  };
}
