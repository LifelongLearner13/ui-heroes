const TECHNOLOGIES = {
  'material-table': {
    imageSrc: 'materialTableLogo',
    imageAlt: 'Material-Table logo',
    name: 'material-table',
    path: '/material-table',
    id: 'material-table',
    media: ['characters', 'comics', 'creators', 'events', 'series', 'stories'],
  },
  'tubular-react': {
    imageSrc: 'tubularReactLogo',
    imageAlt: 'Tubular-React logo',
    name: 'Tubular-React',
    path: '/tubular-react',
    id: 'tubular-react',
    media: ['characters', 'comics', 'creators', 'events', 'series', 'stories'],
  },
};

const MEDIA = {
  characters: {
    imageSrc: '',
    imageAlt: '',
    name: 'Marvel Characters',
    path: (parentPath) => `${parentPath}/characters`,
    id: (parentID) => `${parentID}-characters`,
    tableOptions: (parentID) =>
      ({
        'material-table': {
          columns: [
            { title: 'Name', field: 'name' },
            { title: 'Thumbnail', field: 'thumbnail.path' },
          ],
        },
        'tubular-react': {},
      }[parentID]),
  },
  comics: {
    imageSrc: '',
    imageAlt: '',
    name: 'Marvel Comics',
    path: (parentPath) => `${parentPath}/comics`,
    id: (parentID) => `${parentID}-comics`,
    tableOptions: (parentID) =>
      ({
        'material-table': {},
        'tubular-react': {},
      }[parentID]),
  },
  creators: {
    imageSrc: '',
    imageAlt: '',
    name: 'Marvel Creators',
    path: (parentPath) => `${parentPath}/creators`,
    id: (parentID) => `${parentID}-creators`,
    tableOptions: (parentID) =>
      ({
        'material-table': {},
        'tubular-react': {},
      }[parentID]),
  },
  events: {
    imageSrc: '',
    imageAlt: '',
    name: 'Marvel Events',
    path: (parentPath) => `${parentPath}/events`,
    id: (parentID) => `${parentID}-events`,
    tableOptions: (parentID) =>
      ({
        'material-table': {},
        'tubular-react': {},
      }[parentID]),
  },
  series: {
    imageSrc: '',
    imageAlt: '',
    name: 'Marvel Series',
    path: (parentPath) => `${parentPath}/series`,
    id: (parentID) => `${parentID}-series`,
    tableOptions: (parent) =>
      ({
        'material-table': {},
        'tubular-react': {},
      }[parent]),
  },
  stories: {
    imageSrc: '',
    imageAlt: '',
    name: 'Marvel Stories',
    path: (parentPath) => `${parentPath}/stories`,
    id: (parentID) => `${parentID}-stories`,
    tableOptions: (parentID) =>
      ({
        'material-table': {},
        'tubular-react': {},
      }[parentID]),
  },
};

export default function () {
  let result = {};

  for (let technology in TECHNOLOGIES) {
    result[technology] = { ...TECHNOLOGIES[technology] };
    result[technology].media = result[technology].media.reduce((acc, cur) => {
      let obj = { ...MEDIA[cur] };
      obj.path = obj.path(result[technology].path);
      obj.id = obj.id(result[technology].id);
      obj.tableOptions = obj.tableOptions(result[technology].id);
      return {
        ...acc,
        [cur]: obj,
      };
    }, {});
  }

  return result;
}
