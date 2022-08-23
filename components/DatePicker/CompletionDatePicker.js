import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function CompletionDatePicker({cvalue, completiondate}) {
  const [value, setValue] = React.useState(cvalue == ''? new Date(): cvalue);

  const handleChange = (newValue) => {
    setValue(newValue.toString());
    completiondate(newValue.toString());
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          minDateTime={new Date()}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
