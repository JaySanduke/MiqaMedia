import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Link from "next/link";
import router from "next/router";

function ArchiveItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.workspace_id.toString()}>
      {(provided) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold
                    "
          >
            {data.workspace_id}
          </td>
          <td
            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ml-3 font-bold
                    "
          >
            {data.workspace_title}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.workspace_description}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.workspace_users}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {data.workspace_date}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <a
              href="#pablo"
              className={
                "text-sm font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
            >
              <Link
                href={{
                  pathname: "/user/workspace/"
                }}
              >
                {/* <Link href='/user/viewedittask/' > */}
                <a
                  href="#pablo"
                  className={
                    "text-xs uppercase font-bold block " +
                    (router.pathname.indexOf("/user/workspace/") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                >
                  <i
                    className={
                      "fas fa-tools mr-2 text-sm " +
                      (router.pathname.indexOf("/user/workspace/") !==
                      -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  Unarchive Workspace
                </a>
              </Link>
            </a>
          </td>
        </tr>
      )}
    </Draggable>
  );
}

export default ArchiveItem;
