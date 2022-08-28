import React from "react";
import { createPopper } from "@popperjs/core";
import Link from "next/dist/client/link";
import router from "next/router";

const WorkspaceDropdown = ({ wid, deleteWorkspace, wsubdomain }) => {

  // const [url, setUrl] = React.useState([]);

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

  // useEffect(() => {

  //   var hostname = window.location.hostname;
  //   var protocol = window.location.protocol;
  //   var port = window.location.port;
  //   var hsplit = hostname.split('.');
  //   console.log(hsplit);
  //   if (hsplit[0] == "localhost") {
  //     // var workspace = protocol + "//xyz." + hsplit.join('.') + ":" + port + "/user/demotable/";
  //     var wprot = protocol + "//";
  //     var wdomai = hsplit.join('.') + ":" + port + "/user/demotable/";
  //     let vurl = [wprot,wdomai]
  //     setUrl(vurl);
  //     console.log(url);
  //     // console.log(wprot+ wid + "." + wdomai)
  //   }
  // }, [wid]);

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
          <Link href={{ pathname: '/user/vieweditworkspace/', query: { wid: wid } }} >
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
          onClick={(e) => {
            closeDropdownPopover();
            wsubdomain(wid);
          }
            // console.log(url[0] + wid + "." + url[1])
          }
        >
          {/* <Link href={ url[0] + wid + "." + url[1] } > */}
          <Link href={{pathname: '/user/tables', query: { wid: wid } }} >
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
                "fas  fa-download mr-2 text-sm " +
                (router.pathname.indexOf("#") !== -1
                  ? "opacity-75"
                  : "text-blueGray-300")
              }
            ></i>{" "}
            Archive Workspace
          </a>
        </a>
      </div>
    </>
  );
};

export default WorkspaceDropdown;