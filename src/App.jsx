import { Container } from "react-bootstrap";
import "./App.scss";
import AddNewUserModal from "./components/AddNewUserModal";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { useState } from "react";
import { UserProvider } from "./contexts/UserContext";
import { ToastContainer, Bounce } from "react-toastify";

function App() {
  const [isShowAddUserModal, setIsShowAddUserModal] = useState(false);

  const handleClose = function () {
    setIsShowAddUserModal(false);
  };

  const handleAddUserClick = function () {
    setIsShowAddUserModal(true);
  };

  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <div className="my-3 d-flex justify-content-between">
            <h3>User List</h3>
            <button className="btn btn-success" onClick={handleAddUserClick}>
              Add new user
            </button>
          </div>
          <UserProvider>
            <TableUsers />

            <AddNewUserModal
              show={isShowAddUserModal}
              handleClose={handleClose}
            />
          </UserProvider>
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
