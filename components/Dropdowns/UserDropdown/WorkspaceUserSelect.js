import * as React from "react";
import { useEffect, useState } from "react";

import Select from "react-select";

// firebase
import { ref, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "components/firebase";

export default function WorkspaceUser({ uid, workspaceuser }) {
  const [snapshot, loading, error] = useObject(ref(database, "users"));
  const [allusers, setAllUsers] = useState([]);

  async function getAllUsers() {
    if (snapshot && !loading && !error) {
      let temp = [];
      for (let id in snapshot.val()) {
        if (id !== uid) {
          await temp.push({
            label: snapshot.val()[id].name,
            value: snapshot.val()[id].uid,
            email: snapshot.val()[id].email,
          });
        }
      }
      return temp;
    }
  }

  useEffect(() => {
    if (snapshot && !loading && !error) {
      console.log(snapshot.val());

      getAllUsers().then((res) => {
        setAllUsers(res);
      });
      // for (let id in snapshot.val()) {
      //   if (id !== uid) {
      //     setAllUsers(prev => [...prev, t[id].name]);
      //   }
      // }
      console.log(allusers);
      // setAllUsers(snapshot.val());
    }
  }, [snapshot]);

  const handleChange = (users) => {
    console.log(users);

    workspaceuser(users);
  };

  return (
    <>
      <Select
        options={allusers}
        isMulti
        onChange={(user) => handleChange(user)}
      />
    </>
  );
}
