import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SideArchiveDropdown({value, archiveChange}) {
  const [archive, setArchive] = React.useState(value);

  const handleChange = (event) => {
    archiveChange(event.target.value);
    setArchive(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Archives</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={archive}
          label="Archives"
          onChange={handleChange}
        >
          <MenuItem>BMW</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
