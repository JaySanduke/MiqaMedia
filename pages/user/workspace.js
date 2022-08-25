import React from "react";
import { useEffect, useState } from "react";
import User from "layouts/User";
import CardWorkspaceTable from "components/Cards/CardWorkspaceTable";

// firebase

import { getAuth } from "firebase/auth";

import { app } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "../../components/firebase";

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

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val());
      setData(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, loading, snapshot, error]);

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
