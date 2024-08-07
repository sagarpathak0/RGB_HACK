// utils/auth.js

export const login = () => {
    // Set authentication state, e.g., setting a cookie or localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };
  
  export const logout = () => {
    // Clear authentication state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem("token")
  };
  
  export const isAuthenticated = () => {
    // Check if the user is authenticated
    return localStorage.getItem('isLoggedIn') === 'true';
  };