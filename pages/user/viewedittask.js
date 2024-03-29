import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";

// components

import VieworEditTask from "components/Modal/ViewEditTask";

// layout for page

import Workspace from "layouts/Workspace";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, update } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function ViewEditTask() {

  const router = useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [tid, setTid] = useState(router.query.tid);
  const [wpid, setWpid] = useState(router.query.wid);
  const [snapshot, loading, error] = useObject(ref(database, 'workspaces/' + wpid + '/tasks'));
  const [taskdata, setTaskData] = useState([]);

  const [subdomain, setSubDomain] = useState(false);

  const taskd = [];

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
    }
    else {
      if (user && !uloading) {
        setUid(user.uid);
        setTid(router.query.tid);
      }
    }
  }, [subdomain, router.query.tid, router.query.wid, uloading, user]);

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(tid);
      console.log(snapshot.val());
      setTaskData(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, tid, loading, snapshot, error]);

  useEffect(() => {
    for (let i in taskdata) {
      taskd.push(taskdata[i]);
    }

    // eslint-disable-next-line eqeqeq, array-callback-return
    taskd.filter((item) => item.id == tid).map((itm) => {
      console.log(itm);
      setTaskData(itm);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskdata]);

  function updateTask(data, id) {

    if (uid && tid && id) {
      update(ref(database, 'workspaces/' + wpid + '/tasks/' + id), {
        title: data.title,
        desc: data.desc,
        created_at: data.assignDate,
        completion_date: data.completionDate,
        status: data.status,
      })
        .then(
          router.push("/user/tables").then(() => {
            console.log('Task updated successfully')
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
          <VieworEditTask tid={tid} taskdata={taskdata} updateTask={updateTask} />
        </div>
      </div>
    </>
  );
}

ViewEditTask.layout = Workspace;