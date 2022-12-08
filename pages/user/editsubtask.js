import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";

// components

import ViewEditSubTask from "components/Modal/ViewEditSubTask";

// layout for page

import Workspace from "layouts/Workspace";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, update } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function EditSubTask() {

  const router = useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [tid, setTid] = useState(router.query.tid);
  const [wpid, setWpid] = useState(router.query.wid);
  const [sid, setSid] = useState(router.query.sid);
  const [snapshot, loading, error] = useObject(ref(database, `workspaces/${wpid}/tasks/${tid}/subtasks/${sid}`));
  const [subtaskdata, setSubTaskData] = useState([]);

  const [subdomain, setSubDomain] = useState(false);

  const subtaskd = [];

  useEffect(() => {
    var hostname = window.location.hostname;
    var hsplit = hostname.split('.');
    var workspace = hsplit[0];
    console.log(workspace);

    if (workspace !== 'localhost') {
      setSubDomain(true);
      setWpid(workspace);
    }
  }, []);

  useEffect(() => {
    if (subdomain) {
      const cauth = JSON.parse(JSON.parse(localStorage.getItem('auth')));
      setUid(cauth.currentUser.uid);
      console.log(cauth);
      setTid(router.query.tid);
      setSid(router.query.sid);
    }
    else {
      if (user && !uloading) {
        setUid(user.uid);
        setTid(router.query.tid);
        setWpid(router.query.wid);
        setSid(router.query.sid);
        console.log(sid);
      }
    }
  }, [subdomain, router.query.sid, router.query.tid, router.query.wid, uloading, user]);

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(sid);
      console.log(snapshot.val());

      setSubTaskData(snapshot.val());

    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, tid, sid, loading, snapshot, error]);

  useEffect(() => {
    for (let i in subtaskdata) {
      subtaskd.push(subtaskdata[i]);
    }

    // eslint-disable-next-line eqeqeq, array-callback-return
    subtaskd.filter((item) => item.id == sid).map((stm) => {
      console.log(stm);
      setSubTaskData(stm);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtaskdata]);

  function updateSubTask(data, id) {

    if (uid && tid && id) {
      update(ref(database, `workspaces/${wpid}/tasks/${tid}/subtasks/${id}`), {
        title: data.title,
        desc: data.desc,
        created_at: data.assignDate,
        completion_date: data.completionDate,
        status: data.status
      })
        .then(
          router.push("/user/subtask?tid=" + tid).then(() => {
            console.log('Sub Task updated successfully!')
          })
        )
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ViewEditSubTask wid={wpid} tid={tid} sid={sid} subtaskdata={subtaskdata} updateSubTask={updateSubTask} />
        </div>
      </div>
    </>
  );
}

EditSubTask.layout = Workspace;