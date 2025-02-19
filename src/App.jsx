import { Container } from "react-bootstrap";
import "./App.scss";
import AddNewUserModal from "./components/AddNewUserModal";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { useContext, useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { CSVLink } from "react-csv";
import UserContext from "./contexts/UserContext";
import Papa from "papaparse";

function App() {
  const [isShowAddUserModal, setIsShowAddUserModal] = useState(false);

  const { users, setUsers } = useContext(UserContext);
  const [exportData, setExportData] = useState([]);

  const handleClose = function () {
    setIsShowAddUserModal(false);
  };

  const handleAddUserClick = function () {
    setIsShowAddUserModal(true);
  };

  const getExportData = (event, done) => {
    let result = [];
    if (users && users.length > 0) {
      result.push(["ID", "Email", "First Name", "Last Name"]);
      users.map((user) => {
        let arr = [];
        arr[0] = user.id;
        arr[1] = user.email;
        arr[2] = user.first_name;
        arr[3] = user.last_name;

        result.push(arr);
      });
    }
    setExportData(result);
    done(true);
  };

  const hanldeImportCSV = (event) => {
    const file = event.target.files[0];
    console.log("Check file", file);
    if (!file) return;
    // Check for file type
    if (file.type !== "text/csv") {
      toast.error("Only accept CSV type!");
      return;
    }

    Papa.parse(file, {
      complete: function (results) {
        // Check for file format
        if (results.data[0].length !== 3) {
          toast.error("Wrong file format!");
          return;
        }
        if (
          results.data[0][0] !== "email" ||
          results.data[0][1] !== "first_name" ||
          results.data[0][2] !== "last_name"
        ) {
          toast.error("Wrong file format!");
          return;
        }
        let importData = [];
        results.data.map((row, index) => {
          if (index !== 0 && row.length === 3) {
            let item = {
              email: row[0],
              first_name: row[1],
              last_name: row[2],
            };
            importData.push(item);
          }
        });
        setUsers(importData);
        toast.success("Import CVS file succesfully");
      },
    });
  };

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <div className="my-3 d-flex justify-content-between">
            <h3>User List</h3>
            <div className="button-group">
              <label htmlFor="import_csv" className="btn btn-warning">
                <i className="fa-solid fa-file-arrow-up"></i> Import
              </label>
              <input
                type="file"
                id="import_csv"
                hidden
                onChange={hanldeImportCSV}
              />
              <CSVLink
                filename={"users.csv"}
                className="btn btn-primary"
                data={exportData}
                asyncOnClick={true}
                onClick={getExportData}
              >
                <i className="fa-solid fa-file-arrow-down"></i> Export
              </CSVLink>
              <button className="btn btn-success" onClick={handleAddUserClick}>
                <i className="fa-solid fa-circle-plus"></i> Add new user
              </button>
            </div>
          </div>
          <TableUsers />

          <AddNewUserModal
            show={isShowAddUserModal}
            handleClose={handleClose}
          />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
