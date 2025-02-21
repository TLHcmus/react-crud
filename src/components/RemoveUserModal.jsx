import { Modal, Button } from "react-bootstrap";
import { deleteRemoveUser } from "../services/UserService";
import UsersContext from "../contexts/UsersContext";
import { useContext } from "react";
import { toast } from "react-toastify";
const RemoveUserModal = function (props) {
  const { setUsers } = useContext(UsersContext);
  const { show, handleClose, userToRemove } = props;

  const handleRemoveUser = async () => {
    const res = await deleteRemoveUser(userToRemove.id);
    if (res && +res.status === 204) {
      setUsers((prev) => prev.filter((user) => user.id !== userToRemove.id));
      handleClose();
      toast.success("Removed user successfully!");
    } else {
      toast.error("An error occured while removing user...");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            This action can't be undone! Do you want to delete this user?
          </div>
          <p className="fw-bold">email = {userToRemove.email} ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemoveUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveUserModal;
