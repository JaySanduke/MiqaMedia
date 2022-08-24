import React from "react";
import PropTypes from "prop-types";

// components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import WorkspaceItem from "components/Items/WorkspaceItem";
import AddWorkspace from "components/Modal/AddWorkspace";


import { database } from "../../components/firebase";

import { ref, push, update, remove } from "firebase/database";
import { useObject } from "react-firebase-hooks/database";

export default function CardWorkspaceTable({ color, uid }) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);

  const [snapshot, loading, error] = useObject(ref(database, 'users/' + uid + '/workspace'));
  const [data, setData] = useState([]);

  const workspacedata = [];

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  var wprot
  var wdomai

  useEffect(() => {
    if (process.browser) {
      setReady(true);

      // var hostname = window.location.hostname;
      // var protocol = window.location.protocol;
      // var port = window.location.port;
      // var hsplit = hostname.split('.');
      // console.log(hsplit);
      // if (hsplit[0] == "localhost") {
      //   // var workspace = protocol + "//xyz." + hsplit.join('.') + ":" + port + "/user/demotable/";
      //   wprot = protocol + "//";
      //   wdomai = hsplit.join('.') + ":" + port + "/user/demotable/"
      //   // console.log(workspace);
      // }
    }
  }, []);

  function wsubdomain(wid) {
    var hostname = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    var hsplit = hostname.split('.');
    console.log(hsplit);
    // eslint-disable-next-line eqeqeq
    if (hsplit[0] == "localhost") {
      // var workspace = protocol + "//xyz." + hsplit.join('.') + ":" + port + "/user/demotable/";
      wprot = protocol + "//";
      wdomai = hsplit.join('.') + ":" + port + "/user/demotable"
      // console.log(workspace);
      console.log(wprot + wid + "." + wdomai);
      // window.location.href = wprot + wid + "." + wdomai;
    }
  }

  useEffect(() => {
    if (!loading && snapshot) {
      console.log(snapshot.val());
      setData(snapshot.val());
    }
    else if (loading) {
      console.log('data loading ...');
    }
    else if (error) {
      console.log('Error: ' + error);
    }
  }, [uid, loading, snapshot, error]);

  useEffect(() => {

    for (let i in data) {
      workspacedata.push(data[i]);
    }

    const obj = [{ workspaces: workspacedata }];
    setBoardData(obj);
    console.log(obj);

    // var hostname = window.location.hostname;
    // var protocol = window.location.protocol;
    // var port = window.location.port;
    // var hsplit = hostname.split('.');
    // console.log(hsplit);
    // if (hsplit[0] == "localhost") {
    //   // var workspace = protocol + "//xyz." + hsplit.join('.') + ":" + port + "/user/demotable/";
    //   wprot = protocol + "//";
    //   wdomai = hsplit.join('.') + ":" + port + "/user/demotable/"
    // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function addWorkspace(data) {
    if (uid) {
      const postk = push(ref(database, 'users/' + uid + '/workspace')).key

      const workspacedetails = {
        "createddate": data.assignDate,
        "wid": postk,
        "workspacename": data.title,
        "desc": data.desc,
        "users": data.users,
      };

      update(ref(database, 'users/' + uid + '/workspace/' + postk), workspacedetails).then(
        reload()
      );
    }

  }

  function reload() {
    // setTimeout(function refreshPage() {
      window.location.reload(false);
    // }, 2000)
  }

  function deleteWorkspace(wid) {
    // eslint-disable-next-line eqeqeq
    if (wid && wid != "") {
      remove(ref(database, 'users/' + uid + '/workspace/' + wid))
        .then(console.log('Workspace with id ' + wid + ' deleted successfully'))
        .then(reload())
        .catch((error) => {
          console.log('error deleting task with error:' + error)
        });
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
              <AddWorkspace addWorkspace={addWorkspace} />
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
                      Users
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
                    ></th>
                  </tr>
                </thead>
                {boardData.map((board, bIndex) => {
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
                                  deleteWorkspace={deleteWorkspace}
                                  wsubdomain={wsubdomain}
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