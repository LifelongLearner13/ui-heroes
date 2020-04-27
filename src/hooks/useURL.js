import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import compareObject from "utils/compareObject";

export default function () {
  const { search = "" } = useLocation();
  const [params, setParams] = useState({});

  useEffect(() => {
    const searchObj = queryString.parse(search);
    console.log("useURL - useEffect - search: ", search, " params: ", params);
    if (!compareObject(searchObj, params)) {
      setParams(searchObj);
    }
  }, [search]);

  return params;
}
