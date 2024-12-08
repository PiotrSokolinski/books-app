import simpleRestClient from 'ra-data-simple-rest';
import BooksIcon from '@mui/icons-material/LibraryBooks';
import { Admin, Resource } from 'react-admin';

import { Layout } from './components/templates/Layout/Layout';
import { i18nProvider } from './i18n/i18n';
import { APP_CONFIG } from './utils/config';
import { BooksList } from './components/pages/BooksList/BooksList';
import { BooksShow } from './components/pages/BooksShow/BooksShow';
import { BooksEdit } from './components/pages/BooksEdit/BooksEdit';
import { BooksCreate } from './components/pages/BooksCreate/BooksCreate';
import { theme } from './theme/theme';

// TODO: F9 - Add logger and more robust logging across the application
// TODO: F10 - Add monitoring (e.g. performance monitoring) and alerting across the application using third-party tools
// TODO: F11 - Optimize the application for performance
function App() {
  const apiURL = APP_CONFIG.VITE_API_URL;
  return (
    <Admin
      theme={theme}
      dataProvider={simpleRestClient(apiURL)}
      // TODO: F7 - Add authProvider
      authProvider={undefined} // explicitly state that we don't need an authProvider
      i18nProvider={i18nProvider}
      layout={Layout}
      darkTheme={null}
    >
      <Resource
        name="books"
        list={BooksList}
        edit={BooksEdit}
        create={BooksCreate}
        show={BooksShow}
        icon={BooksIcon}
      />
    </Admin>
  );
}

export default App;
