import { useState } from 'react';
import {
  Confirm,
  useDelete,
  useRecordContext,
  useTranslate,
} from 'react-admin';

import { Book } from '../../../types/book';
import { DeleteButton } from '../../atoms/DeleteButton/DeleteButton';

type DeleteWithConfirmProps = {
  onClick: () => void;
};

export const DeleteWithConfirm = ({ onClick }: DeleteWithConfirmProps) => {
  const record = useRecordContext<Book>();
  const [open, setOpen] = useState(false);
  const translate = useTranslate();

  const [remove, { isPending }] = useDelete('books', {
    id: record?.id,
  });

  if (!record) return null; // shouldn't be possible to happen

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    remove();
    onClick();
    setOpen(false);
  };

  return (
    <>
      <DeleteButton onClick={handleOpen} />
      <Confirm
        isOpen={open}
        loading={isPending}
        title={translate('deleteWithConfirm.confirmationTitle', {
          title: record.title,
        })}
        content={translate('deleteWithConfirm.confirmationContent')}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
};
