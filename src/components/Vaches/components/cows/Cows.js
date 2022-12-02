import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CreateCowsComponent from "./CreateCowsComponent";
import EditCowsComponent from "./EditCowsComponent";
import DeleteCowsComponent from "./DeleteCowsComponent";
import { BACKEND_URL } from "../../../../config";
import { Navigate, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

function Cows() {
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
          Cliquer sur la vache pour ajouter/modifier l'historique medicale ou naissances
          <CreateCowsComponent refresh={refresh} setRefresh={setRefresh} />
        </Card.Header>
        <Card.Body>
         
          {addCows.length > 0 ?   <Table striped bordered hover style={{marginTop: '10px'}}>
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
                   
                    style={{ cursor: "pointer" }}
                  >
                    <td  onClick={() => openCow(cow.id)} style={{ fontWeight: "bold" }}>{cow.serial_number} </td>
                    <td  onClick={() => openCow(cow.id)} >{entryDate}</td>
                    <td  onClick={() => openCow(cow.id)} >{cow.breed}</td>
                    <td  style={{ cursor: "auto" }} className="d-flex justify-content-center align-items-center">
                      <DeleteCowsComponent
                        setRefresh={setRefresh}
                        refresh={refresh}
                        id={cow.id}
                      />
                      <EditCowsComponent
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
          </Table> : <div style={{textAlign: 'center'}}>Aucune vache disponible</div> }
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cows;
