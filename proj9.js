// Function to read the URL query string and apply customization
function getQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const bgColor = urlParams.get("bgColor");
  const textColor = urlParams.get("textColor");
  const fontSize = urlParams.get("fontSize");

  if (bgColor) {
    document.body.style.backgroundColor = bgColor;
    console.log("Applying query parameter for background color: ", bgColor);
  }
  if (textColor) {
    document.body.style.color = textColor;
    console.log("Applying query parameter for text color: ", textColor);
  }
  if (fontSize) {
    document.body.style.fontSize = fontSize + "px";
    console.log("Applying query parameter for font size: ", fontSize);
  }
}

// Function to save the customization settings in cookies
function setCookies(bgColor, textColor, fontSize) {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days expiry

  document.cookie = `bgColor=${bgColor};expires=${expiryDate.toUTCString()};path=/`;
  document.cookie = `textColor=${textColor};expires=${expiryDate.toUTCString()};path=/`;
  document.cookie = `fontSize=${fontSize};expires=${expiryDate.toUTCString()};path=/`;

  console.log("Cookies set for customization:", {
    bgColor,
    textColor,
    fontSize,
  });
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEq = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length); // Remove any leading spaces
    if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length); // Return cookie value
  }
  return null;
}

// Function to apply the customization from cookies
function applyCookieCustomization() {
  const bgColor = getCookie("bgColor");
  const textColor = getCookie("textColor");
  const fontSize = getCookie("fontSize");

  if (bgColor) {
    document.body.style.backgroundColor = bgColor;
    console.log("Applying cookie for background color: ", bgColor);
  }
  if (textColor) {
    document.body.style.color = textColor;
    console.log("Applying cookie for text color: ", textColor);
  }
  if (fontSize) {
    document.body.style.fontSize = fontSize + "px";
    console.log("Applying cookie for font size: ", fontSize);
  }
}

// Event listener for form submission to update query strings and cookies
document
  .getElementById("customizationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const bgColor = document.getElementById("bgColor").value;
    const textColor = document.getElementById("textColor").value;
    const fontSize = document.getElementById("fontSize").value;

    // Update query string in URL
    const queryString = `?bgColor=${bgColor}&textColor=${textColor}&fontSize=${fontSize}`;
    window.history.pushState({}, "", queryString);

    // Save preferences to cookies
    setCookies(bgColor, textColor, fontSize);

    // Apply customization to the page immediately
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    document.body.style.fontSize = fontSize + "px";

    console.log("Customization applied immediately on form submit.");
  });

// Apply saved settings from cookies or query parameters on page load
window.onload = function () {
  console.log("Page loaded - applying cookies and query parameters.");

  // Apply customization from cookies first (for consistency across reloads)
  applyCookieCustomization();

  // Then apply customization from query parameters if they exist (in case settings change via form submission)
  getQueryParams();
};
