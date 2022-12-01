import React,{useState } from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes ,Route } from 'react-router-dom';
import Vaches from "../Vaches/Vaches";
import Cow from "../Vaches/cow";
import Topbar from "./Topbar";



const Content = ({ sidebarIsOpen, toggleSidebar ,userCow,setUserCow}) => (
  <Container
  fluid
  className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Routes>
      <Route exact path="/" component={() => "Hello"} />
      <Route exact path="/vaches" element={<Vaches userCow={userCow} setUserCow={setUserCow} />} />
      <Route exact path="/vaches/:id" element={<Cow userCow={userCow} setUserCow={setUserCow}/>} />
     
     
    </Routes>
  </Container>
);

export default Content;
