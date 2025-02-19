import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import _ from "lodash";

import { fetchAllUser } from "../services/UserService";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import EditUserModal from "./EditUserModal";
import RemoveUserModal from "./RemoveUserModal";
import "./TableUsers.scss";

const TableUsers = function () {
  const { users, setUsers } = useContext(UserContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowEditUserModal, setIsShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [isShowRemoveUserModal, setIsShowRemoveUserModal] = useState(false);

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortFiled] = useState("id");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const getUsers = async (page) => {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      setUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handleClose = () => {
    setIsShowEditUserModal(false);
    setIsShowRemoveUserModal(false);
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsShowEditUserModal(true);
  };

  const handleRemoveUser = (user) => {
    setSelectedUser(user);
    setIsShowRemoveUserModal(true);
  };

  const handleSort = (field, order) => {
    setSortFiled(field);
    setSortOrder(order);

    setUsers((prev) => _.orderBy(prev, sortField, sortOrder));
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    if (!query) {
      getUsers(1);
    }
    setUsers((prev) => prev.filter((user) => user.email.includes(query)));
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <div className="col-4 my-2">
        <input
          className="form-control"
          placeholder="Search for an user by email..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <div className="sort-header d-flex justify-content-between">
                <span>ID</span>
                <div>
                  <i
                    className="fa-solid fa-arrow-down mx-1"
                    onClick={() => handleSort("id", "desc")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("id", "asc")}
                  ></i>
                </div>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header d-flex justify-content-between">
                <span>First Name</span>
                <div>
                  <i
                    className="fa-solid fa-arrow-down mx-1"
                    onClick={() => handleSort("first_name", "desc")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up"
                    onClick={() => handleSort("first_name", "asc")}
                  ></i>
                </div>
              </div>
            </th>
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
