import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import _ from "lodash";

import { fetchAllUser } from "../services/UserService";
import { useState, useEffect, useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import EditUserModal from "./EditUserModal";
import RemoveUserModal from "./RemoveUserModal";
import "./TableUsers.scss";

const TableUsers = function () {
  const { users, setUsers } = useContext(UsersContext);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowEditUserModal, setIsShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const [isShowRemoveUserModal, setIsShowRemoveUserModal] = useState(false);

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortFiled] = useState("id");

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const getUsers = async (page) => {
    const res = await fetchAllUser(page);
    if (res && res.data) {
      setUsers(res.data);
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

  const handleSearch = _.debounce((event) => {
    const query = event.target.value.trim();
    if (!query) {
      getUsers(1);
    }
    setUsers((prev) => prev.filter((user) => user.email.includes(query)));
  }, 300);
  return (
    <>
      <div className="col-12 col-sm-4 my-2">
        <input
          className="form-control"
          placeholder="Search for an user by email..."
          onChange={handleSearch}
        />
      </div>
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <div className="sort-header d-flex justify-content-between">
                  <span>ID</span>
                  <div className="d-flex align-items-center">
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
                  <div className="d-flex align-items-center">
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
                  <td className="d-flex">
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleRemoveUser(user)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-primary mx-1 "
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center mt-3">
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
      </div>
    </>
  );
};
export default TableUsers;
