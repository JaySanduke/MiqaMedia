import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/dist/client/image";
import AddTask from "components/Modal/AddTask.";
import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import CardItem from "./CardItem";
import BoardData from "../../data/board-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function CardBoard({ color }) {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          task_id: createGuidId(),
          task_priority: 0,
          task_title: val,
          task_description: val,
          task_users: 0,
          task_date: "1/1/2001",
          task_assignees: [
            {
              avt: "https://randomuser.me/api/portraits/men/75.jpg",
            },
          ],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
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
                Board View
              </h3>
            </div>
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-blueGray-700" : "text-white")
              }
            >
              <AddTask />
              {/* <DatePicker/> */}
            </h3>
          </div>

          <div className="flex flex-col h-screen">
            {/* Board columns */}
            {ready && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-4 gap-6 my-5">
                  {boardData.map((board, bIndex) => {
                    return (
                      <div key={board.name}>
                        <Droppable droppableId={bIndex.toString()}>
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              <div
                                className={`bg-custom text-white bg-blueGray-800 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                              >
                                <h4 className=" p-3 flex justify-between items-center mb-2">
                                  <span className="text-2xl text-white">
                                    {board.name}
                                  </span>
                                  <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
                                </h4>

                                <div
                                  className="overflow-y-auto overflow-x-hidden h-auto my-3 text-black"
                                  style={{ maxHeight: "calc(100vh - 290px)" }}
                                >
                                  {board.items.length > 0 &&
                                    board.items.map((item, iIndex) => {
                                      return (
                                        <CardItem
                                          key={item.id}
                                          data={item}
                                          index={iIndex}
                                          className="m-3"
                                        />
                                      );
                                    })}
                                  {provided.placeholder}
                                </div>

                                  {/* <div>
                                  {showForm && selectedBoard === bIndex ? (
                                  <div className="p-3 text-black">
                                    <textarea
                                      className="border-gray-300 rounded focus:ring-purple-400 w-full"
                                      rows={3}
                                      placeholder="Task info"
                                      data-id={bIndex}
                                      onKeyDown={(e) => onTextAreaKeyPress(e)}
                                    />
                                  </div>
                                ) : (
                                  <button
                                    className="flex justify-center items-center my-3 space-x-2 text-lg"
                                    onClick={() => {
                                      setSelectedBoard(bIndex);
                                      setShowForm(true);
                                    }}
                                  >
                                    <span>Add task</span>
                                    <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                                  </button>
                                )}
                                  </div> */}
                              </div>
                            </div>
                          )}
                        </Droppable>
                      </div>
                    );
                  })}
                </div>
              </DragDropContext>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

CardBoard.defaultProps = {
  color: "light",
};

CardBoard.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};