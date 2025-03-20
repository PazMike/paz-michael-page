// Creating photography-related tasks
let photoSession1 = new PhotographyTask(
  "John Doe",
  "Wedding",
  "2025-04-10",
  "pending"
);
let photoSession2 = new PhotographyTask(
  "Jane Smith",
  "Family Portrait",
  "2025-04-15",
  "pending"
);

// Array to hold photography tasks
let photographyTasks = [photoSession1, photoSession2];

// Function to display all tasks
function displayTasks() {
  photographyTasks.forEach((task) => {
    console.log(task.getTaskDetails());
  });
}

// Example Usage: Display all photography tasks
console.log("Photography Tasks:");
displayTasks();

// Marking photoSession1 as completed
photoSession1.markAsCompleted();
console.log("\nUpdated Tasks after photoSession1 completion:");
displayTasks();

// Updating photoSession2's details
photoSession2.updateTask(
  "Jane Smith",
  "Family Portrait",
  "2025-04-16",
  "pending"
);
console.log("\nUpdated Tasks after photoSession2 update:");
displayTasks();

// Canceling photoSession2
photoSession2.cancelTask();
console.log("\nTasks after photoSession2 cancellation:");
displayTasks();
