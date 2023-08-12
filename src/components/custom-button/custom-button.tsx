import {
  Button,
  CircularProgress,
  ButtonProps,
  Typography,
} from '@mui/material';

type CustomButtonProps = {
  isLoading?: boolean;
  text: string;
} & ButtonProps;

export const CustomButton = ({
  isLoading,
  text,
  ...props
}: CustomButtonProps) => {
  const handleButtonTextRender = () => {
    if (isLoading) {
      return (
        <CircularProgress
          color="inherit"
          size="1.625rem"
          sx={{ display: 'flex' }}
        />
      );
    } else return <Typography variant="button-text">{text}</Typography>;
  };

  return (
    <Button
      variant="contained"
      size="large"
      type="button"
      fullWidth
      sx={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      {...props}
    >
      {handleButtonTextRender()}
    </Button>
  );
};
