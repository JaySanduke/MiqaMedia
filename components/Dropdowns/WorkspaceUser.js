import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Select from '@mui/material/Select';
import Checkbox, { checkboxClasses } from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import InputLabel from '@mui/material/InputLabel';
import ListItem from "@mui/joy/ListItem";
import FormControl from '@mui/material/FormControl';
import Typography from "@mui/joy/Typography";

export default function WorkspaceUser({ handleWorkspaceusersChange }) {
  const [user, setUser] = React.useState("");
  const [members, setMembers] = React.useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
    console.log(event);
  };

  const toggleMember = (index) => (event) => {
    const newMembers = [...members];
    newMembers[index] = event.target.checked;
    setMembers(newMembers);
  };
  return (

    <Box role="group" aria-labelledby="member" sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          label="Select User"
          onChange={handleChange}
        >
          <List
            sx={{
              [`& .${checkboxClasses.root}`]: {
                mr: "auto",
                flexGrow: 1,
                alignItems: "center",
                flexDirection: "row-reverse",
                gap: 1.5,
              },
            }}
          >
            <ListItem
              {...(members[1] && {
                variant: "soft",
                color: "primary",
              })}
            >
              <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" />
              <Checkbox
                overlay
                label={
                  <React.Fragment>
                    Satyam Sharma
                    {members[1] && (
                      <Typography
                        aria-hidden="true"
                        sx={{
                          display: "block",
                          fontSize: "sm",
                          color: "neutral.500",
                        }}
                      >
                        This user will become workspace memeber.
                      </Typography>
                    )}
                  </React.Fragment>
                }
                value="satyam"
                checked={members[1]}
                onChange={toggleMember(1)}
                sx={{ color: "inherit" }}
              />
            </ListItem>
            <ListItem
              {...(members[2] && {
                variant: "soft",
                color: "primary",
              })}
            >
              <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" />
              <Checkbox
                overlay
                label={
                  <React.Fragment>
                    Jay Sanduke
                    {members[2] && (
                      <Typography
                        aria-hidden="true"
                        sx={{
                          display: "block",
                          fontSize: "sm",
                          color: "neutral.500",
                        }}
                      >
                        This user will become workspace memeber.
                      </Typography>
                    )}
                  </React.Fragment>
                }
                checked={members[2]}
                onChange={toggleMember(2)}
                sx={{ color: "inherit" }}
              />
            </ListItem>
            <ListItem
              {...(members[3] && {
                variant: "soft",
                color: "primary",
              })}
            >
              <Avatar aria-hidden="true" src="/static/images/avatar/2.jpg" />
              <Checkbox
                overlay
                label={
                  <React.Fragment>
                    Divyanshu Pateriya
                    {members[3] && (
                      <Typography
                        aria-hidden="true"
                        sx={{
                          display: "block",
                          fontSize: "sm",
                          color: "neutral.500",
                        }}
                      >
                        This user will become workspace memeber.
                      </Typography>
                    )}
                  </React.Fragment>
                }
                checked={members[3]}
                onChange={toggleMember(3)}
                sx={{ color: "inherit" }}
              />
            </ListItem>

          </List>
        </Select>
      </FormControl>
    </Box>
  );
}
