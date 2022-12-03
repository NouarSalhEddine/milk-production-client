import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "../../../config";

function DeleteCowsComponent({ loading,setLoading,refresh, setRefresh, id }) {
 
  const deleteCows = () => {
    setLoading(true)
    const url = `${BACKEND_URL}/cows/${id}`;
    axios
      .delete(url)
      .then((res) => {
        refresh ? setRefresh(false) : setRefresh(true);
        console.log("Cows Account successfully deleted with : " + res.data);
      })
      .catch((err) => console.warn(err));
  };
  return (
    <div>
      <Button onClick={deleteCows} size="sm" variant="danger">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
}

export default DeleteCowsComponent;
