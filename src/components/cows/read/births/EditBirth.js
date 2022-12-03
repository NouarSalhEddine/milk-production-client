import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BACKEND_URL } from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EditBirths({ birthDate, id, cowId, setLoading, refresh, setRefresh }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [births, setBirths] = useState({ birth_date: "" });
  const handleShow = () => {
    setBirths({ birth_date: birthDate });
    setShow(true);
  };

  const handleChangeDate = (e) => {
    setBirths({ ...births, birth_date: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${BACKEND_URL}/births/${id}`;

    axios
      .put(url, {
        cow: cowId,
        birth_date: new Date(births.birth_date),
      })
      .then(() => {
        refresh ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => console.warn(err));
  };
  const entryDateObj = new Date(births.birth_date);
  const formattedDate = `${entryDateObj.getFullYear()}-${
    entryDateObj.getMonth() < 10
      ? `0${entryDateObj.getMonth() + 1}`
      : entryDateObj.getMonth() + 1
  }-${
    entryDateObj.getDate() < 10
      ? `0${entryDateObj.getDate()}`
      : entryDateObj.getDate()
  }`;

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
                value={formattedDate}
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

export default EditBirths;
