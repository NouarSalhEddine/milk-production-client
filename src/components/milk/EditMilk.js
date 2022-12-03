import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BACKEND_URL } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EditMilk({
  id,
  productionDate,
  quantity,
  setLoading,
  refresh,
  setRefresh,
}) {
  const [milk, setMilk] = useState({
    production_date: productionDate,
    quantity: quantity,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeDate = (e) => {
    setMilk({ ...milk, production_date: e.target.value });
  };
  const handleChangeQuantity = (e) => {
    setMilk({ ...milk, quantity: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { production_date, quantity } = milk;

    axios
      .put(`${BACKEND_URL}/milks/${id}`, {
        production_date: new Date(production_date),
        quantity,
      })
      .then((response) => {
        refresh ? setRefresh(false) : setRefresh(true);
        console.log("refresh");
        setMilk({
          production_date: "",
          quantity: "",
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
  const entryDateObj = new Date(milk.production_date);
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
          <Modal.Title>Modifier la quentité du lait</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date de production</Form.Label>
              <Form.Control
                defaultValue={formattedDate}
                onChange={handleChangeDate}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>quantity :</Form.Label>
              <Form.Control
                value={milk.quantity}
                onChange={handleChangeQuantity}
                type="text"
              />
            </Form.Group>
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

export default EditMilk;
