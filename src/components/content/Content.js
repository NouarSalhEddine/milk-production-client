import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes ,Route } from 'react-router-dom';
import Cows from "../Vaches/components/cows/Cows";
import MedicalHistories from "../Vaches/components/medicalHistories/MedicalHistories";
import Births from "../Vaches/components/births/Births";
import Milk from "../Vaches/components/milk/Milk";
import Cow from "../Vaches/components/cowInformations/cow";
import Topbar from "./Topbar";



const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
  fluid
  className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Routes>
      <Route exact path="/" component={() => "Hello"} />
      <Route exact path="/vaches" element={<Cows  />} />
      <Route exact path="/MedicalHistories" element={<MedicalHistories  />} />
      <Route exact path="/Births" element={<Births  />} />
      <Route exact path="/Milk" element={<Milk  />} />
      <Route exact path="/vaches/:id" element={<Cow />} />
     
     
    </Routes>
    
  </Container>
);

export default Content;
