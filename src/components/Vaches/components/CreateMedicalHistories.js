import React, { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BACKEND_URL } from "../../../config";
import axios from "axios";
function CreateMedicalHistories({ cowId,refresh,setRefresh}) {
  // ************statesForm********
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ***************statechange*********************************
  const [medical, setMedical] = useState({ date: "", sickeness: "" });
  
   
  // ***************funcchange*********************************
  const handleChangeDate = (e) => {
    
    setMedical({ ...medical, date: e.target.value })
  };
  const handleChangeSicknesse = (e) => {
    setMedical({ ...medical, sickeness: e.target.value })
   
  };
  
  // ***************axios*********************************
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, sickeness} = medical;
    const url = `${BACKEND_URL}/medical_histories/`;
    
    axios.post(url, {
        cow :cowId,
        diagnosis_date: new Date(date),
        sickeness 
      })
      .then((response) => {
        refresh ? setRefresh(false) : setRefresh(true)
        setMedical({ date : "" , sicknesse:""})
        

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
  }
  // ***************funcchange*********************************
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter visites medicale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
              <Form.Label>Date de Diagnostic</Form.Label>
              <Form.Control value={medical.date} onChange={handleChangeDate}  type="date"  />
            </Form.Group>

            <Form.Label>Maladies</Form.Label>
            <Form.Select
              aria-label="Default select example"
             
              value={medical.sicknesse}
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
            <hr />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} >
                Fermer
              </Button>
              <Button variant="primary" onClick={handleClose} type="submit">
                Valider
              </Button>
            </Modal.Footer>
          </Form >
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateMedicalHistories;
