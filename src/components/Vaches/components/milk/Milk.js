import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BACKEND_URL } from "../../../../config";
import { useParams } from "react-router-dom";

function Milk() {
  // *********States*************

  const [refresh, setRefresh] = useState(false);
  // const [id, setId] = useState('');
  const [milk, setMilk] = useState([
    {
      id: "",
      production_date: "",
      quantity: "",
      
    },
  ]);

  useEffect(() => {
    const url = `${BACKEND_URL}/milks`;
    axios.get(url).then((res) => {
      setMilk(res.data);
    });
  }, [refresh]);
  


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
          Production du Lait Par Jour
          {/* <CreateMedicalHistories cowId={cowId } setRefresh={setRefresh} refresh={refresh}/> */}
        </Card.Header>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Date de Production</th>
                <th>Quentité</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {milk.map((milk, index) => {
                return (
                  <tr key = {index}>
                    <td>{ new Date(milk.production_date).toLocaleDateString()}</td>
                    <td>{milk.quantity} </td>
                    <td className="d-flex justify-content-center align-items-center">
                      {/* <DeleteMedicalHistories id={medical.id} setRefresh={setRefresh} refresh={refresh} /> <EditMedicalHistories cowId={cowId} id={medical.id} setRefresh={setRefresh} refresh={refresh} /> */}
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

export default Milk;
