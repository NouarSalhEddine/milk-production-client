import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CreateCowsComponent from "./CreateCow";
import EditCowsComponent from "./EditCow";
import DeleteCowsComponent from "./DeleteCow";
import { BACKEND_URL } from "../../../config";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function Cows() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [addCows, setAddCows] = useState([
    {
      id: "",
      serial_number: "",
      entry_date: "",
      breed: "",
    },
  ]);

  useEffect(() => {
    setLoading(true);
    const url = `${BACKEND_URL}/cows`;
    axios.get(url).then((res) => {
      setAddCows(res.data);
      setLoading(false);
      res.data.sort(({serial_number: a}, {serial_number: b}) => new Date(b) - new Date(a))
    });
  }, [refresh]);

  const openCow = (cowId) => {
    navigate(`/vaches/${cowId}`);
  };

  return (
    <div>
      <Card style={{ marginTop: "2rem" }}>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Cliquer sur la vache pour ajouter/modifier l'historique medicale ou
          naissances
          <CreateCowsComponent
            loading={loading}
            setLoading={setLoading}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Card.Header>
        <Card.Body>
          {addCows.length > 0 ? (
            <Table striped bordered hover style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>Numéro De Serie</th>
                  <th>Date d'entrer</th>
                  <th>Race</th>
                  <th>Actions</th>
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
                  {addCows.map((cow, index) => {
                    const entryDate = new Date(
                      cow.entry_date
                    ).toLocaleDateString();
                    return (
                      <tr key={index} style={{ cursor: "pointer" }}>
                        <td
                          className="text-danger"
                          onClick={() => openCow(cow.id)}
                          style={{ fontWeight: "bold" }}
                        >
                          {cow.serial_number}{" "}
                        </td>
                        <td onClick={() => openCow(cow.id)}>{entryDate}</td>
                        <td onClick={() => openCow(cow.id)}>{cow.breed}</td>
                        <td
                          style={{ cursor: "auto" }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <DeleteCowsComponent
                            loading={loading}
                            setLoading={setLoading}
                            setRefresh={setRefresh}
                            refresh={refresh}
                            id={cow.id}
                          />
                          <EditCowsComponent
                            loading={loading}
                            setLoading={setLoading}
                            serialNumber={cow.serial_number}
                            entryDate={cow.entry_date}
                            breed={cow.breed}
                            setRefresh={setRefresh}
                            refresh={refresh}
                            id={cow.id}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </Table>
          ) : (
            <div style={{ textAlign: "center" }}>Aucune vache disponible</div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cows;
