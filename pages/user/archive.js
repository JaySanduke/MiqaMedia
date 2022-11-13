import React from "react";
import { useEffect, useState } from "react";
import User from "layouts/User";
import CardArchiveTable from "components/Cards/CardArchiveTable";

// firebase
import { getAuth } from "firebase/auth";

import { app } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(app);

export default function Archive() {

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('')

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
    }
  }, [user, uloading]);

  return (
    <>
      <div className="flex flex-wrap">
        <CardArchiveTable uid={uid}/>
      </div>
    </>
  );
}

Archive.layout = User;
