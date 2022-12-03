import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BACKEND_URL } from "../../config";

function Births() {
  // *********States*************

  const [refresh, setRefresh] = useState(false);
  // const [id, setId] = useState('');
  const [births, setBirths] = useState([
    {
      id: "",
      cow: "",
      birth_date: "",
    },
  ]);

  useEffect(() => {
    const url = `${BACKEND_URL}/births`;
    axios.get(url).then((res) => {
      setBirths(res.data);
    });
  }, []);

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
          Naissances
        </Card.Header>
        <Card.Body>
          {births.length > 0 ? <Table striped>
            <thead>
              <tr>
                <th>Date de Naissance</th>
                <th className="text-center">Vaches</th>
              </tr>
            </thead>
            <tbody>
              {births.map((birth, index) => {
                return (
                  <tr key={index}>
                    <td style={{ paddingLeft: "20px" }}>
                      {new Date(birth.birth_date).toLocaleDateString()}
                    </td>
                    <td className="text-center">{birth.cow.serial_number}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table> : <div style={{textAlign: 'center'}}>Aucune naissance disponible</div> }
           
        </Card.Body>
      </Card>
    </div>
  );
}

export default Births;
