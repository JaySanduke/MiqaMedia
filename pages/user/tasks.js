import { React, useState, useEffect } from "react";

// components

import CardBoard from "components/Cards/CardBoard";

// layout for page

import User from "layouts/User";

export default function Tasks() {
  return (
    <>
      <CardBoard />
    </>
  );
}

Tasks.layout = User;