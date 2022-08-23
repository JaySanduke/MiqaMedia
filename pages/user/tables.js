import React from "react";

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

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [snapshot, loading, error] = useObject(ref(database, 'users'));
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

  function addTask(data) {

    const postk = push(ref(database, 'users/' + uid + '/tasks')).key

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

    if (uid) {
      push(ref(database, 'users/' + uid + '/tasks/'), taskdetails);
    }

  }

  function deleteTask(taskid) {
    if (taskid && taskid != "") {
      remove(ref(database, 'users/' + uid + '/tasks/' + taskid))
        .then(console.log('task with id ' + taskid + ' deleted successfully'))
        .catch((error) => {
          console.log('error deleting task with error:' + error)
        });
    }
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {data.tasks &&
            <CardTable color="light" tabledata={data.tasks} addTask={addTask} deleteTask={deleteTask} />
          }
        </div>
        <div className="w-full mb-12 px-4">
        {data.tasks &&
            <CardTable color="dark" tabledata={data.tasks} addTask={addTask} deleteTask={deleteTask} />
          }
        </div>
      </div>
    </>
  );
}

Tables.layout = Workspace;
