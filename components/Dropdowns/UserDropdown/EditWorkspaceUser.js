import * as React from "react";
import { useEffect, useState } from "react";

import Select from "react-select";

// firebase
import { ref, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "components/firebase";


export default function EditorkspaceUser({ uid, uvalue, userChange }) {

  const [snapshot, loading, error] = useObject(ref(database, "users"));
  const [allusers, setAllUsers] = useState([]);
  const [selecteduser, setSelectedUser] = useState([{ label: 'Test', value: 'TRJ2Pe5pNGdG5F57iZkxp0okIVC3', email: 'test@gmail.com' }]);

  useEffect(() => {
    console.log(uvalue);
  }, [uvalue]);

  async function getAllUsers() {
    if (snapshot && !loading && !error) {
      let temp = [];
      for (let id in snapshot.val()) {
        console.log(id)
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
      }).then(() => {
        console.log(allusers)
      });
    }
  }, [snapshot]);

  const handleChange = (users) => {
    console.log(users);

    // workspaceuser(users);
  };

  return (
    <>
      <Select options={allusers} isMulti onChange={(user) => handleChange(user)} />
    </>
  );
}
