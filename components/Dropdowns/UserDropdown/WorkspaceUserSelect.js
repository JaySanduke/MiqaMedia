import * as React from 'react';
import { useEffect, useState } from 'react';

import Select from "react-select";

// firebase
import { ref, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from 'components/firebase';

export default function WorkspaceUser({ uid, workspaceuser }) {

  const [snapshot, loading, error] = useObject(ref(database, 'users'));
  const [allusers, setAllUsers] = useState([]);


  async function getAllUsers() {
    if (snapshot && !loading && !error) {
      let temp = [];
      for (let id in snapshot.val()) {
        if (id !== uid) {
          await temp.push({ label: snapshot.val()[id].name, value: snapshot.val()[id].email });
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
  }, [snapshot])

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );

  //   // console.log(event.target.value)
  //   workspaceuser(event.target.value);
  // };

  return (
    <>
      <Select options={allusers} />
    </>
  );
}
