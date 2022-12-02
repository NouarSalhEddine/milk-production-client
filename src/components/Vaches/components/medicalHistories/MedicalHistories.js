import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BACKEND_URL } from "../../../../config";


function MedicalHistories() {

  const [medicalHistories, setMedicalHistories] = useState([
    {
      id: "",
      cow: "",
      sickeness: "",
      diagnosis_date: "",
    },
  ]);
  useEffect(() => {
    const url = BACKEND_URL
    axios.get(`${url}/medical_histories/`).then((res) => {
      setMedicalHistories(res.data);
    })
    
  }, []);
  
  return (
    <Card style={{ marginTop: "2rem" }}>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Historique medicale
         
        </Card.Header>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Date de Diagnostic</th>
                <th>Maladie</th>
                
              </tr>
            </thead>
            <tbody>
            {medicalHistories.map((medical, index) => {
              
                return (
                  <tr key = {index}>
                    <td>{new Date(medical.diagnosis_date).toLocaleDateString()}</td>
                    <td>{medical.sickeness} </td>

                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

  )
}

export default MedicalHistories