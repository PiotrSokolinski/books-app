import React from 'react';
import { Layout as RaLayout } from 'react-admin';

import { NavBar } from '../../organisms/NavBar/NavBar';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => (
  <RaLayout
    appBar={NavBar}
    sidebar={() => null}
    sx={{
      '& .RaLayout-content': {
        margin: 5,
      },
    }}
  >
    {children}
  </RaLayout>
);
