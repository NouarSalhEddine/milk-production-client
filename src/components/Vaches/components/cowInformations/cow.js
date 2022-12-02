import React, { useState, useEffect } from "react";
import CreateMedicalHistories from "./CreateMedicalHistories";
import DeleteMedicalHistories from "./DeleteMedicalHistories";
import EditMedicalHistories from "./EditMedicalHistories";
import CreateBirths from "./CreateBirths";
import EditBirths from "./EditBirths";
import DeleteBirths from "./DeleteBirths";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BACKEND_URL } from "../../../../config";
import { useParams } from "react-router-dom";

function Cow() {
  // *********************refresh****************
  const  [refresh, setRefresh]  = useState(false)
  
  
  // ***************states********************
  const { id: cowId } = useParams();
  const url = BACKEND_URL;
  const [cow, setCow] = useState([
    {
      id: "",
      serial_number: "",
      entry_date: "",
      breed: "",
    },
  ]);
  const [medicalHistories, setMedicalHistories] = useState([
    {
      id: "",
      cow: "",
      sickeness: "",
      diagnosis_date: "",
    },
  ]);
  const [births, setBirths] = useState([
    {
      id: "",
      cow: "",
      birth_date: "",
      
    },
  ]);
  //  ****************axios***********
  useEffect(() => {
    axios.get(`${url}/cows/${cowId}`).then((res) => {
      setCow(res.data);
    });

    axios.get(`${url}/medical_histories/cow/${cowId}`).then((res) => {
      setMedicalHistories(res.data);
    })
    axios.get(`${url}/births/cow/${cowId}`).then((res) => {
      setBirths(res.data);
    })
  }, [refresh]);
  
  console.log(births)
  
  const entry_date = new Date(cow.entry_date).toLocaleDateString();

  return (
    <div>
      
      <Card>
        <Card.Header>Information</Card.Header>
        <Card.Body>
          Numero de serie: {cow.serial_number}
          <br />
          Race: {cow.breed}
          <br />
          Date d'entree: {entry_date}
        </Card.Body>
      </Card>

      <Card style={{ marginTop: "2rem" }}>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Historique medicale
          <CreateMedicalHistories cowId={cowId } setRefresh={setRefresh} refresh={refresh}/>
        </Card.Header>
        <Card.Body>
          {medicalHistories.length > 0 ? <Table striped>
            <thead>
              <tr>
                <th>Date de Diagnostic</th>
                <th>Maladie</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicalHistories.map((medical, index) => {
                return (
                  <tr key={index}>
                    <td>{new Date(medical.diagnosis_date).toLocaleDateString()}</td>
                    <td>{medical.sickeness} </td>
                    <td className="d-flex justify-content-center align-items-center"> <DeleteMedicalHistories id={medical.id} setRefresh={setRefresh} refresh={refresh} /> <EditMedicalHistories cowId={cowId} id={medical.id} setRefresh={setRefresh} refresh={refresh} /></td>
                  </tr>
                );
              })}
            </tbody>
          </Table> : <div style={{textAlign: 'center'}}>Aucune historique medical disponible</div> }
        </Card.Body>
      </Card>

      <Card style={{ marginTop: "2rem" }}>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Naissances
          <CreateBirths cowId={cowId } setRefresh={setRefresh} refresh={refresh}/>
        </Card.Header>
        <Card.Body>
        { births.length > 0 ? <Table striped>
            <thead>
              <tr>
                <th className="text-center">Date de Naissance</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {births.map((birth, index) => {
                
                return (
                  <tr key = {index}>
                    <td  className="text-center">{new Date(birth.birth_date).toLocaleDateString()}</td>
                    
                    <td className="d-flex justify-content-center align-items-center">
                      <DeleteBirths id={birth.id} setRefresh={setRefresh} refresh={refresh} />
                      <EditBirths birthDate={birth.birth_date} cowId={cowId} id={birth.id} setRefresh={setRefresh} refresh={refresh} />
                    </td> 
                  </tr>
                );
              })}
            </tbody>
          </Table>  : <div style={{textAlign: 'center'}}>Aucune naissance disponible</div> }
        </Card.Body>
      </Card>
     
    </div>
  );
}

export default Cow;
