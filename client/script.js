// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the task form and task list elements from the DOM and assigned it to a variable
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
  
    // 1. Add an event listener to the task form for form submission
    taskForm.addEventListener('submit', async (e) => {
      // a. Prevent the default form submission behavior
      e.preventDefault();
  
      // b. Get input values from the form 
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const assignedTo = document.getElementById('assignedTo').value;
      const deadline = document.getElementById('deadline').value;
  
      // c. Send a POST request to create a new task
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, assignedTo, deadline }),
      });
  
      // d. If the request is successful, add the task to the list and reset the form
      if (response.ok) {
        const task = await response.json();
        addTaskToList(task);
        taskForm.reset();
      } else {
        // If there's an error, show an alert
        alert('Error adding task');
      }
    });
  
    // 2. Function to load tasks from the server
    async function loadTasks() {
      const response = await fetch('/tasks');
      if (response.ok) {
        const tasks = await response.json();
        tasks.forEach(addTaskToList);
      } else {
        alert('Error loading tasks');
      }
    }
  
    //3, Function to add a task to the task list
    function addTaskToList(task) {
      //a. Create a new list item element
      const li = document.createElement('li');
      // Add completed class to list item if task status is 'completed'
      if (task.status === 'completed') {
        li.classList.add('completed');
      }
  
      //b. Create a div for task information
      const taskInfo = document.createElement('div');
      taskInfo.className = 'task-info';
      //c. Populate the task information
      taskInfo.innerHTML = `
        <span><strong>Title:</strong> ${task.title}</span>
        <span><strong>Description:</strong> ${task.description}</span>
        <span><strong>Assigned To:</strong> ${task.assignedTo}</span>
        <span><strong>Deadline:</strong> ${new Date(task.deadline).toLocaleDateString()}</span>
        <span><strong>Status:</strong> ${task.status}</span>
      `;
  
      //d. Create a div for task actions
      const taskActions = document.createElement('div');
      taskActions.className = 'task-actions';
  
      //e. Create a button to mark the task as complete
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Mark as Complete';
      completeButton.addEventListener('click', async () => {
        //i. Send a PATCH request to mark the task as complete
        const response = await fetch(`/tasks/${task._id}/complete`, {
          method: 'PATCH',
        });
        //ii. If the request is successful, update the UI
        if (response.ok) {
          li.classList.add('completed');
          li.querySelector('.task-info span:last-child').textContent = 'Status: completed';
        } else {
          // If there's an error, show an alert
          alert('Error completing task');
        }
      });
  
      //f. Append the complete button to task actions div
      taskActions.appendChild(completeButton);
      //g. Append task info and task actions to the list item
      li.appendChild(taskInfo);
      li.appendChild(taskActions);
      //h. Append the list item to the task list
      taskList.appendChild(li);
    }
  
    //4. Load tasks when the page is loaded
    loadTasks();
});
  