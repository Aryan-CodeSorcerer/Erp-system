import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import '../styles/index.css';

const SalesManagerDashboard = () => {
    const [tasks, setTasks] = useState({ Noida: [], Delhi: [], GreaterNoida: [] });
    const [newTask, setNewTask] = useState({
        taskName: '',
        assignedTo: '',
        assignedBy: '',
        work: '',
        area: 'Noida',
        status: 'not started',
        startDate: '',
        dueDate: '',
    });
    const [editing, setEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const [laborTimes, setLaborTimes] = useState([]);
    const [newLabor, setNewLabor] = useState({
        name: '',
        inTime: '',
        outTime: ''
    });

    const navigate = useNavigate();

    useEffect(() => { fetchTasks(); }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get('http://localhost:9000/salemanger/alltasks');
            setTasks(groupTasksByArea(data));
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const groupTasksByArea = (tasksData) => {
        return tasksData.reduce((acc, task) => {
            const area = task.area || 'Noida';
            if (!acc[area]) acc[area] = [];
            acc[area].push(task);
            return acc;
        }, {});
    };

    const handleTaskInputChange = (e) => setNewTask({ ...newTask, [e.target.name]: e.target.value });

    const addTask = async () => {
        if (!newTask.taskName || !newTask.assignedTo || !newTask.assignedBy || !newTask.startDate || !newTask.dueDate || !newTask.work) {
            return alert('Please fill in all fields.');
        }

        const taskToSave = editing ? { ...newTask, _id: currentTask?._id } : newTask;

        if (editing && !taskToSave._id) {
            console.error("Current task ID is missing.");
            return alert("Cannot update task without an ID.");
        }

        try {
            const response = editing
                ? await axios.put(`http://localhost:9000/salemanger/alltasks/${taskToSave._id}`, taskToSave)
                : await axios.post('http://localhost:9000/salemanger/alltasks', taskToSave);

            setTasks((prev) => {
                const areaTasks = prev[taskToSave.area] || [];
                return {
                    ...prev,
                    [taskToSave.area]: editing
                        ? areaTasks.map((task) => task._id === taskToSave._id ? taskToSave : task)
                        : [...areaTasks, taskToSave],
                };
            });

            resetTaskForm();
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const resetTaskForm = () => {
        setNewTask({
            taskName: '',
            assignedTo: '',
            assignedBy: '',
            work: '',
            area: 'Noida',
            status: 'not started',
            startDate: '',
            dueDate: '',
        });
        setEditing(false);
        setCurrentTask(null);
    };

    // const handleLaborInputChange = (e) => setNewLabor({ ...newLabor, [e.target.name]: e.target.value });

    // const addLaborTime = () => {
    //     if (!newLabor.name || !newLabor.inTime || !newLabor.outTime) {
    //         return alert('Please fill in all labor fields.');
    //     }
    //     setLaborTimes([...laborTimes, newLabor]);
    //     setNewLabor({ name: '', inTime: '', outTime: '' });
    // };

    return (
        <div className="dashboard-container">
            <div className="sales-dashboard">
                <h2>Sales Manager Dashboard</h2>
                <div>
                    <h3>{editing ? 'Edit Task' : 'Add New Task'}</h3>
                    <input type="text" name="taskName" placeholder="Task Name" value={newTask.taskName} onChange={handleTaskInputChange} />
                    <input type="text" name="assignedTo" placeholder="Assigned To" value={newTask.assignedTo} onChange={handleTaskInputChange} />
                    <input type="text" name="assignedBy" placeholder="Assigned By" value={newTask.assignedBy} onChange={handleTaskInputChange} />
                    <input type="text" name="work" placeholder="Work Description" value={newTask.work} onChange={handleTaskInputChange} />
                    <select name="area" value={newTask.area} onChange={handleTaskInputChange}>
                        <option value="Noida">Noida</option>
                        <option value="Delhi">Delhi</option>
                        <option value="GreaterNoida">Greater Noida</option>
                    </select>
                    <input type="date" name="startDate" value={newTask.startDate} onChange={handleTaskInputChange} />
                    <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleTaskInputChange} />
                    <select name="status" value={newTask.status} onChange={handleTaskInputChange}>
                        <option value="not started">Not Started</option>
                        <option value="in-process">In Process</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button onClick={addTask}>{editing ? 'Update Task' : 'Add Task'}</button>
                </div>

                <div>
                    <h3>Task List by Area</h3>
                    {Object.keys(tasks).map((area) => (
                        <div key={area}>
                            <h4>{area}</h4>
                            <ul>
                                {tasks[area].map((task) => (
                                    <li key={task._id}>
                                        {`${task.taskName} - Assigned To: ${task.assignedTo}, Status: ${task.status}, Work: ${task.work}`}
                                        <button onClick={() => editTask(area, task)}>Edit</button>
                                        <button onClick={() => deleteTask(area, task._id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <button onClick={() => navigate('/')}>Logout</button>
            </div>

            <div className="labor-dashboard">
                <h2>Labor In/Out Time Dashboard</h2>
                {/* <input type="text" name="name" placeholder="Labor Name" value={newLabor.name} onChange={handleLaborInputChange} />
                <input type="time" name="inTime" value={newLabor.inTime} onChange={handleLaborInputChange} />
                <input type="time" name="outTime" value={newLabor.outTime} onChange={handleLaborInputChange} />
                <button onClick={addLaborTime}>Add Labor Time</button> */}

                <h4>Labor Time Records</h4>
                <ul>
                    {laborTimes.map((labor, index) => (
                        <li key={index}>
                            {`${labor.name} - In: ${labor.inTime}, Out: ${labor.outTime}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SalesManagerDashboard;
