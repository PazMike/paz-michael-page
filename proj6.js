document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
//this is the update
    // Clear previous error messages
    const errorMessages = document.getElementById('error-messages');
    errorMessages.innerHTML = '';  // Clear the error messages section

    // Store validation errors
    let errors = [];

    // Get the form object to reference form elements
    const form = event.target;

    // Get the form inputs using form.elements
    const fullName = form.elements['full-name'].value.trim();
    const username = form.elements['username'].value.trim();
    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value.trim();
    const confirmPassword = form.elements['confirm-password'].value.trim();
    const phoneNumber = form.elements['phone-number'].value.trim();
    const dob = form.elements['dob'].value.trim();
    const terms = form.elements['terms'].checked;

    // Wrapping the validation in a try-catch block
    try {
        // 1. Validate Full Name
        if (!fullName.match(/^[a-zA-Z\s]+$/) || fullName.split(' ').length < 2) {
            console.error('Full Name validation failed');  // Debugging line
            errors.push("Full Name must contain only letters and spaces, and should include at least two characters (first and last name).");
        }

        // 2. Validate Username
        if (username.length < 6 || username.length > 15 || !/^[a-zA-Z][a-zA-Z0-9]*$/.test(username)) {
            errors.push("Username must be between 6 and 15 characters long and cannot start with a number.");
        }

        // 3. Validate Email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        // 4. Validate Password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
        if (!passwordRegex.test(password)) {
            errors.push("Password must be between 8 and 20 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        }

        // 5. Validate Confirm Password
        if (password !== confirmPassword) {
            errors.push("Confirm Password must match the Password.");
        }

        // 6. Validate Phone Number
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phoneNumber)) {
            errors.push("Phone Number must be in the format: 123-456-7890.");
        }

        // 7. Validate Date of Birth (At least 18 years old)
        const dobDate = new Date(dob);
        const age = new Date().getFullYear() - dobDate.getFullYear();
        if (age < 18) {
            errors.push("You must be at least 18 years old.");
        }

        // 8. Validate Terms and Conditions
        if (!terms) {
            errors.push("You must agree to the Terms and Conditions.");
        }

        // Debugging: Check if errors are being pushed
        console.log(errors);

        // If any error occurred, we handle it here
        if (errors.length > 0) {
            // Show errors in the page
            errors.forEach(error => {
                const errorItem = document.createElement('li');
                errorItem.textContent = error;
                errorMessages.appendChild(errorItem); // Append the error to the error messages list
            });
            console.warn("Form validation failed with the following errors:");
            console.warn(errors); // Warn about the errors
            return false; // Prevent form submission
        }

    } catch (error) {
        // If an unexpected error occurs, log it
        console.error("An unexpected error occurred during form validation:", error);
        alert("Something went wrong! Please try again later.");
        return false; // Prevent form submission if there's an unexpected error
    }

    // If everything is valid, log to console
    console.log("Form is valid. Proceeding with submission.");
    alert("Form submitted successfully!");

    // Proceed with form submission (if using AJAX or directly)
    return true;
});
