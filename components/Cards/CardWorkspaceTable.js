import React from "react";
import PropTypes from "prop-types";

// components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import WorkspaceItem from "components/Items/WorkspaceItem";
import AddWorkspace from "components/Modal/AddWorkspace";

import { database } from "../../components/firebase";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, push, update, remove, onValue, get, set } from "firebase/database";

const auth = getAuth();

export default function CardWorkspaceTable({ color, uid, user }) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);

  const [userdetails, setUserdetails] = useState([]);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      // console.log("user", user);
      setUserdetails({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });
    }
  }, [user]);

  useEffect(() => {
    if (uid) {
      onValue(ref(database, "users/" + uid + "/workspace"), async (snapshot) => {
        if (snapshot.exists()) {
          var workspacedata = [];
          // console.log(snapshot.val());
          for (let i in snapshot.val()) {
            await get(ref(database, "workspaces/" + i)).then(async (snapshot) => {
              if (snapshot.exists()) {
                // console.log(snapshot.val());
                workspacedata.push(snapshot.val());
              }
            });
          }
          // await console.log(workspacedata);
          const obj = await [{ workspaces: workspacedata }];
          // await console.log(obj);
          await setBoardData(obj);
        }
        else {
          setBoardData([]);
          console.log("No data available");
        }
      });
    }
  }, [uid]);

  // useEffect(() => {
  //   console.log(wdata);
  //   for (let i in wdata) {
  //     workspacedata.push(wdata[i]);
  //   }

  //   const obj = [{ workspaces: workspacedata }];
  //   setBoardData(obj);
  //   console.log(obj);
  // }, [uid, wdata]);

  async function invitemail(useremaillist, wid, wname) {
    await console.log(useremaillist);
    
    if (useremaillist.length > 0 && useremaillist !== undefined) {
      var invitedu = [];

      useremaillist.forEach(async (useremail) => {
        await fetch("/api/invitemail/invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: useremail,
            workspaceid: await wid,
            workspacename: await wname,
            ownerdetails: userdetails,

          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            if (data.status === "success") {
              update(
                ref(database, "users/" + data.user.uid),
                {
                  uid: data.user.uid,
                  email: data.user.email,
                  // name: data.user.email.split("@")[0],
                  invites: {
                    [wid]: {
                      ownerdetails: userdetails,
                      workspaceid: wid,
                      workspacename: wname,
                      createddate: Date.now(),
                      status: "pending",
                    }
                  }
                }
              )
                .then(() => {
                  console.log("Email sent");
                })
                .then(() => {
                  console.log("Invitation sent successfully");
                })
                .then(() => {
                  console.log("Workspace added to user!");
                })
              await invitedu.push(data.user.uid);
            }
            else if (data.error.error.code == "ESOCKET") {
              console.log("Network error, Email not sent");
              await fetch("/api/invitemail/invite", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: data.email,
                  workspaceid: await wid,
                  workspacename: await wname,
                  ownerdetails: userdetails,
                }),
              })
            }
            else if (data.error.error.code == "auth/email-already-in-use") {
              console.log("Email already in use");
              get(ref(database, "users"))
                .then(async (snapshot) => {
                  console.log(snapshot.val());
                  if (snapshot.exists()) {
                    let users = snapshot.val();
                    let found = {
                      status: false,
                      uid: "",
                    };

                    for (let i in users) {
                      if (users[i].email == data.email) {
                        found.status = true;
                        found.uid = users[i].uid;
                      }
                    }

                    if (found.status) {
                      update(
                        ref(database, "users/" + found.uid + "/invites"),
                        {
                          [wid]: {
                            ownerdetails: userdetails,
                            workspaceid: wid,
                            workspacename: wname,
                            createddate: Date.now(),
                            status: "pending",
                          },
                        }
                      )
                        .then(() => {
                          console.log("Invitation sent successfully");
                        })
                        .then(() => {
                          console.log("Workspace added to user!");
                        })
                      await invitedu.push(found.uid);
                    }
                    else {
                      console.log("User not found in database but email already in use so please login with user credentials");
                      // await update(ref(database, "users/" + data.user.uid), {
                      //   email: data.user.email,
                      //   name: data.user.displayName,
                      //   uid: data.user.uid,
                      //   invites: {
                      //     [wid]: {
                      //       ownerdetails: userdetails,
                      //       workspaceid: wid,
                      //       createddate: Date.now(),
                      //       status: "pending",
                      //     }
                      //   }
                      // })
                      //   .then(() => {
                      //     console.log("Workspace added to user!");
                      //   })
                    }
                  }
                })
            }
          })
          .catch((err) => {
            console.log("error");
            console.log(err);
          })
      })
      return await invitedu;
    }
  }

  async function adduser(userlist, wid, wname) {
    if (userlist !== undefined && wid && wname) {
      for (let i in userlist) {
        console.log(userlist[i].value);

        update(ref(database, 'users/' + userlist[i].value + '/invites'), {
          [wid]: {
            ownerdetails: userdetails,
            workspaceid: wid,
            workspacename: wname,
            createddate: Date.now(),
            status: "pending"
          }
        })
          .then(() => {
            console.log('Workspace added to user');
          })
      }
    }
  }

  async function addWorkspace(data, userdata, inviteuser) {
    if (uid) {
      // const postk = push(ref(database, 'users/' + uid + '/workspace')).key

      let a = await data.title;
      a = await a.trim().split(' ').join('').toLowerCase();

      var finalusers = [];

      const postk = await a;

      await adduser(userdata, postk, data.title);
      await invitemail(inviteuser, postk, data.title)
        .then(async (invitedusers) => {
          console.log(invitedusers);
          // final users
          if(userdata.length > 0 && invitedusers.length == 0){
            finalusers = await [...userdata];
          }
          else if(invitedusers.length > 0 && userdata == 0){
            finalusers = await [...invitedusers];
          }
          else if(userdata.length > 0 && invitedusers.length > 0){
            finalusers = await [...userdata, ...invitedusers];
          }

        })

      const workspacedetails = await {
        "createddate": data.assignDate,
        "desc": data.desc,
        "owner": uid,
        "assignedusers": await finalusers,
        "wid": postk,
        "workspacename": data.title,
      };

      await update(ref(database, 'users/' + uid + '/workspace'), {
        [postk]: data.title,
      })
        .then(() => {
          update(ref(database, 'workspaces/' + postk), workspacedetails)
        })
        .then(console.log("Worksapce Added Successfully!"))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function archieveWorkspace(wid) {
    // eslint-disable-next-line eqeqeq
    if (wid && wid != "") {

      console.log(wid);

      const wpref = ref(database, 'users/' + uid + '/workspace/' + wid);

      onValue(wpref, (snapshot) => {
        console.log(snapshot.val());
        let val = snapshot.val();
        update(ref(database, 'users/' + uid + '/archieveworkspace/'), {
          [wid]: val,
        })
          .then(() => {
            update(ref(database, 'workspaces/' + wid), {
              "archieved": true,
            })
          })
          .then(
            remove(wpref)
              .then(
                console.log('Workspace with id ' + wid + ' archieved successfully and added to archieve')
              )
              .catch((error) => {
                console.log('error in archieving workspace with error:' + error)
              })
          )
      }, { onlyOnce: true });
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(result.source.droppableId)].workspaces[
      result.source.index
      ];
    newBoardData[parseInt(result.source.droppableId)].workspaces.splice(
      result.source.index,
      1
    );
    newBoardData[parseInt(result.destination.droppableId)].workspaces.splice(
      result.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Total Workspaces
              </h3>
            </div>
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-blueGray-700" : "text-white")
              }
            >
              <AddWorkspace uid={uid} addWorkspace={addWorkspace} />
            </h3>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            {ready && (
              <DragDropContext onDragEnd={onDragEnd}>
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      ID
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Workspace Name
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Workspace Description
                    </th>

                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Owner
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Date
                    </th>

                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >Action</th>
                  </tr>
                </thead>
                {boardData && boardData.map((board, bIndex) => {
                  return (
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <tbody
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {board.workspaces.length > 0 &&
                            board.workspaces.map((item, iIndex) => {
                              return (
                                <WorkspaceItem
                                  key={item.wid}
                                  data={item}
                                  index={iIndex}
                                  archieveWorkspace={archieveWorkspace}
                                />
                              );
                            })}
                          {provided.placeholder}
                        </tbody>
                      )}
                    </Droppable>
                  );
                })}
              </DragDropContext>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

CardWorkspaceTable.defaultProps = {
  color: "light",
};

CardWorkspaceTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};