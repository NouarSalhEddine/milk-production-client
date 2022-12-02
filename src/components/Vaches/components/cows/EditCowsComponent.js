import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BACKEND_URL } from "../../../../config";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
function EditCowsComponent({
  refresh,
  setRefresh,
  id,
  serialNumber,
  entryDate,
  breed,
}) {
  //  **************states*************
  const [cows, setCows] = useState({
    serial_number: "",
    entry_date: "",
    breed: "",
  });
  
  // ************statesForm********
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  ;
  const handleShow = () => {
    setCows({
      serial_number: serialNumber,
      entry_date: entryDate,
      breed: breed,
    })
    setShow(true)
  };
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
    const { serial_number, entry_date, breed } = cows;
    const url = `${BACKEND_URL}/cows/${id}`;

    axios
      .put(url, {
        serial_number,
        entry_date: new Date(entry_date),
        breed,
      })
      .then((response) => {
        refresh ? setRefresh(false) : setRefresh(true);
        console.log("refresh");
        
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

  const entryDateObj = new Date(cows.entry_date)
  const formattedDate = `${entryDateObj.getFullYear()}-${entryDateObj.getMonth() < 10 ? `0${entryDateObj.getMonth()}` : entryDateObj.getMonth()}-${entryDateObj.getDate() < 10 ? `0${entryDateObj.getDate()}` : entryDateObj.getDate()}`
  return (
    <div>
      <Button
        style={{ marginLeft: "10px" }}
        variant="warning"
        onClick={() => handleShow()}
        size="sm"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>numero de serie :</Form.Label>
              <Form.Control
                value={cows.serial_number}
                onChange={onChangeSerialNumber}
                type="number"
              />
            </Form.Group>
            <Form.Group controlId="dateEntry">
              <Form.Label>date d'entrer :</Form.Label>
              <Form.Control
                type="date"
                value={formattedDate}
                onChange={onChangeDateEntry}
              />
            </Form.Group>

            <Form.Label>Races :</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={cows.breed}
              onChange={onChangeBreed}
            >
              <option >Selectionner la race</option>
              <option value="montbéliarde">Montbéliarde</option>
              <option value="holstein">Holstein</option>
            </Form.Select>
            <hr />

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

export default EditCowsComponent;
