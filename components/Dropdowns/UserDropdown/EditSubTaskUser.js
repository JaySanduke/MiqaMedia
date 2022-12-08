import * as React from "react";
import { useEffect, useState } from "react";

import Select from "react-select";

// firebase
import { ref, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "components/firebase";


export default function EditSubTaskUser({ subtaskUsers, userChange }) {

  const [snapshot, loading, error] = useObject(ref(database, "users"));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(subtaskUsers);
  }, [subtaskUsers]);

  async function getAllUsers(allusers) {
    console.log(allusers);
    let temp = await [];
    for (let id in allusers) {
      if (subtaskUsers != undefined) {
        if (subtaskUsers.includes(id)) {
          await console.log(allusers[id]);
          await temp.push({
            label: allusers[id].name,
            value: allusers[id].uid,
            email: allusers[id].email,
          })
        }
      }
    }
    return temp;
  }

  useEffect(() => {
    if (snapshot && !loading && !error) {
      getAllUsers(snapshot.val()).then((res) => {
        setUsers(res);
      })
    }
  }, [snapshot]);

  const handleChange = (users) => {
    console.log(users);

    if (users != null && users.length > 0) {
      let temp = [];
      users.map((user) => {
        temp.push(user.value);
      });
      users = temp;
    }
    console.log(users);

    userChange(users);
  };

  return (
    <>
      <Select options={users} required isMulti onChange={(users) => handleChange(users)} />
    </>
  );
}
