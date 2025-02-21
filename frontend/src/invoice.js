import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';

class Invoice extends Component {

  signOut = async () => {
    try {
      await axios.get("http://localhost:5002/auth/logout", { withCredentials: true })
      window.location.href = "http://localhost:3000";
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  render() {
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <button onClick={this.signOut} style={buttonStyle}>Sign Out</button>
        <Container>
          <InvoiceForm />
        </Container>
      </div>
    );
  }
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#4285F4",
  color: "white",
  border: "none",
  borderRadius: "5px",
  marginBottom: "20px"
};

export default Invoice;
