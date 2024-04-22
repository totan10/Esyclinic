document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get the entered username and password
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Perform API call for login validation using Axios
      axios.post('http://easyhealths.com/api/cliniclogin', {
          "MOBILE": username,
          "PASSWORD": password
      })
      .then(response => {
          const data = response.data;
          // Check the response from the API
          if (data.Success) {
              // Store login state in localStorage
              alert(data.Message)
              localStorage.setItem("isLoggedIn", true);
              localStorage.setItem("username", username);
              localStorage.setItem("userData", JSON.stringify(data));
              // Redirect to dashboard page or perform any necessary actions
              window.location.href = "dashboard.html";
          } else {
              // Display error message
              console.log(data);
              alert(data.Message); // Assuming the API returns a message field
          }
      })
      .catch(error => {
          console.error('There was a problem with the API call:', error);
          // Display error message
          alert('An error occurred during login. Please try again later.');
      });
  });

  // Check if the user is already logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
      // Redirect to dashboard page if already logged in
     window.location.href = "dashboard.html";
  }
});
