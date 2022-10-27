import React from "react";
import { useEffect, useState } from "react";
import User from "layouts/User";
import CardWorkspaceTable from "components/Cards/CardWorkspaceTable";

// firebase

import { getAuth } from "firebase/auth";

import { app } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, push, update, remove, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "../../components/firebase";
import { isNonNullChain } from "typescript";

const auth = getAuth(app);

export default function Workspace() {

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace'));
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
    }
  }, [user,uloading]);

  async function getWorkspace() {
    if (snapshot && !loading && !error) {

      console.log("function working--------");
      let temp = [];

      for(let i of snapshot.val()){
        console.log(i);
        onValue(ref(database, 'workspaces/' + i), async (snapshot) => {
          console.log(snapshot.val());
          temp.push(snapshot.val());
        });
      }
      
      await setData(temp);
      // await console.log(temp)
    }
  }

  useEffect(() => {
    if (!loading && snapshot && !error) {
      console.log(snapshot.val());
      // setData(snapshot.val());
      getWorkspace();
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, loading, error]);

  return (
    <>
    { user &&
      <div className="flex flex-wrap">
        <CardWorkspaceTable uid={uid} wdata={data}/>
      </div>
    }
    </>
  );
}

Workspace.layout = User;
