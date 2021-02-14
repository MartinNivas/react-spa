import React, { Component, useEffect, useState, useCallback } from "react";
import logo from "./logo.PNG";
import { Image, Input, Button, Radio, Table, Form } from "semantic-ui-react";
import axios from "axios";
import "./App.css";

function App() {
  // Caution: Config section - starts

  const baseUrl =
    "https://g7qqvcisbf.execute-api.ap-southeast-1.amazonaws.com/dev";

  const authToken = "Q92egB4D1W9pAj0v0kYbE6Lrp01WWlzFal3y545Y";

  const getUsersListEndpoint = `${baseUrl}/`; // For displaying in the table view

  const addUserEndpoint = `${baseUrl}/`;

  const deleteUserEndpoint = `${baseUrl}/`;

  const commonHeader = {
    headers: {
      "x-api-key": authToken,
    },
  };

  // Config section - ends

  const [users, setusers] = useState([]); //This state will be populated with the Axios HTTP response

  const loadusers = useCallback(() => {
    axios.get(getUsersListEndpoint, commonHeader).then((response) => {
      setusers(response.data);
    });
  }, []);

  //The users are loaded initially
  useEffect(() => {
    loadusers();
  }, [loadusers]);

  const onCreateNewuser = useCallback(
    (newuserName) => {
      axios
        .post(
          addUserEndpoint,
          {
            name: newuserName,
          },
          commonHeader
        )
        .then((result) => {
          //Reload the user to show also the new one
          loadusers();
        })
        .catch((error) => {
          console.error("create new user error", error);
        });
    },
    [loadusers]
  );

  return (
    <div className="App">
      <Image src={logo} size="small" style={{ display: "block" }} />
      <Form
        style={{ marginBottom: "3rem", maxWidth: "70%", marginLeft: "20%" }}
      >
        <Form.Group widths="equal">
          <Form.Input size="large" placeholder="First Name" />
          <Form.Input size="large" placeholder="Last Name" />
          <Form.Input size="large" placeholder="DOB" />
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
          <Table.Row>
            <Table.Cell collapsing>
              <Radio toggle />
            </Table.Cell>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
          </Table.Row>
          {/* <Table.Row>
            <Table.Cell collapsing>
              <Radio toggle />
            </Table.Cell>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Radio toggle />
            </Table.Cell>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>May 11, 2014</Table.Cell>
            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
          </Table.Row> */}
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
