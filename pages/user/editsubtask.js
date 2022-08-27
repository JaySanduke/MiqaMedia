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
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + tid + '/subtasks/' + sid));
  const [subtaskdata, setSubTaskData] = useState([]);

  const subtaskd = [];

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      setTid(router.query.tid);
      setWpid(router.query.wid);
      setSid(router.query.sid);
    }
  }, [router.query.sid, router.query.tid, router.query.wid, uloading, user]);

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(tid);
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

    // let taskdetails = {
    //   title: data.title,
    //   desc: data.desc,
    //   created_at: data.assignDate,
    //   completion_date: data.completionDate,
    //   status: data.status,
    //   assignees: [data.assignee],
    // };

    if (uid && tid && sid && id) {
      update(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + sid + '/subtasks' + id), {
        title: data.title,
        desc: data.desc,
        created_at: data.assignDate,
        completion_date: data.completionDate,
        status: data.status,
        assignees: [data.assignee],
      })
        .then(
          router.push("/user/subtask?tid="+tid).then(() => {
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
          <ViewEditSubTask tid={tid} sid={sid} taskdata={subtaskdata} updateSubTask={updateSubTask} />
        </div>
      </div>
    </>
  );
}

EditSubTask.layout = Workspace;