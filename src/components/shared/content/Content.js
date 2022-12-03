import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import Cows from "../../cows/list/Cows";
import MedicalHistories from "../../medical_histories/MedicalHistories";
import Births from "../../births/Births";
import Milk from "../../milk/Milk";
import Cow from "../../cows/read/ReadCow";
import Topbar from "./Topbar";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    className={classNames({ "is-open": sidebarIsOpen })}
    style={{padding: '0px'}}
  >
    <Topbar />
    <div fluid="xxl" class="content">
    <Routes>
      <Route exact path="/" element={<Navigate replace to="/cows" />}/>
      <Route exact path="/cows" element={<Cows />} />
      <Route exact path="/medical_histories" element={<MedicalHistories />} />
      <Route exact path="/births" element={<Births />} />
      <Route exact path="/milk-production" element={<Milk />} />
      <Route exact path="/vaches/:id" element={<Cow />} />
      </Routes>
    </div>
    <footer className="text-center ">
      <div > 
        <p>Projet réalisé par Nouar Salah Eddine - 2022 </p>
        <p>Les icones Milk production manager , sont prises sur fontAwesome.com</p>
        
        <small className="text-muted ">Copyright © 1992 - 2022 . Tous droits réservés.</small>
      </div>
   </footer>
  </Container>
);

export default Content;
