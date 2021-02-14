import React from "react";
import { Image, Input, Button, Radio, Table } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Image src="./logo.svg" size="small" style={{ display: "block" }} />
      <Input placeholder="First Name" style={{ marginRight: "1rem" }} />
      <Input placeholder="Last Name" style={{ marginRight: "1rem" }} />
      <Input
        placeholder="DOB"
        style={{ marginRight: "1rem", marginBottom: "3rem" }}
      />
      <Button
        primary
        style={{ display: "block", marginLeft: "50%", marginBottom: "3rem" }}
      >
        Add
      </Button>
      {/* Table component - starts */}

      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>E-mail address</Table.HeaderCell>
            <Table.HeaderCell>Premium Plan</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <Radio toggle />
            </Table.Cell>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Radio toggle />
            </Table.Cell>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Radio toggle />
            </Table.Cell>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>May 11, 2014</Table.Cell>
            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Button
        style={{ display: "block", marginLeft: "50%", marginTop: "3rem" }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
