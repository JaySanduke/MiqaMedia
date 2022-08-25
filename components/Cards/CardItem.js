import React from "react";
import {
  PlusIcon,
  ChatAlt2Icon,
  PaperClipIcon,
} from "@heroicons/react/outline"
import { Draggable } from "react-beautiful-dnd";

function CardItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.task_id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <h5 className="text-md my-3 text-lg leading-6">{data.task_title}</h5>
          
          <h5 className="text-md flex-1 my-3 text-lg leading-6">{data.task_description}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <ChatAlt2Icon className="w-4 h-4 text-black" />
                <span>{data.task_users}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <PaperClipIcon className="w-4 h-4 text-black" />
                <span>{data.task_date}</span>
              </span>
            </div>

            <ul className="flex">
              {/* {data.task_assignees.map((ass, index) => {
                return (
                  <li key={index}>
                    <Image
                      src={ass.avt}
                      width="36"
                      height="36"
                      objectFit="cover"
                      className=" rounded-full "
                    />
                  </li>
                );
              })} */}
              <li>
                <button
                  className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                    rounded-full"
                >
                  <PlusIcon className="w-5 h-5 text-gray-500" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        
      )}
    </Draggable>
  );
}

export default CardItem;