import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import Cows from "../../cows/list/Cows";
import MedicalHistories from "../../medical_histories/MedicalHistories";
import Births from "../../births/Births";
import Milk from "../../milk/Milk";
import Cow from "../../cows/read/ReadCow";


const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    className= {classNames({ "is-open": sidebarIsOpen })}
    style={{padding: '20px 50px 50px 50px'}}
  >
    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}><img style={{ width: "130px" }} src="/cow.png" alt="logo" />
</div>
      <hr className=" fw-bold "/>
    <Routes >
      <Route exact path="/" element={<Navigate replace to="/cows" />}/>
      <Route exact path="/cows" element={<Cows />} />
      <Route exact path="/medical_histories" element={<MedicalHistories />} />
      <Route exact path="/births" element={<Births />} />
      <Route exact path="/milk-production" element={<Milk />} />
      <Route exact path="/vaches/:id" element={<Cow />} />
      </Routes>
  
    
  </Container>
);

export default Content;
