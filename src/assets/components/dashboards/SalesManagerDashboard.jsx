import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

const SalesManagerDashboard = () => {
    const [labours, setLabours] = useState({
        Noida: [
            { id: 1, name: 'Labour A', inTime: '9:00 AM', outTime: '5:00 PM' },
        ],
        Delhi: [
            { id: 2, name: 'Labour B', inTime: '10:00 AM', outTime: '6:00 PM' },
        ],
        GreaterNoida: [],
    });
    const [newLabour, setNewLabour] = useState({ name: '', inTime: '', outTime: '', area: 'Noida' });
    const [editing, setEditing] = useState(false); // Track if editing mode is on
    const [currentLabour, setCurrentLabour] = useState(null); // Track which labour is being edited
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLabour((prev) => ({ ...prev, [name]: value }));
    };

    const addLabour = () => {
        if (editing) {
            // Update existing labour
            setLabours((prev) => ({
                ...prev,
                [newLabour.area]: prev[newLabour.area].map((labour) =>
                    labour.id === currentLabour.id ? { ...currentLabour, ...newLabour } : labour
                ),
            }));
            setEditing(false);
            setCurrentLabour(null);
        } else {
            // Add new labour
            setLabours((prev) => ({
                ...prev,
                [newLabour.area]: [
                    ...prev[newLabour.area],
                    { ...newLabour, id: prev[newLabour.area].length + 1 },
                ],
            }));
        }
        setNewLabour({ name: '', inTime: '', outTime: '', area: 'Noida' });
    };

    const deleteLabour = (area, id) => {
        setLabours((prev) => ({
            ...prev,
            [area]: prev[area].filter((labour) => labour.id !== id),
        }));
    };

    const editLabour = (area, labour) => {
        setEditing(true);
        setCurrentLabour(labour);
        setNewLabour({ ...labour, area });
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className='sd-panel'>
            <h2>Sales Manager Dashboard</h2>

            <h3>{editing ? 'Edit Labour' : 'Add New Labour'}</h3>
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
            <select name="area" value={newLabour.area} onChange={handleInputChange}>
                <option value="Noida">Noida</option>
                <option value="Delhi">Delhi</option>
                <option value="GreaterNoida">Greater Noida</option>
            </select>
            <button onClick={addLabour}>{editing ? 'Update Labour' : 'Add Labour'}</button>

            <h3>Labour Attendance by Area</h3>
            {Object.keys(labours).map((area) => (
                <div key={area}>
                    <h4>{area}</h4>
                    <ul>
                        {labours[area].map((labour) => (
                            <li key={labour.id}>
                                {labour.name} - In: {labour.inTime}, Out: {labour.outTime}
                                <button onClick={() => editLabour(area, labour)}>Update</button>
                                <button onClick={() => deleteLabour(area, labour.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default SalesManagerDashboard;
