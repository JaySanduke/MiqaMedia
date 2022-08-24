import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";

// components

import ViewEditWorkspace from "components/Modal/ViewEditWorkspace";

// layout for page

import User from "layouts/User";

// firebase

import { getAuth } from "firebase/auth";

import { app, database } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, update } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function ViewWorkspace() {

  const router = useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState('');
  const [wid, setWid] = useState(router.query.wid);
  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace/' + wid));
  const [workspacedata, setWorkspaceData] = useState([]);

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      setWid(router.query.wid);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(wid);
      console.log(snapshot.val());

      setWorkspaceData(snapshot.val());

    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, wid, loading, snapshot, error]);

  function updateWorkspace(data, wpid) {

    let Workspacedetails = {
      workspacename: data.name,
      desc: data.desc,
      users: data.users
    };

    if (uid && wid && wpid) {
      update(ref(database, 'users/' + uid + '/workspace/' + wpid), Workspacedetails)
        .then(
          router.push("/user/workspace").then(() => {
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
          <ViewEditWorkspace wid={wid} workspacedata={workspacedata} updateWorkspace={updateWorkspace} />
        </div>
      </div>
    </>
  );
}

ViewWorkspace.layout = User;