import React from "react";
import logo from './logo.PNG'
import { Image, Input, Button, Radio, Table } from "semantic-ui-react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Image src={logo} size="small" style={{ display: "block" }} />
      <Input placeholder="First Name" style={{ marginRight: "1rem" }} />
      <Input placeholder="Last Name" style={{ marginRight: "1rem" }} />
      <Input
        placeholder="DOB"
        style={{ marginRight: "1rem", marginBottom: "3rem" }}
      />
      <Button size='Big'
        style={{ display: "block", marginLeft: "50%", marginBottom: "3rem", backgroundColor: '#D5E8D4' }}
      >
        Add
      </Button>
      {/* Table component - starts */}

      <Table compact celled definition style={{maxWidth: '50%', marginLeft: '30%', backgroundColor: '#E2D5E7'}}>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <Radio toggle />
            </Table.Cell>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
          </Table.Row>
          <Table.Row>
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
          </Table.Row>
        </Table.Body>
      </Table>

      <Button size='Big'
        style={{ display: "block", marginLeft: "50%", marginTop: "3rem", backgroundColor: '#D5E8D4' }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
