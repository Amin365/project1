const API_URL = 'http://localhost:5000/api';

// Fetch and display tasks
function fetchTasks() {
    fetch(`${API_URL}/tasks`)
        .then((response) => response.json())
        .then((tasks) => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear the current task list

            tasks.forEach((task) => {
                const listItem = document.createElement('li');
                listItem.classList.add('task-item');

                // Display task with buttons
                listItem.innerHTML = `
                    <strong>${task.title}:</strong> ${task.description}
                    <span class="status" id="status-${task.id}">[Status: ${task.status}]</span>
                    <div class="task-buttons">
                        <button 
                            class="status-button complete-button" 
                            onclick="updateTaskStatus(${task.id}, 'Complete')"
                        >
                            Complete
                        </button>
                        <button 
                            class="status-button pending-button" 
                            onclick="updateTaskStatus(${task.id}, 'Pending')"
                        >
                            Pending
                        </button>
                        <button 
                            class="status-button delete-button" 
                            onclick="deleteTask(${task.id})"
                        >
                            Delete
                        </button>
                    </div>
                `;
                taskList.appendChild(listItem);
            });
        })
        .catch((err) => console.error('Error fetching tasks:', err));
}

// Add a new task
document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Task added:', data);
            fetchTasks(); // Refresh the task list
        })
        .catch((err) => console.error('Error adding task:', err));
});

// Update task status (Complete or Pending)
function updateTaskStatus(id, status) {
    fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(`Task updated to ${status}:`, data);
            const statusLabel = document.getElementById(`status-${id}`);
            if (statusLabel) {
                statusLabel.textContent = `[Status: ${status}]`; // Update UI dynamically
            }
        })
        .catch((err) => console.error(`Error updating task status to ${status}:`, err));
}

// Delete a task
function deleteTask(id) {
    fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Task deleted:', data);
            fetchTasks(); // Refresh the task list
        })
        .catch((err) => console.error('Error deleting task:', err));
}

// Initial fetch of tasks
fetchTasks();
