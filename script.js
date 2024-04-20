// JavaScript

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
  
    // Dummy login credentials
    const validUsername = "user@example.com";
    const validPassword = "password";
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get the entered username and password
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Dummy login validation
      if (username === validUsername && password === validPassword) {
        // Store login state in localStorage
        // localStorage.setItem("isLoggedIn", true);
        // localStorage.setItem("username", username);
  
        // Redirect to dashboard page
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });
  
    // Check if the user is already logged in
    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    // if (isLoggedIn) {
    //   // Redirect to dashboard page if already logged in
    //   window.location.href = "dashboard.html";
    // // }
  });
  