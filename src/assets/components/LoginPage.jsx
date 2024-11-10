// components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';

const LoginPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const sampleCredentials = {
        Admin: { username: 'admin', password: 'admin123' },
        'Sales Manager': { username: 'sales', password: 'sales123' },
        Labour: { username: 'labour', password: 'labour123' },
        HR: { username: 'hr', password: 'hr123' },
    };

    const selectRole = (role) => {
        setSelectedRole(role);
        setCredentials({ username: '', password: '' });
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const roleCredentials = sampleCredentials[selectedRole];
        if (
            credentials.username === roleCredentials.username &&
            credentials.password === roleCredentials.password
        ) {
            navigate(`/${selectedRole.toLowerCase().replace(' ', '-')}`);
        } else {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <div className="title">ERP System Login</div>
            <div className="role-selector">
                <button onClick={() => selectRole('Admin')}>Admin</button>
                <button onClick={() => selectRole('Sales Manager')}>Sales Manager</button>
                <button onClick={() => selectRole('Labour')}>Labour</button>
                <button onClick={() => selectRole('HR')}>HR Department</button>
            </div>

            {selectedRole && (
                <div className="login-box">
                    <h3>Login as {selectedRole}</h3>
                    <form onSubmit={handleLogin}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            required
                        />
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginPage;
