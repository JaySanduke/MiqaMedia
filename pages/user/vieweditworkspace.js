import { React, useState, useEffect } from "react";
import router, { useRouter } from "next/router";

// components

import ViewEditWorkspace from "components/Modal/ViewEditWorkspace";

// layout for page

import User from "layouts/User";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, push, update, remove } from "firebase/database";
import { useObject, useList } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function ViewWorkspace() {

  const router = useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [wid, setWid] = useState(router.query.wid);
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace/' + wid));

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      setWid(router.query.tid);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ViewEditWorkspace />
        </div>
      </div>
    </>
  );
}

ViewWorkspace.layout = User;