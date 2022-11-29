import React, { useEffect } from "react";
import { createPopper } from "@popperjs/core";

import "../../components/firebase";
import { getAuth, signOut } from "firebase/auth";
import Router from "next/router";
import Link from "next/link";

const UserNavDropdown = () => {
  const [wauth, setWauth] = React.useState();
  const [subdomain, setSubDomain] = React.useState(false);

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useEffect(() => {
    var auth = {}

    const hostname = window.location.hostname;
    var hsplit = hostname.split('.');
    console.log('Domain: ' + hsplit[0]);
    console.log('SubDomain: ' + hsplit[1]);

    if (hsplit[0] === "localhost" || (hsplit[0] === "tdpvista" && hsplit[1] === "co" && hsplit[2] === "in")) {
      setSubDomain(false);
      auth = getAuth();
      console.log(auth);
      auth.onAuthStateChanged((user) => {
        if (user == null) {
          window.location.href = "/auth/login";
        }
      })
    }
    else if (hsplit[1] === "localhost" || (hsplit[1] === "tdpvista" && hsplit[1] === "co" && hsplit[2] === "in")) {
      setSubDomain(true);
      let oauth = localStorage.getItem("auth");
      oauth = JSON.parse(JSON.parse(oauth));
      console.log(oauth);

      if (oauth == null || oauth == undefined) {
        if (hsplit[1] === "localhost") {
          window.location.href = "http://localhost:3000/auth/login";
        }
        else if (hsplit[1] === "tdpvista" && hsplit[2] === "co" && hsplit[3] === "in") {
          window.location.href = "http://tdpvista.co.in/auth/login";
        }
      }
      else {
        auth = oauth;
      }
    }
  }, [])


  const logout = async () => {
    const hostname = window.location.hostname;
    var hsplit = hostname.split('.');

    if (hsplit[0] === ("localhost" || "tdpvista")) {
      const auth = getAuth();
      signOut(auth).then(() => {
        window.location.href = "/auth/login";
      });
    }
    else if (hsplit[1] === "localhost") {
      await localStorage.removeItem('auth');
      window.location.href = await "http://localhost:3000/user/workspace";
      const auth = await getAuth();
      await signOut(auth);
    }
    else if (hsplit[1] === "tdpvista") {
      await localStorage.removeItem('auth');
      window.location.href = await "https://tdpvista.co.in/user/workspace";
      const auth = await getAuth();
      await signOut(auth);
    }
  }

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/team-1-800x800.jpg"
            />
          </span>
        </div>
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
            onClick={async (e) => {
              await e.preventDefault();
              await closeDropdownPopover();
              await Router.push("/user/profile");
            }}
          >
            Profile
          </a>
        {/* <div className="h-0 my-2 border border-solid border-blueGray-100" /> */}
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={async () => {
            await closeDropdownPopover();
            await logout()
          }}
        >
          <i
            className={
              "fas fa-sign-out-alt mr-2 text-sm"
            }
          ></i>{" "}
          {subdomain ? "Go to Workspace" : "Logout"}
        </a>
      </div>
    </>
  );
};

export default UserNavDropdown;
