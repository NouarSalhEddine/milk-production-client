import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BACKEND_URL } from "../../../../config";

function DeleteBirths({ loading ,setLoading,id, refresh, setRefresh }) {
  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`${BACKEND_URL}/births/${id}`)
      .then((res) => {
        refresh ? setRefresh(false) : setRefresh(true);
        console.log("birth Account successfully deleted with : " + res.data);
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

export default DeleteBirths