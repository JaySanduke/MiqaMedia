import React from "react";
import Router from "next/router";

import { useEffect, useState } from "react";

// components

import CardSubTask from "components/Cards/CardSubTask";

// layout for page

import User from "layouts/User";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, push, update, remove } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function SubTask() {

  const router = Router.useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [wpid, setWid] = useState(router.query.wid);
  const [tid, setTid] = useState(router.query.tid);
  const [snapshot, loading, error] = useObject(ref(database, 'workspaces/' + wpid + '/tasks/' + tid));
  const [tabledata, setTabledata] = useState([]);

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
      setTid(router.query.tid);
    }
    else {
      if (user && !uloading) {
        setUid(user.uid);
        setWid(router.query.wid);
        setTid(router.query.tid);
        // console.log(user.uid);
        // console.log(wpid)
        // console.log(tid)
      }
    }
  }, [subdomain, router.query.tid, router.query.wid, uloading, user]);


  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val());
      setTabledata(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, snapshot, loading, error]);

  function addSubtask(data) {

    if (uid) {
      const postk = push(ref(database, 'workspaces/' + wpid + '/tasks/' + tid + '/subtasks/')).key

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

      update(ref(database, 'workspaces/' + wpid + '/tasks/' + tid + '/subtasks/' + postk), taskdetails);
    }
  }

  function deleteSubtask(subtaskid) {
    // eslint-disable-next-line eqeqeq
    if (subtaskid && subtaskid != "") {
      remove(ref(database, 'workspaces/' + wpid + '/tasks/' + tid + '/subtasks/' + subtaskid))
        .then(console.log('subtask with id ' + subtaskid + ' deleted successfully'))
        .catch((error) => {
          console.log('error deleting subtask with error:' + error)
        });
    }
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSubTask owner={tabledata.owner} uid={uid} wid={wpid} tid={tid} tuser={tabledata.assignees} tabledata={tabledata.subtasks} addSubtask={addSubtask} deleteSubtask={deleteSubtask} />
        </div>
        <div className="w-full mb-12 px-4">
          <CardSubTask color="dark" owner={tabledata.owner} uid={uid} wid={wpid} tid={tid} tuser={tabledata.assignees} tabledata={tabledata.subtasks} addSubtask={addSubtask} deleteSubtask={deleteSubtask} />
        </div>
      </div>
    </>
  );
}

SubTask.layout = User;