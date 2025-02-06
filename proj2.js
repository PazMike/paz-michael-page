

//Here are the 3 functions required to perform calculation based on user input:


// Function to perform basic calculations based on user's input (age in months or birth year)
function calculateAgeInMonths(age) {
    // Calculate age in months
    const ageInMonths = age * 12;
    console.log(`User's age in months: ${ageInMonths}`);
    return ageInMonths;
}

// Function to calculate user's birth year based on the age
function calculateBirthYear(age) {
    // Calculate birth year assuming current year is the base
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;
    console.log(`User's birth year: ${birthYear}`);
    return birthYear;
}

// Function to provide a fun greeting or inspirational message based on user's name
// It will be random what kind of message they recieve
function provideGreeting(name) {
    const greetings = [
        `${name}! God is watching over you!`,
        `${name}! Don't give up, it is all part of Gods plan!`,
        `${name}! Remember, Jesus Loves you!`
    ];
    // Select a random greeting message
    const randomIndex = Math.floor(Math.random() * greetings.length);
    console.log(`Greeting message: ${greetings[randomIndex]}`);
    return greetings[randomIndex];
}

// Form submission handler
    document.getElementById('contact-form').addEventListener('submit', function(event) {
// Prevent the form from refreshing the page
    event.preventDefault(); 


    //This is where I will log data to the console by first getting the data they submitted then loggin it.
    // Get user inputs
    const fullName = document.getElementById('full-name').value.trim();
    const age = parseInt(document.getElementById('age').value.trim());
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Log the user input data to the console
    console.log("Form Data Submitted:");
    console.log(`Full Name: ${fullName}`);
    console.log(`Age: ${age}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);




    //This is where I will validate User Input:
    // If the user inputs invalid data, it will show an error message.
    if (!fullName || !age || !email || !message) {
        alert("Please fill out all fields correctly.");
        console.warn("User did not complete all fields.");
        return; // Exit the function if validation fails
    }

    // This is to check if the user puts in a age that is not positive
    if (isNaN(age) || age <= 0) {
        alert("Please enter a valid age.");
        console.warn("Invalid age input.");
        return;
    }




    // Perform the calculations
    const ageInMonths = calculateAgeInMonths(age);
    const birthYear = calculateBirthYear(age);
    const greetingMessage = provideGreeting(fullName);


    //Display the results back to the user dynamically without refreshing the page
    const output = document.getElementById('response-box');
    output.innerHTML = `
        <p><strong>Thanks for getting in touch, ${fullName}!</strong></p>
        <p>${greetingMessage}</p>
        <p>Your age in months is: <strong>${ageInMonths} months</strong></p>
        <p>Your birth year is: <strong>${birthYear}</strong></p>
        <p><strong>This is your Email:</strong> ${email}</p>
        <p><strong>This is Your Message:</strong> ${message}</p>
    `;
});
