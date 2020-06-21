import { deepMerge } from 'grommet/utils';
import { base } from 'grommet';

const theme = deepMerge(base, {
  global: {
    font: {
      family: "'Inter', sans-serif",
      size: '16px',
    },
    colors: {
      brand: '#db2e9c',
      focus: 'none',
      complementary: '#419ae8',
      darkgray: '#A9A9A9',
      black: '#000000',
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
  heading: {
    weight: 700,
  },
});

export default theme;
