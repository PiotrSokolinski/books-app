import React from 'react';
import { TopToolbar } from 'react-admin';

import { BackButton } from '../../atoms/BackButton/BackButton';
import { Flex } from '../../atoms/Flex/Flex';

type BookActionsProps = {
  action?: React.JSX.Element;
};

export const BookActions = ({ action }: BookActionsProps) => (
  <TopToolbar>
    <Flex>
      <BackButton path="/books" labelId="bookActions.label" />
      {action}
    </Flex>
  </TopToolbar>
);
