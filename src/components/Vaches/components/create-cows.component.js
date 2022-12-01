import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import Modal from "react-bootstrap/Modal";
class CreateCows extends Component {
  constructor(props) {
    super(props);
    // setting up state
    this.state = {
      showForm:false,
      serial_number: "",
      entry_date: "",
      breed: "",
    };
    // setting up function
    
    this.onChangeSerialNumber = this.onChangeSerialNumber.bind(this);
    this.onChangeDateEntry = this.onChangeDateEntry.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }
  handleCloseForm = () => {
    this.setState({showForm :false})
}
  handleShowForm = () => {
    this.setState({showForm :true})
}
  onChangeSerialNumber(e) {
    this.setState({ serial_number: e.target.value });
  }

  onChangeDateEntry(e) {
    this.setState({ entry_date: e.target.value });
    
  }

  onChangeBreed(e) {
    this.setState({ breed: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { serial_number, entry_date, breed } = this.state;
    const url = `${BACKEND_URL}/cows`;
    axios
      .post(url, {
        serial_number,
        entry_date: new Date(entry_date),
        breed,
      })
      .then((response) => {
        this.props.refresh
          ? this.props.setRefresh(false)
          : this.props.setRefresh(true);
        console.log("refresh");

        this.setState({
          serial_number: "",
          entry_date: "",
          breed: "",
        });
        this.props.setShowToast(true);

        if (response.status === 500) {
        } else if (response.status === 200 && response.data.status === 200) {
        } else if (response.status === 200 && response.data.status !== 200) {
          console.log(
            "Error inserted new data because : " + response.data.message
          );
        } else {
          console.log("Server error with : " + response.data);
        }
      })
      .catch((err) => console.warn(err));
    console.log(this.state);
  }

  render() {
    
    return (
      <div className="form-wrapper">
      <Modal show={this.state.showForm} onHide={this.handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Une Vache</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="SerialNumber">
              <Form.Label>numero de serie :</Form.Label>
              <Form.Control
                type="text"
                value={this.state.serial_number}
                onChange={this.onChangeSerialNumber}
                />
            </Form.Group>

            <Form.Group controlId="dateEntry">
              <Form.Label>date d'entrer :</Form.Label>
              <Form.Control
                type="date"
                value={this.state.entry_date}
                onChange={this.onChangeDateEntry}
                />
            </Form.Group>

            <Form.Group controlId="breed">
              <Form.Label>race :</Form.Label>
              <Form.Select
                type="text"
                value={this.state.breed}
                onChange={this.onChangeBreed}
                >
                <option value=""></option>
                <option value="holstein">holstein</option>
                <option value="montbéliarde">montbéliarde</option>
              </Form.Select>
            </Form.Group>

                      <Button
               className="m-3 "
               variant="success"
               size="s"
               block="block"
              type="submit"
              onClick={() => {
                  this.handleCloseForm();
              }}
              >  
              Ajouter 
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
        <Button
          size="sm"
        className="mb-2 "
        variant="primary"
        onClick={() => this.handleShowForm()}
      >
        Ajouter
      </Button>
    </div>
    );
  }
}

export default CreateCows;
