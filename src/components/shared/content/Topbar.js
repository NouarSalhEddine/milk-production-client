import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Topbar = () => {
  return (
    <div>
     <Navbar className="topbar">
        <Container>
          <Navbar.Brand className="text-light" href="#home">Acceuil</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default Topbar;
