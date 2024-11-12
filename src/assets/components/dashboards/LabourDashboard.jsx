import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LabourDashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([
        { id: 1, description: 'Task 1', status: 'Not Started' },
        { id: 2, description: 'Task 2', status: 'Not Started' },
    ]);
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({ id: null, description: '' });

    const handleInputChange = (e) => {
        setNewTaskDescription(e.target.value);
    };

    const addTask = () => {
        if (newTaskDescription.trim()) {
            setTasks([...tasks, { id: tasks.length + 1, description: newTaskDescription, status: 'Not Started' }]);
            setNewTaskDescription('');
        }
    };

    const toggleTaskStatus = (id) => {
        setTasks(tasks.map(task => 
            task.id === id 
            ? { ...task, status: task.status === 'Not Started' ? 'In Progress' : 'Completed' } 
            : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const startEditing = (task) => {
        setIsEditing(true);
        setCurrentEdit(task);
    };

    const handleEditChange = (e) => {
        setCurrentEdit({ ...currentEdit, description: e.target.value });
    };

    const saveEdit = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, description: currentEdit.description } : task
        ));
        setIsEditing(false);
        setCurrentEdit({ id: null, description: '' });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setCurrentEdit({ id: null, description: '' });
    };

    const handleLogout = () => {
        navigate('/');  
    };

    return (
        <div className='ld-panel'>
            <h2>Labour Dashboard</h2>

            <div className="task-form">
                <input
                    type="text"
                    placeholder="New Task Description"
                    value={newTaskDescription}
                    onChange={handleInputChange}
                    className="task-input"
                />
                <button onClick={addTask} className="add-task-button">Add Task</button>
            </div>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.status}`}>
                        {isEditing && currentEdit.id === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={currentEdit.description}
                                    onChange={handleEditChange}
                                    className="edit-input"
                                />
                                <button onClick={() => saveEdit(task.id)} className="save-button">Save</button>
                                <button onClick={cancelEdit} className="cancel-button">Cancel</button>
                            </>
                        ) : (
                            <>
                                <span className="task-description">
                                    {task.description} - Status: {task.status}
                                </span>
                                <div className="task-actions">
                                    <button onClick={() => toggleTaskStatus(task.id)} className="status-button">
                                        {task.status === 'Not Started' ? 'In Progress' : task.status === 'In Progress' ? 'Complete' : 'Completed'}
                                    </button>
                                    <button onClick={() => startEditing(task)} className="edit-button">Edit</button>
                                    <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default LabourDashboard;
