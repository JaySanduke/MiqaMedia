import React from "react";
import { useEffect, useState } from "react";
import User from "layouts/User";
import CardWorkspaceTable from "components/Cards/CardWorkspaceTable";

// firebase

import { getAuth } from "firebase/auth";

import { app } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(app);

export default function Workspace() {

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
    }
  }, [user,uloading]);


  return (
    <>
    { user &&
      <div className="flex flex-wrap">
        <CardWorkspaceTable uid={uid} />
      </div>
    }
    </>
  );
}

Workspace.layout = User;
