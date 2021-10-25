import React from "react";
import Current from "../current/Current";
import Filter from "../filter/Filter";

import "./main.scss";

export default function Main() {
  return (
    <div className="main">
      <Filter className="filter" />
      <Current />
    </div>
  );
}