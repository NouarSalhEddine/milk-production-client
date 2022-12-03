import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Topbar = () => {
  return (
    <div className=" text-center ">
     <Navbar style={{paddingLeft:"auto" ,textAlign:"center"}} className="ml-4 text-center topbar">
        <Container>
          <h3  className=" text-light" href="#">Dieu donne le lait, mais non le seau</h3>
        </Container>
      </Navbar>
    </div>
  );
};

export default Topbar;
