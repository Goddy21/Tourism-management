import React, { useState, useEffect } from "react";
import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an array
  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState("");

  // Fetch tasks from the backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Add token for authorization
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched tasks:", data); // Log fetched data for debugging
        if (Array.isArray(data)) {
          setTasks(data); // Set tasks only if the response is an array
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Assign a new task
  const handleAssignTask = () => {
    if (!newTask.trim()) {
      alert("Task description cannot be empty.");
      return;
    }
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ description: newTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task assigned:", data); // Debug log
        if (data.task) {
          alert(data.message || "Task assigned successfully!");
          setNewTask("");
          setTasks((prevTasks) => [data.task, ...prevTasks]);
        } else {
          console.error("Unexpected response:", data);
        }
      })
      .catch((err) => console.error("Error assigning task:", err));
  };

  // Mark a task as completed
  const handleMarkCompleted = () => {
    if (!taskId.trim()) {
      alert("Please enter a valid Task ID.");
      return;
    }
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task updated:", data); // Debug log
        if (data.task) {
          alert(data.message || "Task marked as completed!");
          setTaskId("");
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === data.task.id ? { ...task, status: "completed" } : task
            )
          );
        } else {
          console.error("Unexpected response:", data);
        }
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
    <div className="tasks-container">
      <div className="main-content">
        <div className="tasks-header">
          <p>Manage tasks and housekeeping schedules</p>
        </div>

        {/* Pending and Completed Tasks Stats */}
        <div className="tasks-stats">
          <div className="stat-card">
            <h2>
              {Array.isArray(tasks) ? tasks.filter((task) => task.status === "pending").length : 0}
            </h2>
            <p>Pending Tasks</p>
          </div>
          <div className="stat-card">
            <h2>
              {Array.isArray(tasks) ? tasks.filter((task) => task.status === "completed").length : 0}
            </h2>
            <p>Completed Tasks</p>
          </div>
        </div>

        {/* Task Actions */}
        <div className="tasks-actions">
          <div>
            <input
              type="text"
              placeholder="Task Description"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAssignTask}>Assign Task</button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Task ID"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            />
            <button onClick={handleMarkCompleted}>Mark Task as Completed</button>
          </div>
        </div>

        {/* Recent Task Activities */}
        <div className="tasks-activities">
          <h3>Recent Activities</h3>
          <ul>
            {(Array.isArray(tasks) ? tasks : []).map((task) => (
              <li key={task.id}>
                Task "{task.description}" is{" "}
                {task.status === "completed" ? "completed" : "pending"}.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
