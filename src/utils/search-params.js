import queryString from 'query-string';

function isPositiveInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

const defaultSchema = {
  page: {
    convert: (value) => Number(value),
    validate: (value) => isPositiveInteger(value),
  },
  count: {
    convert: (value) => Number(value),
    validate: (value) => isPositiveInteger(value),
  },
  search: {
    convert: (value) => value,
    validate: (value) => typeof value === 'object' && value !== null,
    defaultValue: {},
  },
};

function searchParams({ defaultValues = {} } = {}) {
  let schema = Object.entries(defaultSchema).reduce((acc, [key, value]) => {
    return [
      ...acc,
      [
        key,
        {
          ...value,
          ...(defaultValues[key] !== undefined ? defaultValues[key] : {}),
        },
      ],
    ];
  }, []);

  return {
    normalize: function (str) {
      const { page, count, ...params } = queryString.parse(str);
      const obj = { page, count, search: params };
      return schema.reduce(
        (acc, [key, { validate, convert, defaultValue }]) => {
          const converted = convert(obj[key]);
          const isValid = validate(converted);

          return {
            ...acc,
            [key]: isValid ? converted : defaultValue,
          };
        },
        {}
      );
    },
    denormalized: function (obj) {
      const { page, count, search } = obj;
      return queryString.stringifyUrl({
        url: '',
        query: {
          ...(page ? { page } : {}),
          ...(count ? { count } : {}),
          ...search,
        },
      });
    },
  };
}

export default searchParams;
