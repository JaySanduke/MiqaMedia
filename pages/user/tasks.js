import { React, useState, useEffect } from "react";
import Router from "next/router";

// components

import CardBoard from "components/Cards/CardBoard";

// layout for page

import User from "layouts/User";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, push, update, remove } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function Tasks() {

  const router = Router.useRouter(); 

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [wpid, setWid] = useState(router.query.wid);
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace/' + wpid));
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      // console.log(router.query.wid)
      setWid(router.query.wid);
    }
  }, [user, router, uloading]);

  useEffect(() => {
    if (!loading && snapshot) {
      // console.log(snapshot.val());
      setData(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, snapshot, loading, error]);

  return (
    <>
      <CardBoard wpid={wpid} boarddata={data.tasks}/>
    </>
  );
}

Tasks.layout = User;