import React, { useState, useEffect } from "react";
import CreateMedicalHistories from "./medical_history/CreateMedicalHistory";
import DeleteMedicalHistories from "./medical_history/DeleteMedicalHistory";
import EditMedicalHistories from "./medical_history/EditMedicalHistory";
import CreateBirths from "./births/CreateBirth";
import EditBirths from "./births/EditBirth";
import DeleteBirths from "./births/DeleteBirth";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { BACKEND_URL } from "../../../config";
import { useParams } from "react-router-dom";

function Cow() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    axios.get(`${url}/cows/${cowId}`).then((res) => {
      setCow(res.data);
    });

    axios.get(`${url}/medical_histories/cow/${cowId}`).then((res) => {
      setMedicalHistories(res.data);
    });
    axios.get(`${url}/births/cow/${cowId}`).then((res) => {
      setBirths(res.data);
      setLoading(false);
    });
  }, [refresh]);

  const entry_date = new Date(cow.entry_date).toLocaleDateString();

  return (
    <div>
      {loading ? (
        <Card>
          <Card.Body style={{ margin: "270px auto", textAlign: "center" }}>
            <Spinner animation="border" role="status">
              <span style={{}} className=" text-center visually-hidden">
                Loading...
              </span>
            </Spinner>
          </Card.Body>
        </Card>
      ) : (
        <>
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
              <CreateMedicalHistories
                cowId={cowId}
                loading={loading}
                setLoading={setLoading}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </Card.Header>
            <Card.Body>
              {medicalHistories.length > 0 ? (
                <Table striped>
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
                          <td>
                            {new Date(
                              medical.diagnosis_date
                            ).toLocaleDateString()}
                          </td>
                          <td>{medical.sickeness} </td>
                          <td className="d-flex justify-content-center align-items-center">
                            {" "}
                            <DeleteMedicalHistories
                              id={medical.id}
                              loading={loading}
                              setLoading={setLoading}
                              setRefresh={setRefresh}
                              refresh={refresh}
                            />
                            <EditMedicalHistories
                              sickenesse={medical.sickeness}
                              diagnosisDate={medical.diagnosis_date}
                              cowId={cowId}
                              id={medical.id}
                              loading={loading}
                              setLoading={setLoading}
                              setRefresh={setRefresh}
                              refresh={refresh}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div style={{ textAlign: "center" }}>
                  Aucune historique medical disponible
                </div>
              )}
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
              Accouchement
              <CreateBirths
                cowId={cowId}
                loading={loading}
                setLoading={setLoading}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </Card.Header>
            <Card.Body>
              {births.length > 0 ? (
                <Table striped>
                  <thead>
                    <tr>
                      <th>Date de D'accouchement</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {births.map((birth, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ paddingLeft: "10px" }}>
                            {new Date(birth.birth_date).toLocaleDateString()}
                          </td>

                          <td className="d-flex justify-content-center align-items-center">
                            <DeleteBirths
                              id={birth.id}
                              loading={loading}
                              setLoading={setLoading}
                              setRefresh={setRefresh}
                              refresh={refresh}
                            />
                            <EditBirths
                              birthDate={birth.birth_date}
                              loading={loading}
                              setLoading={setLoading}
                              cowId={cowId}
                              id={birth.id}
                              setRefresh={setRefresh}
                              refresh={refresh}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div style={{ textAlign: "center" }}>
                  Aucune naissance disponible
                </div>
              )}
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
}

export default Cow;
