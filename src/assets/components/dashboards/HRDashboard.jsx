// components/dashboards/HRDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const HRDashboard = () => {
    const [employees, setEmployees] = useState([
        { id: 1, name: 'John Doe', attendance: 20, salary: 5000 },
        { id: 2, name: 'Jane Smith', attendance: 22, salary: 5200 },
    ]);
    const navigate = useNavigate(); 
    const handleLogout = () => {
        navigate('/');  
    };

    return (
        <div className='hd-panel'>
            <h2>HR Dashboard</h2>
            <h3>Attendance and Salary</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Attendance (days)</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.attendance}</td>
                            <td>${emp.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HRDashboard;
