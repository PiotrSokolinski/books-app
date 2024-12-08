import DeleteIcon from '@mui/icons-material/Delete';
import { Button, useTranslate } from 'react-admin';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

type DeleteButtonProps = {
  onClick: () => void;
};

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  const translate = useTranslate();

  return (
    <StyledButton
      onClick={onClick}
      startIcon={<DeleteIcon />}
      label={translate('deleteButton.label')}
    />
  );
};
