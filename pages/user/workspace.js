import React from "react";
import { useEffect, useState } from "react";
import User from "layouts/User";
import CardInviteWorkspace from "components/Cards/CardInviteWorkspace";
import CardWorkspaceTable from "components/Cards/CardWorkspaceTable";

// firebase
import { getAuth } from "firebase/auth";

import { app } from "../../components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(app);

export default function Workspace() {
  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
    }
  }, [user, uloading]);

  // async function getWorkspace() {
  //   if (snapshot && !loading && !error) {
  //     console.log("function working--------");
  //     const temp = [];

  //     for (let i in snapshot.val()) {
  //       // console.log(i);
  //       await onValue(ref(database, "workspaces/" + i), async (snapshot) => {
  //         // console.log(snapshot.val());
  //         temp.push(snapshot.val());
  //       });
  //     }
  //     return temp;
  //   }
  // }

  // async function getInvite() {
  //   if (invites && !inviteloading && !inviteerror) {
  //     console.log("Invite loading--------");
  //     const temp = [];

  //     for (let i in snapshot.val()) {
  //       // console.log(i);
  //       await onValue(ref(database, "workspaces/" + i), async (snapshot) => {
  //         // console.log(snapshot.valz());
  //         temp.push(snapshot.val());
  //       })
  //       // .then(() => {
  //       //   console.log(temp);
  //       // })
  //     }
  //     return temp;
  //   }
  // }

  // useEffect(() => {
  // if (!loading && snapshot && !error) {
  //   console.log(snapshot.val());
  //   // setData(snapshot.val());
  //   getWorkspace().then((res) => {
  //     console.log(res);
  //     setData(res);
  //   });
  // } else if (loading) {
  //   console.log("data loading ...");
  // } else if (error) {
  //   console.log("Error: " + error);
  // }

  // if (invites && !inviteloading && !inviteerror) {
  //   console.log(invites.val());
  //   getInvite().then((res) => {
  //     setInvite(res);
  //   });
  // }
  // }, [uid, loading, error]);

  return (
    <>
      <div className="flex flex-wrap">
        {uid && <CardWorkspaceTable uid={uid} user={user} />}
        {uid && <CardInviteWorkspace uid={uid} />}
      </div>
    </>
  );
}

Workspace.layout = User;
