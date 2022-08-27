import React from "react";

import { useEffect, useState } from "react";

// components

import CardSubTask from "components/Cards/CardSubTask";

// layout for page

import User from "layouts/User";

// firebase

import { getAuth } from "firebase/auth";
import Router from "next/router";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, push, update, remove } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";
import { getTabId } from "@mui/base";

const auth = getAuth(app);

export default function SubTask() {

  const router = Router.useRouter(); 
  
  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [wpid, setWid] = useState(router.query.wid);
  const [tid, setTid] = useState(router.query.tid);
  const [sid, setSid] = useState(router.query.sid);
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks'));

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      setWid(router.query.wid);
      setTid(router.query.tid);
      setSid(router.query.sid);
      console.log(user.uid);
    }
  } , [user]);


  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if(error) {
      console.log('Error: ' + error );
    }
  }, [uid, snapshot]);

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSubTask />
        </div>
        <div className="w-full mb-12 px-4">
          <CardSubTask color="dark" />
        </div>
      </div>
    </>
  );
}

SubTask.layout = User;