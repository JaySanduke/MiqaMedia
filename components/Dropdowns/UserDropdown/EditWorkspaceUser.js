import * as React from "react";
import { useEffect, useState } from "react";

import Select from "react-select";

// firebase
import { ref, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "components/firebase";


export default function EditorkspaceUser({ uid, owner, uvalue, userChange }) {

  const [snapshot, loading, error] = useObject(ref(database, "users"));
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    console.log(uvalue);
  }, [uvalue]);

  async function getAllUsers(users) {
    // if (snapshot && !loading && !error) {
    console.log(users);
    let temp = [];
    console.log(owner, uid);
    console.log(uvalue);
    for (let id in users) {
      console.log(id)
      if (id !== owner) {
        if (uvalue) {
          if (uvalue.includes(id) == false) {
            await temp.push({
              label: users[id].name,
              value: users[id].uid,
              email: users[id].email,
            })
          }
        }
        else {
          await temp.push({
            label: snapshot.val()[id].name,
            value: snapshot.val()[id].uid,
            email: snapshot.val()[id].email,
          })
        }
      }
    }
    return temp;
    // }
  }

  useEffect(() => {
    if (snapshot && !loading && !error) {
      getAllUsers(snapshot.val()).then((res) => {
        setAllUsers(res);
      }).then(() => {
        console.log(allusers)
      });
    }
  }, [snapshot]);

  const handleChange = (users) => {
    console.log(users);

    if (users != null) {
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
      <Select options={allusers} isMulti onChange={(user) => handleChange(user)} />
    </>
  );
}
