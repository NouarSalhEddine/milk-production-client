import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BACKEND_URL } from "../../../../config";
import axios from "axios";

function CreateBirths({ setLoading, cowId, refresh, setRefresh }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [births, setBirths] = useState({ date: "" });

  const handleChangeDate = (e) => {
    setBirths({ ...births, date: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { date } = births;
    const url = `${BACKEND_URL}/births/`;

    axios
      .post(url, {
        cow: cowId,
        birth_date: new Date(date),
      })
      .then((response) => {
        refresh ? setRefresh(false) : setRefresh(true);
        setBirths({ date: "" });

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
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter la date de naissance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
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
  );
}

export default CreateBirths;
