import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import { BACKEND_URL } from "../../../config";
class EditStudent extends Component {
  constructor(props) {
      super(props);
      

    // setting up function
    this.onChangeSerialNumber = this.onChangeSerialNumber.bind(this);
    this.onChangeDateEntry = this.onChangeDateEntry.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
     
    this.onSubmit = this.onSubmit.bind(this);

    // setting up state
      this.state = {
                    showToast :false,
                    showForm :false,
                    serial_number: "",
                    entry_date: "",
                    breed: ""
    };
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

    axios.put(`http://localhost:9000/cows/${this.props.id}`, {
        serial_number,
        entry_date:new Date(entry_date) ,
        breed,
    }).then(res => {
        
        this.props.refresh
        ? this.props.setRefresh(false)
            : this.props.setRefresh(true);
            this.setState({showToast:true});
           
        if (res.status === 500) {
            console.log(res.data);
        } else if (res.status === 200) {
            console.log("updated successfuly" ,this.state)
            this.setState = {
                showForm :false,
                serial_number: "",
                entry_date: "",
                breed: ""
}; 
        } else {
            console.log("Server error with : "+res.data);
        }
    }).catch(err => console.warn(err));
    console.log(this.props.id);
  }
    
    render() {
        
    return (
        <div className="form-wrapper">
             {/* *****************toast***************** */}
      {
        <Col
          xs={6}
          style={{
            position: "absolute",
            left: "10px",
            top: "10px",
          }}
        >
          <Toast
            onClose={() =>this.setState({showToast:false}) }
            show={this.state.showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Update Successful</strong>
              <small>5 sec ago</small>
            </Toast.Header>
            <Toast.Body>Cows has been successfully updated</Toast.Body>
          </Toast>
        </Col>
      }
      {/* ********************************** */}
        <Modal show={this.state.showForm} onHide={this.handleCloseForm}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="SerialNumber">
                <Form.Label>numero de serie :</Form.Label>
                            <Form.Control
                 placeholder={`${this.props.serialNumber}`}
                  type="text"
                  value={this.state.serial_number}
                  onChange={this.onChangeSerialNumber}
                  />
              </Form.Group>

              <Form.Group controlId="dateEntry">
                <Form.Label>date d'entrer :</Form.Label>
                            <Form.Control
                        placeholder={`${this.props.entryDate}`}        
                  type="date"
                  value={this.state.entry_date}
                  onChange={this.onChangeDateEntry}
                  />
              </Form.Group>

              <Form.Group controlId="breed">
                <Form.Label>race :</Form.Label>
                            <Form.Select
                placeholder={`${this.props.breed}`}
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
                variant="warning"
                size="s"
                block="block"
                type="submit"
                onClick={() => {
                    this.handleCloseForm();
                }}
                >  
                Modifier
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <Button
          className="mt-2 "
          variant="warning"
                onClick={() => this.handleShowForm()}
                size="sm"
        >
          Modifier
        </Button>
      </div>
    );
  }
}

export default EditStudent;
