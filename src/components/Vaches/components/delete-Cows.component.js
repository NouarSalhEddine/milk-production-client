import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

class DeleteCows extends Component {
    
  deleteCows = () => {
    axios
      .delete(`http://localhost:9000/cows/${this.props.id}`)
      .then((res) => {
        this.props.refresh
          ? this.props.setRefresh(false)
          : this.props.setRefresh(true);
        console.log("Cows Account successfully deleted with : " + res.data);
      })
      .catch((err) => console.warn(err));
  };
  render() {
    return (
      <div>
        <Button onClick={this.deleteCows} size="sm" variant="danger">
          Supprimer
        </Button>
      </div>
    );
  }
}

export default DeleteCows;
