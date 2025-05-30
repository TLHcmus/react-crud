import axios from './custom-axios';

const fetchAllUser = function (page) {
  return axios.get(`users?page=${page}`);
};

const postCreateUser = function (user) {
  return axios.post('users', user);
};

const putUpdateUser = function (user, userId) {
  return axios.put(`user/${userId}`, user);
};

const deleteRemoveUser = function (userId) {
  return axios.delete(`user/${userId}`);
};

const postLogin = function (email, password) {
  return axios.post('login', { email, password });
};

export {
  fetchAllUser,
  postCreateUser,
  putUpdateUser,
  deleteRemoveUser,
  postLogin,
};
