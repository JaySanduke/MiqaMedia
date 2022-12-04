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

import { push, ref, remove, set, update } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

const auth = getAuth(app);

export default function ViewWorkspace() {

  const router = useRouter();

  const [user, uloading] = useAuthState(auth);
  const [uid, setUid] = useState(null);
  const [wid, setWid] = useState(router.query.wid);
  const [snapshot, loading, error] = useObject(ref(database, 'workspaces/' + wid));
  const [workspacedata, setWorkspaceData] = useState([]);

  const [userdetails, setUserdetails] = useState([]);

  useEffect(() => {
    if (user && !uloading) {
      setUid(user.uid);
      setWid(router.query.wid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserdetails({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
    }
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


  // async function adduser(userlist, wid) {
  //   if (userlist !== undefined) {
  //     for (let i of userlist) {
  //       console.log(i);
  //       update(ref(database, 'users/' + i + '/invites'), {
  //         [wid]: {
  //           ownerdetails: userdetails,
  //           workspaceid: wid,
  //           createddate: Date.now(),
  //           status: "pending"
  //         }
  //       })
  //         .then(() => {
  //           console.log('Workspace added to user');
  //         })
  //     }
  //   }
  // }

  // async function removeuser(userrm, wpid) {
  //   if (workspacedata.users != undefined) {

  //     let newusers = [];
  //     for (let i of userrm) {

  //       remove(ref(database, 'users/' + i + '/workspace/' + wpid))

  //       if (workspacedata.users.includes(i)) {
  //         newusers = await workspacedata.users.filter((item) => item !== i);
  //       }
  //     }
  //     await console.log(newusers);

  //     await update(ref(database, 'workspaces/' + wid), {
  //       users: newusers
  //     })
  //   }
  // }

  // async function useradd(data,wpid) {
  //   await adduser(data.users, wpid);

  //       let assigneduser = [];

  //       if (workspacedata.assignedusers == undefined) {
  //         assigneduser = await data.users;
  //       }
  //       else {
  //         assigneduser = await workspacedata.assignedusers;
  //         for (let i of data.users) {
  //           // console.log(i);
  //           if (assigneduser.includes(i) === false) {
  //             await assigneduser.push(i);
  //           }
  //         }
  //       }

  //       console.log(assigneduser);

  //       let Workspacedetails = await {
  //         "workspacename": data.name,
  //         "desc": data.desc,
  //         assignedusers: assigneduser,
  //       };

  //       await console.log(Workspacedetails);


  // await update(ref(database, 'workspaces/' + wid), Workspacedetails)
  //   .then(
  //     router.push("/user/workspace").then(() => {
  //       console.log('Workspace updated successfully')
  //     })
  //   )
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }

  async function updateWorkspace(data, wpid) {
    if (uid && wpid && data) {
      console.log(data);

      let Workspacedetails = await {
        "workspacename": data.name,
        "desc": data.desc,
      }

      await update(ref(database, 'workspaces/' + wpid), Workspacedetails)
        .then(
          router.push("/user/workspace").then(() => {
            console.log('Workspace updated successfully')
          })
        )
        .catch(error => {
          console.log(error);
        });

      //   if (data.userrm !== undefined && data.users == undefined) {
      //     await removeuser(data.userrm, wpid);
      //   }
      //   else if (data.users !== undefined && data.userrm == undefined) {
      //     await useradd(data, wpid);
      //   }
      //   else if (data.users !== undefined && data.userrm !== undefined) {
      //     await removeuser(data.userrm, wpid);
      //     await useradd(data, wpid);
      //   }
    }
  }

  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ViewEditWorkspace user={user} uid={uid} wid={wid} owner={workspacedata.owner} ownerdetails={userdetails} workspacedata={workspacedata} updateWorkspace={updateWorkspace} />
        </div>
      </div>
    </>
  );
}

ViewWorkspace.layout = User;