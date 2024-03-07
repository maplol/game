"use client";
import { Global } from "@emotion/react";
import React from "react";
import Game from "../components/Game";
import globalStyles from "../styles/global";

const HomeContainerView = () => (
  <>
    <Global styles={globalStyles} />
    <Game />
  </>
);

export default HomeContainerView;
