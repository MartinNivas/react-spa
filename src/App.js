import React, { useEffect, useState, useCallback } from "react";
import logo from "./logo.PNG";
import { Image, Button, Table, Form, Confirm } from "semantic-ui-react";
import axios from "axios";
import "./App.css";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import moment from "moment";

function App() {
  // Caution: Config section - starts

  const baseUrl =
    "https://wjndbu9y8h.execute-api.ap-southeast-2.amazonaws.com/dev/personsinfo";

  // const getUsersListEndpoint = `${baseUrl}`; // For displaying in the table view

  // const addUserEndpoint = `${baseUrl}`; // for adding new user

  // const deleteUserEndpoint = `${baseUrl}`; // for delete an user

  // const commonHeader = {
  //   headers: {
  //     // "x-api-key": "",
  //     // 'Authorization': `Basic ${authToken}`,
  //   },
  // };

  axios.defaults.headers.common = {
    // "X-Api-Key": "",
  };

  // console.log(axios.defaults.headers.common);

  const classnameOfCheckbox = "checkbox";

  const confirmBoxText =
    "Are you sure you want to delete the selected users(s)?";

  const deleteBtnStyle = {
    display: "block",
    marginLeft: "50%",
    marginTop: "3rem",
    backgroundColor: "#D5E8D4",
  };

  const checkBoxStyle = { cursor: "pointer" };

  const tableStyle = {
    maxWidth: "50%",
    marginLeft: "30%",
    backgroundColor: "#E2D5E7",
  };

  const formStyle = {
    marginBottom: "3rem",
    maxWidth: "70%",
    marginLeft: "20%",
  };

  const addBtnStyle = {
    display: "block",
    marginLeft: "50%",
    marginBottom: "3rem",
    backgroundColor: "#D5E8D4",
  };

  // Config section - ends

  const [users, setusers] = useState([]); //This state will be populated with the Axios HTTP response

  const [popup, setpopup] = useState(false);

  const [btnDisable, setButtonDisable] = useState(true);

  const loadusers = useCallback(() => {
    axios
      .get(
        baseUrl
        //   {
        //   // params: { Key: authToken, tablename: "persondb" },
        //   commonHeader,
        //  }
      )
      .then((result) => {
        // console.log({ result });
        if (result.data.body.length > 0) {
          setusers(result.data.body);
          setTimeout(() => {
            const allCheckboxes = document.getElementsByClassName(
              classnameOfCheckbox
            );
            for (let i = 0; i < allCheckboxes.length; i++) {
              allCheckboxes[i].checked = false;
            }
          }, 500);
        } else {
          setusers("");
        }
        setButtonDisable(true);
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

    // Validate mandatory - start
    if (
      !firstName_element.value ||
      !lastName_element.value ||
      !dob_element.value
    ) {
      alert("All fields are Mandatory!");
      return false;
    }
    // Validate mandatory - end

    // Validate dob - start
    if (
      !moment(dob_element.value).isValid() ||
      !moment(dob_element.value, "DD-MMM-YYYY", true).isValid()
    ) {
      alert(
        "Error! please provide the correct DOB format (DD-MMM-YYYY) like 01-Jan-1990"
      );
      return false;
    }
    // Validate dob - ends

   
    const dataToPass = {
      id: Math.ceil(Math.random() * 1000).toString(),
      firstname: firstName_element.value,
      lastname: lastName_element.value,
      dob: dob_element.value,
    };
    // console.log({ dataToPass });
    axios
      //.post(addUserEndpoint, JSON.stringify(dataToPass), {
      .post(
        baseUrl,
        dataToPass
        //   {
        //   // params: { Key: authToken },
        //   // commonHeader,
        // }
      )
      .then((result) => {
        // console.log({ result });
        if (result.status === 200) {
          firstName_element.value = "";
          lastName_element.value = "";
          dob_element.value = "";

          //Reload the user to show also the new one
          loadusers();
        }
      })
      .catch((error) => {
        console.error("create new user error", error);
      });
  }, [loadusers]);

  const handleCheckbox = () => {
    setTimeout(() => {
      const allCheckboxes = document.getElementsByClassName(
        classnameOfCheckbox
      );
      // console.log("handleCheckbox allCheckboxes", allCheckboxes);
      const countAllElements = allCheckboxes.length;
      let unCheckedBox = 0;
      for (let i = 0; i < countAllElements; i++) {
        if (allCheckboxes[i].checked === true) {
          setButtonDisable(false);
          break;
        } else {
          unCheckedBox++;
        }
      }

      if (countAllElements === unCheckedBox) {
        setButtonDisable(true);
      }
    }, 100);
  };

  const confirmPopup = () => setpopup(true);

  const handleCancel = () => setpopup(false);

  const handleConfirm = () => {
    if (popup) {
      onDeleteUser();
      setpopup(false);
      setTimeout(() => {
        // console.log("get users list after delete");
        loadusers();
      }, 500);
    }
  };

  const onDeleteUser = () => {
    const allCheckboxes = document.getElementsByClassName(classnameOfCheckbox);
    // console.log("allCheckboxes", allCheckboxes);
    try {
      if (allCheckboxes) {
        for (let i = 0; i < allCheckboxes.length; i++) {
          // console.log("each element", allCheckboxes[i]);
          if (allCheckboxes[i].checked) {
            // console.log(allCheckboxes[i], allCheckboxes[i].value);
            // console.log(
            //   `Delete endpoint url`,
            //   `${baseUrl}/${parseInt(allCheckboxes[i].value)}`
            // );
            axios
              .delete(`${baseUrl}/${parseInt(allCheckboxes[i].value)}`)
              .then((result) => {
                console.log("delete response", result);
                // if (result.status === 200) {}
              });
          }
        }
      } else {
        console.error("No checkbox element found!");
      }
    } catch (e) {
      console.error("error while trying to delete->", e);
    }
  };

  return (
    <div className="App">
      <Image src={logo} size="small" style={{ display: "block" }} />
      <Form style={formStyle}>
        <Form.Group widths="equal">
          <Form.Input size="large" placeholder="First Name" id="firstName" />
          <Form.Input size="large" placeholder="Last Name" id="lastName" />
          <Form.Input size="large" placeholder="DOB" id="dob" />
          {/* <SemanticDatepicker /> */}
        </Form.Group>
      </Form>
      <Button size="huge" style={addBtnStyle} onClick={onCreateNewuser}>
        Add
      </Button>
      {/* Table component - starts */}
      <Table basic style={tableStyle}>
        <Table.Body>
          {users &&
            users.map((user, key) => {
              const userId = parseInt(user.id);
              const firstName = user.firstname;
              const lastName = user.lastname;
              const dob = user.dob;

              return (
                <Table.Row key={key}>
                  <Table.Cell collapsing>
                    <input
                      type="checkbox"
                      id={userId}
                      className={classnameOfCheckbox}
                      style={checkBoxStyle}
                      value={userId}
                      onChange={handleCheckbox}
                    />
                  </Table.Cell>
                  <Table.Cell title={firstName}>{firstName}</Table.Cell>
                  <Table.Cell title={lastName}>{lastName}</Table.Cell>
                  <Table.Cell>{dob}</Table.Cell>
                </Table.Row>
              );
            })}
          {!users && <Table.Row>No Record found!</Table.Row>}
        </Table.Body>
      </Table>

      <Button
        size="huge"
        style={deleteBtnStyle}
        onClick={confirmPopup}
        disabled={btnDisable}
      >
        Delete
      </Button>
      <Confirm
        open={popup}
        content={confirmBoxText}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        size="small"
      />
    </div>
  );
}

export default App;
