import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SideWorkDropdown({value, workChange}) {
  const [work, setWork] = React.useState(value);

  const handleChange = (event) => {
    workChange(event.target.value);
    setWork(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Workspaces</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={work}
          label="Workspaces"
          onChange={handleChange}
        >
          <MenuItem>Tesla</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
