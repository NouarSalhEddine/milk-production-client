import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function DeleteMilk({refresh,setRefresh,id}) {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:9000/milks/${id}`)
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
export default DeleteMilk