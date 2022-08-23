import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function StatusDropdown({value, statusChange}) {
  const [status, setStatus] = React.useState(value);

  const handleChange = (event) => {
    statusChange(event.target.value);
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Select Status"
          onChange={handleChange}
        >
          <MenuItem value={"backlog"}>Backlog</MenuItem>
          <MenuItem value={"inprogress"}>In Progress</MenuItem>
          <MenuItem value={"inreview"}>In Review</MenuItem>
          <MenuItem value={"completed"}>Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
