import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./components/shared/sidebar/SideBar";
import Content from "./components/shared/content/Content";
import Topbar from "./components/shared/content/Topbar";
import "./App.css";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
      <Topbar />
      <div className="App wrapper">
        
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
      <footer style={{paddingTop:"100px"}} className="  text-center ">
      <div > 
        <p>Projet réalisé par Nouar Salah Eddine - 2022 </p>
        <p>Les icones Milk production manager , sont prises sur fontAwesome.com</p>
        
        <small className="text-muted ">Copyright © 1992 - 2022 . Tous droits réservés.</small>
      </div>
   </footer>
    </Router>
  );
};

export default App;
