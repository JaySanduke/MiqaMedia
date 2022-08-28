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
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + tid + '/subtasks/'));
  const [tabledata, setTabledata] = useState([]);

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      setWid(router.query.wid);
      setTid(router.query.tid);
      // console.log(user.uid);
      // console.log(wpid)
      // console.log(tid)
    }
  } , [router.query.tid, router.query.wid, uloading, user]);


  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val());
      setTabledata(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if(error) {
      console.log('Error: ' + error );
    }
  }, [uid, snapshot, loading, error]);

  function addSubtask(data) {
    
    if (uid) {
    const postk = push(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + tid + '/subtasks/')).key

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

      update(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + tid + '/subtasks/' + postk), taskdetails);
    }
  }

  // function deleteSubtask(taskid) {
  //   // eslint-disable-next-line eqeqeq
  //   if (taskid && taskid != "") {
  //     remove(ref(database, 'users/' + uid + '/workspace/' + wpid + '/tasks/' + taskid))
  //       .then(console.log('task with id ' + taskid + ' deleted successfully'))
  //       .catch((error) => {
  //         console.log('error deleting task with error:' + error)
  //       });
  //   }
  // }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardSubTask tabledata={tabledata} addSubtask={addSubtask}/>
        </div>
        <div className="w-full mb-12 px-4">
          <CardSubTask tabledata={tabledata} color="dark" />
        </div>
      </div>
    </>
  );
}

SubTask.layout = User;