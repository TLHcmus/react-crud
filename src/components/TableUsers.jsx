import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

import { fetchAllUser } from "../services/UserService";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import EditUserModal from "./EditUserModal";
import RemoveUserModal from "./RemoveUserModal";

const TableUsers = function () {
  const { users, setUsers } = useContext(UserContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowEditUserModal, setIsShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [isShowRemoveUserModal, setIsShowRemoveUserModal] = useState(false);

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const getUsers = async function (page) {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      setUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handleClose = function () {
    setIsShowEditUserModal(false);
    setIsShowRemoveUserModal(false);
  };

  const handlePageClick = function (event) {
    setCurrentPage(+event.selected + 1);
  };

  const handleEditUser = function (user) {
    setSelectedUser(user);
    setIsShowEditUserModal(true);
  };

  const handleRemoveUser = function (user) {
    setSelectedUser(user);
    setIsShowRemoveUserModal(true);
  };
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user, index) => (
              <tr key={`user-${index}`}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={() => handleRemoveUser(user)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      <EditUserModal
        show={isShowEditUserModal}
        handleClose={handleClose}
        userToEdit={selectedUser}
      />
      <RemoveUserModal
        show={isShowRemoveUserModal}
        handleClose={handleClose}
        userToRemove={selectedUser}
      />
    </>
  );
};
export default TableUsers;
