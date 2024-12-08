import { CreateButton, FilterButton, TopToolbar } from 'react-admin';

export const ListActions = () => {
  return (
    <TopToolbar>
      <FilterButton />
      <CreateButton />
    </TopToolbar>
  );
};
