

//java script program that:
//Process the grades of the students 
//assigns letter grades
//determines if the student is eligible for honors 
//displays relevent messages based on mulitple conditions


//array to manage student data
// Array containing student names and their respective grades
const students = [
  { name: "Chico", grade: 94 },
  { name: "Barret", grade: 87 },
  { name: "O'pry", grade: 73 },
  { name: "Cavill", grade: 69 },
  { name: "Gandy", grade: 50 }
];





//should contain:
//if
//else
//else if
//switch 
// Function to determine the letter grade for each student using a switch statement
function assignLetterGrade(grade) {
  let letterGrade;
  switch (true) {
    case (grade >= 90):
      letterGrade = "A";
      break;
    case (grade >= 80):
      letterGrade = "B";
      break;
    case (grade >= 70):
      letterGrade = "C";
      break;
    case (grade >= 60):
      letterGrade = "D";
      break;
    default:
      letterGrade = "F";
      break;
  }
  return letterGrade;
}

// Function to check if the student is eligible for honors
function checkHonorEligibility(grade) {
  return grade >= 90 ? "Eligible for Honors" : "Not Eligible for Honors";
}


//Calculate the average grade for all students using:
// for loop
let totalGrade = 0;
for (let i = 0; i < students.length; i++) {
  totalGrade += students[i].grade;
}
let averageGrade = totalGrade / students.length;



//based on the average grade print whether the class performance is:
//Excellent - 90 and up
//Good - 70 through 89
// needs inprovement - below 70 
// Function to determine class performance based on the average grade
function classPerformance(averageGrade) {
  if (averageGrade >= 90) {
    return "Excellent";
  } else if (averageGrade >= 70) {
    return "Good";
  } else {
    return "Needs Improvement";
  }
}

// Function to process all students and display results
function processStudentGrades() {
  let output = "<h2>Student Grade Summary:</h2>";

  // for Loop used to go through each student and display their information
  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let letterGrade = assignLetterGrade(student.grade);  // Using the switch statement here
    let honorStatus = checkHonorEligibility(student.grade);

    output += `
      <p><strong>${student.name}</strong>: Grade = ${student.grade}, Letter Grade = ${letterGrade}, ${honorStatus}</p>
    `;
  }

  // Output the class performance based on average grade
  let performance = classPerformance(averageGrade);
  output += `<h3>Class Performance: ${performance}</h3>`;
  output += `<p>Average Grade: ${averageGrade.toFixed(2)}</p>`;

  // Display everything in the output on the html page
  document.getElementById("output").innerHTML = output;
}

// Call the function to process the grades when the page loads
window.onload = processStudentGrades;
