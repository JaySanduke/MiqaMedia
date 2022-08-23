import { React, useState, useEffect } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardBoard from "components/Cards/CardBoard";

// layout for page

import Workspace from "layouts/Workspace";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { onValue, ref, child, push, update, remove } from "firebase/database";
import { useObject, useList } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function Dashboard() {

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [snapshot, loading, error] = useObject(ref(database, 'users'));
  const [data, setDate] = useState([]);


  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val()[uid]);
      setDate(snapshot.val()[uid]);

    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, snapshot, loading]);

  return (
    <>
      {data &&
        <CardBoard bdata={data.tasks} />
      }
    </>
  );
}

Dashboard.layout = Workspace;
