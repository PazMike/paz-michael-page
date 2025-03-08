
// Event listener for form submission
document.getElementById('user-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    // 1. Handle user selections using checkboxes
    let selections = [];

    // Get all checkbox elements
    const checkboxes = document.querySelectorAll('.option-checkbox');
    
    checkboxes.forEach(checkbox => {
        // If the checkbox is checked, add it to the array
        if (checkbox.checked) {
            if (!selections.includes(checkbox.value)) {
                selections.push(checkbox.value);
            }
        } else {
            // If unchecked, remove from the array
            const index = selections.indexOf(checkbox.value);
            if (index > -1) {
                selections.splice(index, 1);
            }
        }
    });

    // Display user selections on the screen
    const selectionsOutput = document.getElementById('selections-output');
    selectionsOutput.innerHTML = `<p>You have selected: ${selections.join(', ')}</p>`;

    // 2. Phone number validation using regular expression
    const phoneNumber = document.getElementById('phone-number').value.trim();
    const phoneRegex = /^\d+$/; // Only allow digits (no hyphens or parentheses)
    const phoneError = document.getElementById('phone-error'); // Error message element

    if (!phoneRegex.test(phoneNumber)) {
        // Show error message near the input if phone number is invalid
        if (!phoneError) {
            const errorElement = document.createElement('p');
            errorElement.id = 'phone-error';
            errorElement.style.color = 'red';
            errorElement.textContent = 'Please enter a valid phone number (only digits, no hyphens or parentheses).';
            document.getElementById('user-form').appendChild(errorElement);
        }
        return; // Stop form submission if phone number is invalid
    } else {
        // Remove error message if phone number is valid
        if (phoneError) {
            phoneError.remove();
        }
    }

    // 3. Handle file upload (display contents of text file)
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];
    if (file) {
        const fileError = document.getElementById('file-error'); // File type error message element

        // Only process text files
        if (file.type !== 'text/plain') {
            if (!fileError) {
                const errorElement = document.createElement('p');
                errorElement.id = 'file-error';
                errorElement.style.color = 'red';
                errorElement.textContent = 'Please upload a valid text file (.txt).';
                document.getElementById('user-form').appendChild(errorElement);
            }
            return; // Stop further processing if the file is not a text file
        } else {
            // Remove error message if file type is valid
            if (fileError) {
                fileError.remove();
            }
        }

        // Read file contents and display them
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContents = e.target.result;
            document.getElementById('file-output').textContent = fileContents;
        };
        reader.readAsText(file); // Read file as text
    }
});
