import React from "react";
import User from "layouts/User";
import CardArchiveTable from "components/Cards/CardArchiveTable";

export default function Archive() {

  return (
    <>
    <div className="flex flex-wrap">
        <CardArchiveTable />
      </div>
    </>
  );
}

Archive.layout = User;
