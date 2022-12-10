import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";
import Link from "next/dist/client/link";
import router from "next/router";
import { getAuth } from "firebase/auth";

const WorkspaceDropdown = ({ wid, archieveWorkspace }) => {

  const auth = getAuth();

  const [url, setUrl] = React.useState("");

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

  // async function post() {

  //   var hostname = window.location.hostname;
  //   var protocol = window.location.protocol;
  //   var port = window.location.port;
  //   var hsplit = hostname.split('.');
  //   var url = '';
  //   const wID = wid.slice(1).toLowerCase();
  //   // console.log(hsplit);
  //   // eslint-disable-next-line eqeqeq
  //   if (hsplit[0] == "localhost") {
  //     // var workspace = protocol + "//xyz." + hsplit.join('.') + ":" + port + "/user/demotable/";
  //     const wprot = protocol + "//";
  //     const wdomai = hsplit.join('.') + ":" + port + "/user/demotable"
  //     // console.log(workspace);
  //     url = wprot + wID + "." + wdomai;
  //     console.log(url);
  //     // window.location.href = wprot + wid + "." + wdomai;
  //   }

  //   const response = await fetch(
  //     '/api/workspace/' + wid, {
  //     method: 'POST',
  //     body: JSON.stringify({ wdata }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  //   );

  //   await response.json().then((r) => {
  //     console.log(r);

  //     // window.location.assign(url);
  //     localStorage.setItem("wdata", JSON.stringify(r));
  //     // const ld = localStorage.getItem("wdata");
  //     // console.log(ld);

  //   });

  // }

  useEffect(() => {
    var hostname = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    var hsplit = hostname.split('.');
    var url = '';
    const wID = wid.toLowerCase();
    // console.log(hsplit);
    // eslint-disable-next-line eqeqeq
    if (hsplit[0] == "localhost") {
      // var workspace = protocol + "//xyz." + hsplit.join('.') + ":" + port + "/user/demotable/";
      const wprot = protocol + "//";
      const wdomai = hsplit.join('.') + ":" + port + "/api/workspace/" + wid;
      // console.log(workspace);
      url = wprot + wID + "." + wdomai;
      // console.log(url);
      setUrl(url);
      // window.location.href = wprot + wid + "." + wdomai;
    }
  }, [wid]);

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
        <form id="postform" method="POST" action={url}>
          <input name="auth" type="hidden" value={JSON.stringify(auth)} />
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          // onClick={(e) => {
          // closeDropdownPopover();
          // wsubdomain(wid);
          // post();
          // }
          // console.log(url[0] + wid + "." + url[1])
          // }
          >
            {/* <Link href={ url[0] + wid + "." + url[1] } > */}
            {/* <Link href={{pathname: '/user/tables', query: { wid: wid } }} > */}
            <button
              type="submit"
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
            </button>
            {/* </Link> */}
          </a>
        </form>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => {
            closeDropdownPopover();
            const wp = String(wid);
            archieveWorkspace(wp);
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