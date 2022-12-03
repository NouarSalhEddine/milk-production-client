import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CreateMilk from "./CreateMilk";
import EditMilk from "./EditMilk";
import DeleteMilk from "./DeleteMilk";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { BACKEND_URL } from "../../config";

function Milk() {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [milk, setMilk] = useState([
    {
      id: "",
      production_date: "",
      quantity: "",
    },
  ]);
 
  useEffect(() => {
    
    setLoading(true);
    const url = `${BACKEND_URL}/milks`;
    axios.get(url).then((res) => {
      res.data.sort(({production_date: a}, {production_date: b}) => new Date(b) - new Date(a))
      setMilk(res.data);
      setLoading(false);
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
          <CreateMilk
            loading={loading}
            setLoading={setLoading}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </Card.Header>
        <Card.Body>
          {milk.length > 0 ? (
            <Table striped>
              <thead>
                <tr>
                  <th>Date de Production</th>
                  <th>
                    Quentité <span className=" font-weight-light ">L/Jour</span>
                  </th>
                  <th className="text-center">Actions</th>
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
                  {milk.map((milk, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {new Date(milk.production_date).toLocaleDateString()}
                        </td>
                        <td className=" fw-bold">{milk.quantity} </td>
                        <td className="d-flex justify-content-center align-items-center">
                          <DeleteMilk
                            id={milk.id}
                            loading={loading}
                            setLoading={setLoading}
                            setRefresh={setRefresh}
                            refresh={refresh}
                          />
                          <EditMilk
                            productionDate={milk.production_date}
                            quantity={milk.quantity}
                            id={milk.id}
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
              )}
            </Table>
          ) : (
            <div style={{ textAlign: "center" }}>
              Aucune production disponible
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Milk;
