import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { BACKEND_URL } from "../../config";

function Births() {
 
  const [loading, setLoading] = useState(false);
  const [births, setBirths] = useState([
    {
      id: "",
      cow: "",
      birth_date: "",
    },
  ]);

  useEffect(() => {
    setLoading(true);
    const url = `${BACKEND_URL}/births`;
    axios.get(url).then((res) => {
      setBirths(res.data);
      setLoading(false);
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
          Accouchement
        </Card.Header>
        <Card.Body>
          {births.length > 0 ? (
            <Table striped>
              <thead>
                <tr>
                  <th>Date D'accouchement</th>
                  <th className="text-center">Vaches</th>
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
                  {births.map((birth, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ paddingLeft: "20px" }}>
                          {new Date(birth.birth_date).toLocaleDateString()}
                        </td>
                        <td className="text-center">
                          {birth.cow.serial_number}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </Table>
          ) : (
            <div style={{ textAlign: "center" }}>
              Aucune naissance disponible
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Births;
