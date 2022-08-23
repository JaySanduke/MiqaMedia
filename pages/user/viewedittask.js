import { React, useState, useEffect } from "react";
import router, {useRouter} from "next/router";

// components

import VieworEditTask from "components/Modal/ViewEditTask";

// layout for page

import Workspace from "layouts/Workspace";
// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, push, update, remove } from "firebase/database";
import { useObject, useList } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function ViewEditTask() {

  const router = useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [tid, setTid] = useState(router.query.tid);
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/tasks/'));
  const [taskdata, setTaskData] = useState([]);

  const taskd = [];

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      setTid(router.query.tid);
    }
  }, [user]);

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
  }, [uid, tid, loading]);

  useEffect(() => {
    for(let i in taskdata){
      taskd.push(taskdata[i]);
    } 
    
    taskd.filter((item) => item.id == tid).map((itm) => {
      console.log(itm);
      setTaskData(itm);
    })
  }, [taskdata]);

  function updateTask(data, id) {

    let taskdetails = {
      created_at: data.assignDate,
      completion_date: data.completionDate,
      title: data.title,
      desc: data.desc,
      status: data.status,
      // priority: 0,
      // chat: 0,
      // attachment: 0,
      assignees: [data.assignee],
    };

    if (uid && tid && id) {
      update(ref(database, 'users/' + uid + '/tasks/' + id), {
        title: data.title,
        desc: data.desc,
        created_at: data.assignDate,
        completion_date: data.completionDate,
        status: data.status,
        assignees: [data.assignee],
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