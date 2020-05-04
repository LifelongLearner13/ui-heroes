function isPositiveInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

const defaultSchema = {
  page: {
    convert: (value) => Number(value),
    validate: (value) => isPositiveInteger(value),
    defaultValue: 0,
  },
  count: {
    convert: (value) => Number(value),
    validate: (value) => isPositiveInteger(value),
    defaultValue: 10,
  },
  search: {
    convert: (value) => value,
    validate: (value) => typeof value === 'object' && value !== null,
    defaultValue: {},
  },
};

function normalizeSearchParams({ defaultValues = {} } = {}) {
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

  return function ({ page, count, ...params } = {}) {
    const obj = { page, count, search: params };
    return schema.reduce((acc, [key, { validate, convert, defaultValue }]) => {
      const converted = convert(obj[key]);
      const isValid = validate(converted);

      console.log('key: ', key, 'converted: ', converted, 'isValid: ', isValid);
      return {
        ...acc,
        [key]: isValid ? converted : defaultValue,
      };
    }, {});
  };
}

export default normalizeSearchParams;
