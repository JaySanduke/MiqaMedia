import React from "react";
import { useEffect, useState } from "react";
import User from "layouts/User";
import CardArchiveTable from "components/Cards/CardArchiveTable";

// firebase
import { getAuth } from "firebase/auth";

import { app } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "../../components/firebase";

const auth = getAuth(app);

export default function Archive() {

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/archieveworkspace'));
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
    }
  }, [user, uloading]);

  async function getWorkspace() {
    if (snapshot && !loading && !error) {

      console.log("function working--------");
      const temp = [];

      for (let i in snapshot.val()) {
        console.log(i);
        await onValue(ref(database, 'workspaces/' + i), async (snapshot) => {
          console.log(snapshot.val());
          temp.push(snapshot.val());
        });
      }
      return temp;
    }
  }

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val());
      // setData(snapshot.val());
      getWorkspace().then((res) => {
        setData(res);
      });
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, snapshot, error]);

  return (
    <>
      <div className="flex flex-wrap">
        <CardArchiveTable uid={uid} tableData={data} />
      </div>
    </>
  );
}

Archive.layout = User;
