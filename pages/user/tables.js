import React, { useEffect, useState } from "react";
import Router from "next/router";

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Workspace from "layouts/Workspace";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, push, update, remove } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function Tables() {

  const router = Router.useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [wpid, setWid] = useState(router.query.wid);
  const [snapshot, loading, error] = useObject(ref(database, 'workspaces/' + wpid));
  const [data, setData] = useState([]);

  const [subdomain, setSubDomain] = useState(false);

  useEffect(() => {
    var hostname = window.location.hostname;
    var hsplit = hostname.split('.');
    var workspace = hsplit[0];
    console.log(workspace);

    if (workspace !== 'localhost') {
      setSubDomain(true);
      setWid(workspace);
    }
  }, []);

  useEffect(() => {
    if (subdomain) {
      const cauth = JSON.parse(JSON.parse(localStorage.getItem('auth')));
      setUid(cauth.currentUser.uid);
      console.log(cauth);
    }
    else {
      if (user && !uloading) {
        setUid(user.uid);
        console.log(router.query.wid)
        setWid(router.query.wid);
      }
    }
  }, [subdomain, user, uloading, router]);

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

  function addTask(data) {

    if (uid) {
      const postk = push(ref(database, 'workspaces/' + wpid + '/tasks/')).key

      const taskdetails = {
        "created_at": data.assignDate,
        "completion_date": data.completionDate,
        "id": postk,
        "owner": uid,
        "title": data.title,
        "desc": data.desc,
        "status": data.status,
        "priority": 0,
        "chat": 0,
        "attachment": 0,
        "assignees": data.assignee,
      };

      update(ref(database, 'workspaces/' + wpid + '/tasks/' + postk), taskdetails);
    }
  }

  function deleteTask(taskid) {
    // eslint-disable-next-line eqeqeq
    if (taskid && taskid != "") {
      remove(ref(database, 'workspaces/' + wpid + '/tasks/' + taskid))
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
          {/* {data.tasks && */}
            <CardTable color="light" uid={uid} wpid={wpid} owner={data.owner} tabledata={data.tasks} wuser={data.users} addTask={addTask} deleteTask={deleteTask} />
          {/* } */}
        </div>
          {/* <CardTable color="dark" tabledata={data.tasks} addTask={addTask} deleteTask={deleteTask} /> */}
      </div>
    </>
  );
}

Tables.layout = Workspace;
