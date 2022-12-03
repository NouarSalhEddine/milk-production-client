import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { BACKEND_URL } from "../../config";

function MedicalHistories() {
  const [loading, setLoading] = useState(false);
  const [medicalHistories, setMedicalHistories] = useState([
    {
      id: "",
      cow: "",
      sickeness: "",
      diagnosis_date: "",
    },
  ]);
  useEffect(() => {
    setLoading(true);
    const url = BACKEND_URL;
    axios.get(`${url}/medical_histories/`).then((res) => {
      setMedicalHistories(res.data);
      setLoading(false);
      res.data.sort(({diagnosis_date: a}, {diagnosis_date: b}) => new Date(b) - new Date(a))
    });
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
        <div style={{ marginBottom: "10px" }}>
          Pour ajouter une nouvelle historique medicale, veuillez cliquer sur le
          menu Vache et selectionner une vache
        </div>
        {medicalHistories.length > 0 ? (
          <Table striped>
            <thead>
              <tr>
                <th>Vaches</th>
                <th>Date de Diagnostic</th>
                <th>Maladie</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={4} className="p-4 text-center">
                    {" "}
                    <Spinner animation="border" role="status">
                      <span
                        style={{}}
                        className="d-flex justify-content-md-center visually-hidden"
                      >
                        Loading...
                      </span>
                    </Spinner>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {medicalHistories.map((medical, index) => {
                  return (
                    <tr key={index}>
                      <td>{medical.cow.serial_number}</td>
                      <td>
                        {new Date(medical.diagnosis_date).toLocaleDateString()}
                      </td>
                      <td>{medical.sickeness} </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </Table>
        ) : (
          <div style={{ textAlign: "center" }}>
            Aucune historique medical disponible
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default MedicalHistories;
