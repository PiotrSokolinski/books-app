import { defaultTheme } from 'react-admin';
import { deepmerge } from '@mui/utils';

export const theme = deepmerge(defaultTheme, {
  palette: {
    onHover: {
      color: '#747bff',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
    },
  },
});
