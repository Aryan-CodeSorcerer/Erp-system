import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css'

const AdminDashboard = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', role: 'Sales Manager', location: 'Noida' },
        { id: 2, name: 'Jane Smith', role: 'Labour', location: 'Delhi' },
    ]);
    const [newUser, setNewUser] = useState({ name: '', role: '', location: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const addUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ name: '', role: '', location: '' });
    };

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleLogout = () => {
        navigate('/');  
    };

    return (
        <div className='ad-panel'>
            <h2>Admin Dashboard</h2>
            <h3>Manage Users</h3>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={newUser.name}
                onChange={handleInputChange}
            />
            <select name="role" value={newUser.role} onChange={handleInputChange}>
                <option value="">Select Role</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Labour">Labour</option>
            </select>
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={newUser.location}
                onChange={handleInputChange}
            />
            <button onClick={addUser}>Add User</button>

            <h3>User List</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.role} ({user.location})
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
