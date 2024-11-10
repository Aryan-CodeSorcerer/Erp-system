// components/dashboards/LabourDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css'

const LabourDashboard = () => {
    const navigate = useNavigate(); 
    const [tasks, setTasks] = useState([
        { id: 1, description: 'Task 1', completed: false },
        { id: 2, description: 'Task 2', completed: false },
    ]);

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };
    const handleLogout = () => {
        navigate('/');  
    };

    return (
        <div className='ld-panel'>
            <h2>Labour Dashboard</h2>
            <h3>Task Management</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                            />
                            {task.description}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LabourDashboard;
