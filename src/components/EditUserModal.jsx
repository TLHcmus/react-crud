import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";

import { putUpdateUser } from "../services/UserService";

const EditUserModal = function (props) {
  const { setUsers } = useContext(UserContext);

  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const { show, handleClose, userToEdit } = props;

  useEffect(() => {
    if (show) {
      setName(userToEdit.first_name);
    }
  }, [userToEdit]);

  const handleEditUser = async function () {
    const user = {
      name,
      job,
    };
    const res = await putUpdateUser(user, userToEdit.id);
    if (res && res.updatedAt) {
      // Update user List
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userToEdit.id
            ? { ...user, first_name: name, last_name: "" }
            : user
        )
      );

      handleClose();
      toast.success("User edited successfully");
    } else {
      toast.error("An error occured while editing user...");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUserModal;
