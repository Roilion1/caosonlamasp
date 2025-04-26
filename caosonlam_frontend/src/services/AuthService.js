import axios from 'axios';

const API_URL = 'https://localhost:7033/api/User'; 

class AuthService {
  register(user) {
    return axios.post(`${API_URL}/register`, user)
      .then(response => response.data)
      .catch(error => {
        console.error("Error during registration", error);
        throw error;
      });
  }

  login(credentials) {
    return axios.post(`${API_URL}/login`, credentials)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(error => {
        console.error("Error during login", error);
        throw error;
      });
  }

  static isLoggedIn() {
    return localStorage.getItem('user') !== null;
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    const user = this.getCurrentUser();
    return user?.token || null;
  }
}

export default new AuthService();
