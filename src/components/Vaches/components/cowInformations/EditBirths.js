import React, { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BACKEND_URL } from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EditBirths({ id, cowId, refresh, setRefresh }) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [births, setBirths] = useState({ date: ""});
 
   const handleChangeDate = (e) => {
     setBirths({ ...births, date: e.target.value });
   };
   
   const handleSubmit = (e) => {
     e.preventDefault();
     const { date } = births;
     const url = `${BACKEND_URL}/births/${id}`;
 
     axios
       .put(url, {
         cow: cowId,
         birth_date: new Date(date),
       })
       .then((response) => {
         refresh ? setRefresh(false) : setRefresh(true);
         setBirths({ date: "", sicknesse: "" });
 
         if (response.status === 200) {
           console.log("upload succesfuly");
         } else {
           console.log("Server error with : " + response.data);
         }
       })
       .catch((err) => console.warn(err));
  };
  
  return (
    <div>
      <Button
    style={{ marginLeft: "10px" }}
    variant="warning"
    onClick={handleShow}
    size="sm"
  >
    <FontAwesomeIcon icon={faPenToSquare} />
  </Button>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modifier la date de naissance</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date de Naissance</Form.Label>
          <Form.Control
            value={births.date}
            onChange={handleChangeDate}
            type="date"
          />
        </Form.Group>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose} type="submit">
            Valider
          </Button>
        </Modal.Footer>
      </Form>
    </Modal.Body>
      </Modal>
    </div>
  )
}

export default EditBirths