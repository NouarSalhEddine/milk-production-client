import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CreateCowsComponent from "./components/CreateCowsComponent";
import EditCows from "./components/edit-cows.component";
import DeleteCows from "./components/delete-Cows.component";
import { BACKEND_URL } from "../../config";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function Vaches() {
  const navigate = useNavigate();

  // *********States*************

  const [refresh, setRefresh] = useState(false);
  // const [id, setId] = useState('');
  const [addCows, setAddCows] = useState([
    {
      id: "",
      serial_number: "",
      entry_date: "",
      breed: "",
    },
  ]);

  useEffect(() => {
    const url = `${BACKEND_URL}/cows`;
    axios.get(url).then((res) => {
      setAddCows(res.data);
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
          Les Vaches
          <CreateCowsComponent refresh={refresh} setRefresh={setRefresh} />
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Numéro De Serie</th>
                <th>Date d'entrer</th>
                <th>Race</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addCows.map((cow, index) => {
                const entryDate = new Date(cow.entry_date).toLocaleDateString();
                return (
                  <tr
                    key={index}
                    onClick={() => openCow(cow.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={{ fontWeight: "bold" }}>{cow.serial_number} </td>
                    <td>{entryDate}</td>
                    <td>{cow.breed}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <DeleteCows
                        id={cow.id}
                        setRefresh={setRefresh}
                        refresh={refresh}
                      />
                      <EditCows
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
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Vaches;
