import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';

const FMTextField = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  const textFieldProps = {
    ...field,
    ...props,
    fullWidth: true,
    variant: 'outlined',
  };

  if (meta && meta.touched && meta.error) {
    textFieldProps.error = true;
    textFieldProps.helperText = meta.error;
  }

  return <TextField {...textFieldProps} />;
};

export default FMTextField;
