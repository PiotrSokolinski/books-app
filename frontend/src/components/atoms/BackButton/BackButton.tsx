import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, useTranslate } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.onHover.color,
    backgroundColor: theme.palette.onHover.backgroundColor,
  },
}));

type BackButtonProps = {
  path: string;
  labelId?: string;
  label?: string;
} & ({ labelId: string; label?: never } | { label: string; labelId?: never });

export const BackButton = ({ path, labelId, label }: BackButtonProps) => {
  const navigate = useNavigate();
  const translate = useTranslate();

  const goTo = () => {
    navigate(path);
  };

  return (
    <StyledButton
      onClick={goTo}
      startIcon={<ArrowBackIcon />}
      label={labelId ? translate(labelId) : label}
    />
  );
};
