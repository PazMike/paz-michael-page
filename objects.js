// Custom Object class for managing photography tasks (e.g., photo shoots, editing tasks, etc.)
class PhotographyTask {
  constructor(clientName, sessionType, date, status = "pending") {
    this.clientName = clientName; // Name of the client for the photography session
    this.sessionType = sessionType; // Type of session (e.g., wedding, family, event)
    this.date = date; // Date of the photography session
    this.status = status; // Status of the task (pending, completed, canceled)
  }
//
  // Method to mark the task as completed.
  markAsCompleted() {
    this.status = "completed";
  }

  // Method to update the task's details (client name, session type, date, status).
  updateTask(newClientName, newSessionType, newDate, newStatus = "pending") {
    this.clientName = newClientName;
    this.sessionType = newSessionType;
    this.date = newDate;
    this.status = newStatus;
  }

  // Method to cancel a photography task.
  cancelTask() {
    this.status = "canceled";
  }

  // Method to get a summary of the photography task.
  getTaskDetails() {
    return `Client: ${this.clientName}\nSession Type: ${this.sessionType}\nSession Date: ${this.date}\nStatus: ${this.status}`;
  }
}
