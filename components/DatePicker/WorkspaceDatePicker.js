import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function WorkspaceDatePicker({wvalue}) {
  // eslint-disable-next-line no-unused-vars, eqeqeq
  const [value, setValue] = React.useState(wvalue == ''? new Date(): wvalue);

  const handleChange = (newValue) => {
    setValue(newValue.toString());
    // assigndate(newValue.toString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Workspace Date Picker"
          value={new Date()}
          disabled
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
