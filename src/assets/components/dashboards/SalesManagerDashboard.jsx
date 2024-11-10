import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css'

const SalesManagerDashboard = () => {
    const [labours, setLabours] = useState([
        { id: 1, name: 'Labour A', inTime: '9:00 AM', outTime: '5:00 PM' },
        { id: 2, name: 'Labour B', inTime: '10:00 AM', outTime: '6:00 PM' },
    ]);
    const [newLabour, setNewLabour] = useState({ name: '', inTime: '', outTime: '' });
    const navigate = useNavigate(); // Initialize the navigate function

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLabour((prev) => ({ ...prev, [name]: value }));
    };

    const addLabour = () => {
        setLabours([...labours, { ...newLabour, id: labours.length + 1 }]);
        setNewLabour({ name: '', inTime: '', outTime: '' });
    };

    const deleteLabour = (id) => {
        setLabours(labours.filter((labour) => labour.id !== id));
    };

    const handleLogout = () => {
        navigate('/');  
    };

    return (
        <div className='sd-panel'>
            <h2>Sales Manager Dashboard</h2>
           

            <h3>Manage Labours</h3>
            <input
                type="text"
                name="name"
                placeholder="Labour Name"
                value={newLabour.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="inTime"
                placeholder="In Time"
                value={newLabour.inTime}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="outTime"
                placeholder="Out Time"
                value={newLabour.outTime}
                onChange={handleInputChange}
            />
            <button onClick={addLabour}>Add Labour</button>

            <h3>Labour Attendance</h3>
            <ul>
                {labours.map((labour) => (
                    <li key={labour.id}>
                        {labour.name} - In: {labour.inTime}, Out: {labour.outTime}
                        <button onClick={() => deleteLabour(labour.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default SalesManagerDashboard;
