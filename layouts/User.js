import React from "react";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import UserSidebar from "../components/Sidebar/Usersidebar.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

export default function User({ children }) {
  return (
    <>
      <UserSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="relative bg-blueGray-800 md:pt-28 pb-32 pt-12"/>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
