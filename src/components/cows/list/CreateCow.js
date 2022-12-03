import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function CreateCowsComponent({loading,setLoading ,refresh, setRefresh }) {
  //  **************states*************
  const [cows, setCows] = useState({
    serial_number: "",
    entry_date: "",
    breed: "",
  });
  // ************statesForm********
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //  **************HandleFunction*************

  const onChangeSerialNumber = (e) => {
    setCows({ ...cows, serial_number: e.target.value });
  };
  const onChangeDateEntry = (e) => {
    setCows({ ...cows, entry_date: e.target.value });
  };
  const onChangeBreed = (e) => {
    setCows({ ...cows, breed: e.target.value });
  };
  

  //  **************axios*************
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const { serial_number, entry_date, breed } = cows;
    const url = `${BACKEND_URL}/cows`;
   
    axios
      .post(url, {
        serial_number,
        entry_date: new Date(entry_date),
        breed,
      })
      .then((response) => {
        refresh ? setRefresh(false) : setRefresh(true);
        setShowToast(true)
        
        setCows({
          serial_number: "",
          entry_date: "",
          breed: "",
        });
        if (response.status === 500) {
        } else if (response.status === 200 && response.data.status === 200) {
        } else if (response.status === 200 && response.data.status !== 200) {
          console.log(
            "Error inserted new data because : " + response.data.message
          );
        } else {
          console.log("Server error with : " + response.data);
        }
      })
      .catch((err) => console.warn(err));

    console.log("submit");
  };
  //  **************axios*************
  return (
    <div>
      
      <Col style={{position: 'absolute', top: -180, left:-270, zIndex: 1}} xs={6}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Téléchargement</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Une vache a eté ajouter!</Toast.Body>
        </Toast>
      </Col>
     
   
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>
      
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter Une Vache</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>numero de serie :</Form.Label>
                <Form.Control
               
                  onChange={onChangeSerialNumber}
                  type="number"
                />
              </Form.Group>
              <Form.Group controlId="dateEntry">
                <Form.Label>date d'entrer :</Form.Label>
                <Form.Control
                
                  type="date"
                  onChange={onChangeDateEntry}
                />
              </Form.Group>

              <Form.Label>Races :</Form.Label>
              <Form.Select
                aria-label="Default select example"
              
                onChange={onChangeBreed}
              >
                <option  >Selectionner la race</option>
                <option value="montbéliarde">Montbéliarde</option>
                <option value="holstein">Holstein</option>
              </Form.Select>

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
  );
}

export default CreateCowsComponent;
