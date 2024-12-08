import { SaveButton, useNotify, useRedirect, useTranslate } from 'react-admin';
import { Toolbar } from '@mui/material';
import { styled } from '@mui/system';
import { useFormContext } from 'react-hook-form';

import { DeleteWithConfirm } from '../DeleteWithConfirm/DeleteWithConfirm';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

type CustomToolbarProps = {
  mode: 'create' | 'edit';
};

export const FormToolbar = ({ mode }: CustomToolbarProps) => {
  const notify = useNotify();
  const { reset, getValues } = useFormContext();
  const redirect = useRedirect();
  const translate = useTranslate();

  const handleSave = () => {
    const messageId =
      mode === 'create' ? 'customToolbar.created' : 'customToolbar.updated';
    notify(translate(messageId), { type: 'success' });
    reset();
    if (mode === 'create') {
      redirect('list', '/books');
    } else {
      const { id } = getValues();
      redirect('show', `/books`, id);
    }
  };

  const handleDelete = () => {
    notify(translate('customToolbar.deleted'), { type: 'success' });
    redirect('list', '/books');
  };

  return (
    <StyledToolbar>
      <SaveButton
        mutationOptions={{
          onSuccess: handleSave,
        }}
        type="button"
        variant="text"
      />
      <DeleteWithConfirm onClick={handleDelete} />
    </StyledToolbar>
  );
};
