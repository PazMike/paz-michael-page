// Fetch API- Random Dog Image
function getDogImage() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Dog API");
      }
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById("dog-container");
      container.innerHTML = `<p>Here is a random dog:</p><img src="${data.message}" alt="Random Dog">`;
    })
    .catch((error) => {
      document.getElementById(
        "dog-error"
      ).textContent = `Error: ${error.message}`;
    });
}

// XMLHttpRequest - User Data
function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const users = JSON.parse(xhr.responseText);
      let content = "<p>User List:</p>";
      users.forEach((user) => {
        content += `<div><strong>${user.name}</strong> — ${user.email}, ${user.address.city}</div>`;
      });
      document.getElementById("user-container").innerHTML = content;
    } else {
      document.getElementById("user-error").textContent =
        "Error: Unable to load users.";
    }
  };

  xhr.onerror = function () {
    document.getElementById("user-error").textContent =
      "Network Error: Could not fetch users.";
  };

  xhr.send();
}

// Call APIs on page load
window.onload = function () {
  getDogImage();
  getUsers();
};
