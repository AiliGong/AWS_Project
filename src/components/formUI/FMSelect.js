import { useField, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const FMSelect = ({ name, options, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = e => {
    setFieldValue(name, e.target.value);
  };

  const selectProps = {
    ...field,
    ...props,
    select: true,
    fullWidth: true,
    variant: 'outlined',
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    selectProps.error = true;
    selectProps.helperText = meta.error;
  }

  return (
    <TextField {...selectProps}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {options.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FMSelect;
