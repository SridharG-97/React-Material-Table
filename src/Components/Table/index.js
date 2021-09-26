import React, { useState, useEffect } from "react";
import "./index.css";
import MaterialTable from "material-table";

import axios from "axios";
function Index() {
  const [timeout, setTimeout] = useState();

  const [data, setData] = useState([]);
  // GET Method

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setData(res.data);

      console.log("sruesh");
    });
  }, []);

  const [columns, setColumns] = useState([
    { title: "S.No", field: "id", sorting: false },
    { title: "Name", field: "name" },
    { title: "Username", field: "username", sorting: false },
    { title: "Email", field: "email", sorting: false },
    { title: "Website", field: "website" },
    { title: "Phone", field: "phone", type: "numeric", sorting: false },
  ]);

  //  POST METHOD
  const postHandler = (rowData, resolve, reject) => {
    console.log(rowData.name);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", setData(data), {
        body: JSON.stringify({
          id: rowData.id,
          name: rowData.name,
          surename: "",
          email: "",
          website: "",
          phone: "",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        // console.log(res);
        setData([...data, rowData]);
        alert("Sucessfully added");
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  };

  const editHandler = (newRow, resolve, reject) => {
    console.log(newRow.id);

    let array = data;
    let i;
    for (i = 0; i < data.length; i++) {
      if (data[i].id === newRow.id) {
        console.log("matched");
        array[i] = newRow;
      }
    }
    setData(array);
    console.log("sridhar");
    resolve();

    // const updatedData = [...data];
    // updatedData[oldRow.data] = newRow;
    // setData(updatedData, data);
  };

  const deleteHandler = (newRow, resolve, reject) => {
    let i;


    for (i = 0; i < data.length; i++) {
      if (data[i].id === newRow.id) {
        console.log("delete matched");
        setData(data.slice(i));
        resolve();
        return
      }
    }
  };

  return (
    <div className="table">
      <div className="MT-table">
        <MaterialTable
          style={{ width: "90%", alignItems: "center" }}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                console.log(newRow);
                postHandler(newRow, resolve, reject);
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                editHandler(newData, resolve, reject);
              }),

            onRowDelete: (newRow) =>
              new Promise((resolve, reject) => {
                deleteHandler(newRow, resolve, reject);
                // console.log("s");
              }),
          }}
          columns={columns}
          data={data}
          options={{
            actionsColumnIndex: -1,
            row: false,
            showTitle: false,
            pageSizeOptions: false,
            paginationType: "stepped",
            showFirstLastPageButtons: false,
            paginationPosition: "bottom",
            column: {
              alignItems: "center",
              textAlign: "center",
              actionsColumnIndex: -1,
            },

            headerStyle: {
              backgroundColor: "#294a5d",
              textAlign: "center",
              color: "white",
              fontSize: "18px",
              fontFamily: "sans-serif",
            },
            rowStyle: {
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontSize: "18px",
              fontFamily: "sans-serif",
            },
          }}
        />
      </div>
    </div>
  );
}

export default Index;
