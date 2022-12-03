import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "../../../../config";
import axios from "axios";
function EditMedicalHistories({
  sickenesse,
  diagnosisDate,
  cowId,
  id,
  setLoading,
  refresh,
  setRefresh,
}) {
  const [show, setShow] = useState(false);
  const [medical, setMedical] = useState({ diagnosis_date: "", sickeness: "" });
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setMedical({
      diagnosis_date: diagnosisDate,
      sickeness: sickenesse,
    });
    setShow(true);
  };

  const handleChangeDate = (e) => {
    setMedical({ ...medical, diagnosis_date: e.target.value });
  };
  const handleChangeSicknesse = (e) => {
    setMedical({ ...medical, sickeness: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { diagnosis_date, sickeness } = medical;
    const url = `${BACKEND_URL}/medical_histories/${id}`;
    axios
      .put(url, {
        cow: cowId,
        diagnosis_date,
        sickeness,
      })
      .then(() => {
        refresh ? setRefresh(false) : setRefresh(true);
      })
      .catch((err) => console.warn(err));
  };
  const entryDateObj = new Date(medical.diagnosis_date);
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
          <Modal.Title>Modifier visites medicale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Date de Diagnostic</Form.Label>
              <Form.Control
                type="date"
                onChange={handleChangeDate}
                defaultValue={formattedDate}
              />
            </Form.Group>

            <Form.Label>Maladies</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={medical.sickeness}
              onChange={handleChangeSicknesse}
            >
              <option>Selectioner La Maladie</option>
              <option value="Diarrhée virale">Diarrhée virale</option>
              <option value="Encéphalopathie spongiforme bovine">
                Encéphalopathie spongiforme bovine
              </option>
              <option value="Rhinotrachéite infectieuse">
                Rhinotrachéite infectieuse
              </option>
              <option value="campylobactériose">campylobactériose</option>
              <option value="dermatite nodulaire"> dermatite nodulaire</option>
              <option value="paragrippe-3">paragrippe-3</option>
              <option value="peste bovine">peste bovine</option>
              <option value="avortement chlamydiose">
                avortement chlamydiose
              </option>
              <option value="gangrène emphysémateuse">
                gangrène emphysémateuse
              </option>
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

export default EditMedicalHistories;
