import React from "react";
import { createPopper } from "@popperjs/core";
import Link from "next/dist/client/link";
import router from "next/router";

const WorkspaceDropdown = ({wid, deleteWorkspace}) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => closeDropdownPopover()}
        >
          <Link href={{ pathname: '/user/vieweditworkspace/'}} >
          {/* <Link href='/user/viewedittask/' > */}
            <a
              href="#pablo"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/user/vieweditworkspace/") !== -1
                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
              }
            >
              <i
                className={
                  "fas fa-tools mr-2 text-sm " +
                  (router.pathname.indexOf("/user/vieweditworkspace/") !== -1
                    ? "opacity-75"
                    : "text-blueGray-300")
                }
              ></i>{" "}
              View & Edit Workspace
            </a>
          </Link>
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => closeDropdownPopover()}
        >
          <Link href={{ pathname: '/user/demotable/'}} >
          {/* <Link href='/user/viewedittask/' > */}
            <a
              href="#pablo"
              className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf("/user/demotable/") !== -1
                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                  : "text-blueGray-700 hover:text-blueGray-500")
              }
            >
              <i
                className={
                  "fas fa-stream mr-2 text-sm " +
                  (router.pathname.indexOf("/user/demotable/") !== -1
                    ? "opacity-75"
                    : "text-blueGray-300")
                }
              ></i>{" "}
              View Tasks
            </a>
          </Link>
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            closeDropdownPopover();
              const wp = String(wid);
              deleteWorkspace(wp);
          }}
        >
          <a
            href="#pablo"
            className={
              "text-xs uppercase py-3 font-bold block " +
              (router.pathname.indexOf("#") !== -1
                ? "text-lightBlue-500 hover:text-lightBlue-600"
                : "text-blueGray-700 hover:text-blueGray-500")
            }
          >
            <i
              className={
                "fas fa-trash mr-2 text-sm " +
                (router.pathname.indexOf("#") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Delete Workspace
          </a>
        </a>
      </div>
    </>
  );
};

export default WorkspaceDropdown;