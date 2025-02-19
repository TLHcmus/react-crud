import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { postCreateUser } from "../services/UserService";
import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";

const AddNewUserModal = function (props) {
  const { setUsers } = useContext(UserContext);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const { show, handleClose } = props;

  const handleAddUser = async () => {
    // create user
    const user = {
      name,
      job,
    };
    const res = await postCreateUser(user);
    if (res && res.id) {
      // Add created user to user List
      setUsers((prev) => [{ first_name: user.name, id: res.id }, ...prev]);
      handleClose();
      setName("");
      setJob("");
      toast.success("User added successfully!");
    } else {
      toast.error("An error occured...");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Job</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter user job"
              value={job}
              onChange={(e) => {
                setJob(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewUserModal;
