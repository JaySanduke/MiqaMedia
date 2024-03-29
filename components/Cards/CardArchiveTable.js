import React from "react";
import PropTypes from "prop-types";

// components
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import BoardData from "data/workspace-data.json";
import ArchiveItem from "components/Items/ArchiveItem";

import { database } from "../firebase";

import { ref, get, update, remove, onValue } from "firebase/database";

export default function CardArchiveTable({ color, uid }) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      onValue(ref(database, 'users/' + uid + '/archieveworkspace'), async (snapshot) => {
        if (snapshot.exists()) {
          var archievewp = [];
          console.log(snapshot.val());
          for (let i in snapshot.val()) {
            await get(ref(database, "workspaces/" + i)).then(async (snapshot) => {
              if (snapshot.exists()) {
                console.log(snapshot.val());
                archievewp.push(snapshot.val());
              }
            });
          }
          await console.log(archievewp);
          const obj = await [{ workspaces: archievewp }];
          await console.log(obj);
          await setBoardData(obj);
        }
        else {
          setBoardData([]);
          console.log("No data available");
        }
      });
    }
  }, [uid]);


  function unarchieve(wid) {
    console.log(wid);

    // eslint-disable-next-line eqeqeq
    if (wid && wid != "") {

      console.log(wid);

      const wpref = ref(database, 'users/' + uid + '/archieveworkspace/' + wid);

      onValue(wpref, (snapshot) => {
        console.log(snapshot.val());
        let val = snapshot.val();
        update(ref(database, 'users/' + uid + '/workspace'), {
          [wid]: val,
        })
          .then(() => {
            remove(ref(database, 'workspaces/' + wid + '/archieved'))
          })
          .then(
            remove(wpref)
              .then(
                console.log('Workspace with id ' + wid + ' unarchieved sucessfully')
              )
              .catch((error) => {
                console.log('error in unarchieved:' + error)
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
                Total Archive Workspaces
              </h3>
            </div>
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-blueGray-700" : "text-white")
              }
            >
              {/* <AddWorkspace/> */}
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
                      Workspace Title
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
                      Workspace Users
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
                    >
                      Action
                    </th>
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
                                <ArchiveItem
                                  key={item.wid}
                                  data={item}
                                  index={iIndex}
                                  unarchieve={unarchieve}
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

CardArchiveTable.defaultProps = {
  color: "light",
};

CardArchiveTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};