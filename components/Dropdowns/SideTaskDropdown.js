import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SideTaskDropdown({value, taskChange}) {
  const [task, setTask] = React.useState(value);

  const handleChange = (event) => {
    taskChange(event.target.value);
    setTask(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tasks</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={task}
          label="Tasks"
          onChange={handleChange}
        >
          <MenuItem>Jaguar</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
