import axios from "axios";
const API_URL = "http://localhost:8080/api/user";
// const API_URL = process.env.REACT_APP_URL + "/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }

  getToken() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return token;
  }

  updateUserById(_id, username, email, password) {
    return axios.patch(
      API_URL + "/update/changeInfo/" + _id,
      { username, email, password },
      { headers: { Authorization: this.getToken() } }
    );
  }

  changePassword(_id, oldPassword, newPassword) {
    return axios.patch(
      API_URL + "/update/changePassword/" + _id,
      { oldPassword, newPassword },
      { headers: { Authorization: this.getToken() } }
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
