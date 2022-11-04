import React from "react";
import { useEffect, useState } from "react";
import User from "layouts/User";
import CardInviteWorkspace from "components/Cards/CardInviteWorkspace";
import CardWorkspaceTable from "components/Cards/CardWorkspaceTable";

// firebase
import { getAuth } from "firebase/auth";

import { app } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { ref, onValue } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

import { database } from "../../components/firebase";

const auth = getAuth(app);

export default function Workspace() {
  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState("");
  const [snapshot, loading, error] = useObject(
    ref(database, "users/" + uid + "/workspace")
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
    }
  }, [user, uloading]);

  async function getWorkspace() {
    if (snapshot && !loading && !error) {
      console.log("function working--------");
      const temp = [];

      for (let i in snapshot.val()) {
        console.log(i);
        await onValue(ref(database, "workspaces/" + i), async (snapshot) => {
          console.log(snapshot.val());
          temp.push(snapshot.val());
        });
      }
      return temp;
    }
  }

  useEffect(() => {
    if (!loading && snapshot && !error) {
      console.log(snapshot.val());
      // setData(snapshot.val());
      getWorkspace().then((res) => {
        setData(res);
      });
    } else if (loading) {
      console.log("data loading ...");
    } else if (error) {
      console.log("Error: " + error);
    }
  }, [uid, loading, error]);

  return (
    <>
      {user && (
        <div className="flex flex-wrap">
          <CardWorkspaceTable uid={uid} wdata={data} />
          <CardInviteWorkspace uid={uid} wdata={data} />
        </div>
      )}
    </>
  );
}

Workspace.layout = User;
