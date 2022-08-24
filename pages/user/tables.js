import React from "react";
import Router from "next/router";

import { useEffect, useState } from "react";

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Workspace from "layouts/Workspace";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { onValue, ref, child, push, update, remove } from "firebase/database";
import { useObject, useList } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function Tables() {

  const router = Router.useRouter(); 

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [wpid, setWid] = useState(router.query.wid);
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace/' + wpid));
  const [data, setDate] = useState([]);

  useEffect(() => {
    var hostname = window.location.hostname;
    var hsplit = hostname.split('.');
    var workspace = hsplit[0];
    console.log(workspace);
  },[])

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      console.log(router.query.wid)
      setWid(router.query.wid);
    }
  }, [user, router]);

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val());
      setDate(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, snapshot, loading]);

  function addTask(data) {
    
    if (uid) {
    const postk = push(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/')).key

    const taskdetails = {
      "created_at": data.assignDate,
      "completion_date": data.completionDate,
      "id": postk,
      "title": data.title,
      "desc": data.desc,
      "status": data.status,
      "priority": 0,
      "chat": 0,
      "attachment": 0,
      "assignees": [data.assignee],
    };

      update(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + postk), taskdetails);
    }
  }

  function deleteTask(taskid) {
    if (taskid && taskid != "") {
      remove(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + taskid))
        .then(console.log('task with id ' + taskid + ' deleted successfully'))
        .catch((error) => {
          console.log('error deleting task with error:' + error)
        });
    }
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12">
          {data && 
            <CardTable color="light" tabledata={data.tasks} addTask={addTask} deleteTask={deleteTask} />
          }
        </div>
        {data && 
            <CardTable color="dark" tabledata={data.tasks} addTask={addTask} deleteTask={deleteTask} />
          }
      </div>
    </>
  );
}

Tables.layout = Workspace;
