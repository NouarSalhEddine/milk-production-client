import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function DeleteMedicalHistories({ id, refresh, setRefresh }) {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:9000//medical_histories/${id}`)
      .then((res) => {
        refresh ? setRefresh(false) : setRefresh(true);
        console.log("Cows Account successfully deleted with : " + res.data);
      })
      .catch((err) => console.warn(err));
  };
  return (
    <div>
      <Button onClick={handleDelete} size="sm" variant="danger">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}

export default DeleteMedicalHistories;