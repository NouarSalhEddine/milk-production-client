import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import Cow from "./cow";
import CreateCows from "./components/create-cows.component";
import EditCows from "./components/edit-cows.component";
import DeleteCows from "./components/delete-Cows.component";
import { BACKEND_URL } from "../../config";
import { Navigate, useNavigate } from "react-router-dom";

function Vaches() {
  const navigate = useNavigate();
  // *********formsState*************

  const [showToastAdd, setShowToastAdd] = useState(false);

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
  }

  return (
    <div>
      <Col
        xs={6}
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
        }}
      >
        <Toast
          onClose={() => {
            setShowToastAdd(false);
          }}
          show={showToastAdd}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Add Successful</strong>
            <small>11 sec ago</small>
          </Toast.Header>
          <Toast.Body>Cows has been successfully uploaded</Toast.Body>
        </Toast>
      </Col>

      {/* ********************************** */}
      <CreateCows
        showToast={showToastAdd}
        setShowToast={setShowToastAdd}
        setRefresh={setRefresh}
        refresh={refresh}
      />
      {/* ***************add*************** */}

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
            return (
              <tr key={index} onClick={() => openCow(cow.id)} style={{cursor: 'pointer'}}>
                <td
                  style={{ fontWeight: "bold" }}
                >
                  {cow.serial_number}{" "}
                </td>
                <td>{cow.entry_date}</td>
                <td>{cow.breed}</td>
                <td>
                  <DeleteCows
                    id={cow.id}
                    setRefresh={setRefresh}
                    refresh={refresh}
                  />
                  <EditCows
                    serialNumber={cow.serial_number}
                    entryDate={cow.entry_date}
                    breed={cow.breed}
                    showToast={showToastAdd}
                    setShowToast={setShowToastAdd}
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
    </div>
  );
}

export default Vaches;
