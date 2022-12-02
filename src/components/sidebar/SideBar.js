import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCow,
  faNotesMedical,
  faWhiskeyGlass,
  faBaby,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => (
  <div  className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header ">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Milk Production Manager</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Production du lait</p>

        <NavItem>
          <NavLink tag={Link} to={"/vaches"}>
            <FontAwesomeIcon icon={faCow} className="p-2" />
            Vaches
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/MedicalHistories"}>
            <FontAwesomeIcon icon={faNotesMedical} className="p-2" />
            Visite Midicals
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to={"/Births"}>
            <FontAwesomeIcon icon={faBaby} className="p-2" />
            naissance
          </NavLink>
        </NavItem>
        <NavItem></NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/Milk"}>
            <FontAwesomeIcon icon={faWhiskeyGlass} className="p-2" />
            Lait
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

export default SideBar;
