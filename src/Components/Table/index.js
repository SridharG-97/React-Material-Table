import React, { useState, useEffect } from "react";
import "./index.css";
import MaterialTable from "material-table";


import axios from "axios";
function Index() {
  const [timeout, setTimeout ]= useState();

  const [data, setData] = useState([
    { name: "", surname: "", email: "", phone: "", website: "" },
  ]);
  // GET Method

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setData(res.data);

      console.log(res.data);
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

  const editHnadler = (rowData, resolve,oldRow,newRow)=>{
 
    const updatedData = [...data];
                updatedData[oldRow.data] = newRow;
                setData(updatedData,data);

                console.log(updatedData,data);
                setTimeout(()=>resolve(),500)
                alert("sucessfully edited")
                console.log(rowData);

  }
 
  const deleteHandler = (
    updatedData,
    resolve,
    reject,
    newRow
  ) => {
    axios.delete(
      "https://jsonplaceholder.typicode.com/posts/1")
        .then((res) => {
          // console.log(res);
          setData([...data,newRow, updatedData]);
          alert("Sucessfully deleted");
          resolve();
          console.log(updatedData);
        })
        .catch((err) => {
          console.log(err);
          reject();
        })
    
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
            onRowUpdate: (newRow, oldRow) => {
              new Promise((resolve, reject) => {
                editHnadler(newRow,oldRow, resolve, reject);

                
              });
            },
            onRowDelete: (newRow) => {
              new Promise((resolve, reject) => {
                const updatedData = [...data];
                updatedData.slice(newRow.data, 1);

                console.log(updatedData);

                deleteHandler(newRow, resolve, reject);
              });
            },
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
