import React, { Component, useEffect, useState, useCallback } from "react";
import logo from "./logo.PNG";
import { Image, Input, Button, Radio, Table, Form } from "semantic-ui-react";
import axios from "axios";
import "./App.css";

function App() {
  // Caution: Config section - starts

 const baseUrl = "https://wjndbu9y8h.execute-api.ap-southeast-2.amazonaws.com/dev/personsinfo";
    
  const authToken = "8Iw1FSYPpw9EUKxuj7zrdLKKUfpHQp1xC9vvaj70";

  const getUsersListEndpoint = `${baseUrl}`; // For displaying in the table view

  const addUserEndpoint = `${baseUrl}`; // for adding new user

  const deleteUserEndpoint = `${baseUrl}`; // for delete an user

  const commonHeader = {
   headers: {
    // "x-api-key": "8Iw1FSYPpw9EUKxuj7zrdLKKUfpHQp1xC9vvaj70",
     // 'Authorization': `Basic ${authToken}`,
    },
 };

   axios.defaults.headers.common = {
   "X-Api-Key": "8Iw1FSYPpw9EUKxuj7zrdLKKUfpHQp1xC9vvaj70",
   };

 // console.log(axios.defaults.headers.common);

  // Config section - ends

  const [users, setusers] = useState([]); //This state will be populated with the Axios HTTP response

  const loadusers = useCallback(() => {
    axios
      .get(getUsersListEndpoint, {
        // params: { Key: authToken, tablename: "persondb" },
        commonHeader,
      })
      .then((response) => {
        console.log("response", response.data);
        setusers(response.data.Items);
      });
  }, []);

  //The users are loaded initially
  useEffect(() => {
    loadusers();
  }, [loadusers]);

  const onCreateNewuser = useCallback(() => {
    const firstName_element = document.getElementById("firstName");
    const lastName_element = document.getElementById("lastName");
    const dob_element = document.getElementById("dob");

    if (
      !firstName_element.value ||
      !lastName_element.value ||
      !dob_element.value
    ) {
      alert("All fields are Mandatory!");
      return false;
    }

    const dataToPass = {
      id: Math.ceil(Math.random() * 20).toString(),
      firstname: firstName_element.value,
      lastname: lastName_element.value,
      dob: dob_element.value,
    };

    axios
      //.post(addUserEndpoint, JSON.stringify(dataToPass), {
        .post(addUserEndpoint, dataToPass, {
         // params: { Key: authToken },
          commonHeader,
      })
      .then((result) => {
        //Reload the user to show also the new one
        loadusers();
        console.log(dataToPass);
      })
      .catch((error) => {
        console.error("create new user error", error);
      });
  }, [loadusers]);
  
  return (
    <div className="App">
      <Image src={logo} size="small" style={{ display: "block" }} />
      <Form
        style={{ marginBottom: "3rem", maxWidth: "70%", marginLeft: "20%" }}
      >
        <Form.Group widths="equal">
          <Form.Input size="large" placeholder="First Name" id="firstName" />
          <Form.Input size="large" placeholder="Last Name" id="lastName" />
          <Form.Input size="large" placeholder="DOB" id="dob" />
        </Form.Group>
      </Form>
      <Button
        size="huge"
        style={{
          display: "block",
          marginLeft: "50%",
          marginBottom: "3rem",
          backgroundColor: "#D5E8D4",
        }}
        onClick={onCreateNewuser}
      >
        Add
      </Button>
      {/* Table component - starts */}

      <Table
        compact
        celled
        definition
        style={{
          maxWidth: "50%",
          marginLeft: "30%",
          backgroundColor: "#E2D5E7",
        }}
      >
        <Table.Body>
          {users &&
            users.map((user, key) => {
              const userId = parseInt(user.id);
              const firstName = user.body.firstname;
              const lastName = user.body.lastname;
              const dob = user.body.dob;

              return (
                <Table.Row key={key}>
                  <Table.Cell collapsing>
                    <Radio toggle id={userId} />
                  </Table.Cell>
                  <Table.Cell>{firstName}</Table.Cell>
                  <Table.Cell>{lastName}</Table.Cell>
                  <Table.Cell>{dob}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>

      <Button
        size="huge"
        style={{
          display: "block",
          marginLeft: "50%",
          marginTop: "3rem",
          backgroundColor: "#D5E8D4",
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
