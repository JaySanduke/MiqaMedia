import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function UserDropdown({value, assignee}) {
  const [user, setUser] = React.useState(value);

  const handleChange = (event) => {
    assignee(event.target.value);
    setUser(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="Select User"
          onChange={handleChange}
          required
        >
          <MenuItem value={"John"}>John</MenuItem>
          <MenuItem value={"Will"}>Will</MenuItem>
          <MenuItem value={"Mike"}>Mike</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
