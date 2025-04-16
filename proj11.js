// Fetch API - Get a random dog image from the Dog CEO API
function getDogImage() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to fetch Dog API");
      }
      return response.json(); // Parse response as JSON
    })
    .then((data) => {
      // Display the dog image in the container
      const container = document.getElementById("dog-container");
      container.innerHTML = `<p>Here is a random dog:</p><img src="${data.message}" alt="Random Dog">`;
    })
    .catch((error) => {
      // Display error message if fetch fails
      document.getElementById("dog-error").textContent = `Error: ${error.message}`;
    });
}

// XMLHttpRequest - Get a list of users from JSONPlaceholder API
function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      // Parse response JSON and display user data
      const users = JSON.parse(xhr.responseText);
      let content = "<p>User List:</p>";
      users.forEach((user) => {
        content += `<div><strong>${user.name}</strong> — ${user.email}, ${user.address.city}</div>`;
      });
      document.getElementById("user-container").innerHTML = content;
    } else {
      // Handle non-200 response
      document.getElementById("user-error").textContent =
        "Error: Unable to load users.";
    }
  };

  // Handle network error
  xhr.onerror = function () {
    document.getElementById("user-error").textContent =
      "Network Error: Could not fetch users.";
  };

  xhr.send(); // Send the request
}

// Call both API functions when the page finishes loading
window.onload = function () {
  getDogImage();
  getUsers();
};
