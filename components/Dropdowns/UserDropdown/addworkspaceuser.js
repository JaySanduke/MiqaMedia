// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';

// // firebase
// import { ref, onValue } from "firebase/database";
// import { useObject } from "react-firebase-hooks/database";

// import { database } from 'components/firebase';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

// export default function WorkspaceUser({ uid, workspaceuser }) {
//   const [personName, setPersonName] = React.useState([]);

//   const [snapshot, loading, error] = useObject(ref(database, 'users'));
//   const [allusers, setAllUsers] = React.useState([]);


//   async function getAllUsers() {
//     if (snapshot && !loading && !error) {
//       let temp = [];
//       for (let id in snapshot.val()) {
//         if (id !== uid) {
//           await temp.push(snapshot.val()[id].name);
//         }
//       }
//       return temp;
//     }
//   }

//   React.useEffect(() => {
//     if (snapshot && !loading && !error) {
//       console.log(snapshot.val());

//       getAllUsers().then((res) => {
//         setAllUsers(res);
//       });
//       // for (let id in snapshot.val()) {
//       //   if (id !== uid) {
//       //     setAllUsers(prev => [...prev, t[id].name]);
//       //   }
//       // }
//       console.log(allusers);
//       // setAllUsers(snapshot.val());
//     }
//   }, [snapshot])

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setPersonName(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value,
//     );

//     // console.log(event.target.value)
//     workspaceuser(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl sx={{ width: 325 }}>
//         <InputLabel id="demo-multiple-checkbox-label">Workspace Users</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           id="demo-multiple-checkbox"
//           multiple
//           value={personName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Workspace Users" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {allusers.map((name) => (
//             <MenuItem key={name} value={name}>
//               <Checkbox checked={personName.indexOf(name) > -1} />
//               <ListItemText primary={name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
