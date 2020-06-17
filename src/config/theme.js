import { deepMerge } from 'grommet/utils';
import { base } from 'grommet';

const theme = deepMerge(base, {
  global: {
    colors: {
      brand: '#db2e9c',
      focus: 'none',
      complementary: '#419ae8',
    },
    font: {
      size: '18px',
      height: '20px',
    },
  },
  formField: {
    border: false,
  },
  list: {
    item: {
      border: false,
    },
  },
});

export default theme;
