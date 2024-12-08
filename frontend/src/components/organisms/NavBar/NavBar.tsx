import { AppBar, Toolbar, Box } from '@mui/material';
import { TitlePortal, RefreshIconButton } from 'react-admin';

export const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <TitlePortal />
        <Box flex="1" />
        <RefreshIconButton />
      </Toolbar>
    </AppBar>
  );
};
