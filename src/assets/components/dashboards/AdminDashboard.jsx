import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [managers, setManagers] = useState([{ name: 'new', email: 'new@gmail.com' }]);
  const [labors, setLabors] = useState([{ name: 'test', email: 'test@gmail.com' }]);

  const [isAddManagerVisible, setIsAddManagerVisible] = useState(false);
  const [isAddLaborVisible, setIsAddLaborVisible] = useState(false);

  const [managerName, setManagerName] = useState('');
  const [managerEmail, setManagerEmail] = useState('');
  
  const [laborName, setLaborName] = useState('');
  const [laborEmail, setLaborEmail] = useState('');

  const navigate = useNavigate();

  const handleAddManager = () => {
    setIsAddManagerVisible(!isAddManagerVisible);
  };

  const handleAddLabor = () => {
    setIsAddLaborVisible(!isAddLaborVisible);
  };

  const handleSaveManager = () => {
    const newManager = { name: managerName, email: managerEmail };
    setManagers([...managers, newManager]);
    setManagerName('');
    setManagerEmail('');
    setIsAddManagerVisible(false);
  };

  const handleSaveLabor = () => {
    const newLabor = { name: laborName, email: laborEmail };
    setLabors([...labors, newLabor]);
    setLaborName('');
    setLaborEmail('');
    setIsAddLaborVisible(false);
  };

  const handleDeleteManager = (index) => {
    const updatedManagers = managers.filter((_, i) => i !== index);
    setManagers(updatedManagers);
  };

  const handleDeleteLabor = (index) => {
    const updatedLabors = labors.filter((_, i) => i !== index);
    setLabors(updatedLabors);
  };

  const handleUpdateManager = (index) => {
    const manager = managers[index];
    setManagerName(manager.name);
    setManagerEmail(manager.email);
    setIsAddManagerVisible(true);
  };

  const handleUpdateLabor = (index) => {
    const labor = labors[index];
    setLaborName(labor.name);
    setLaborEmail(labor.email);
    setIsAddLaborVisible(true);
  };

  const handleLogout = () => {
    // Implement the logout functionality here
    navigate('/'); // Redirect to login page or perform other logout actions
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h5>Admin Dashboard</h5>
        <ul>
          <li><a href="#sales-managers">Sales Managers</a></li>
          <li><a href="#labors">Labors</a></li>
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Sales Managers Section */}
        <section id="sales-managers">
          <h3>Sales Managers</h3>
          <button className="action-button" onClick={handleAddManager}>Add New Manager</button>
          {isAddManagerVisible && (
            <div className="add-manager-form">
              <input
                type="text"
                placeholder="Manager Name"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Manager Email"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
              />
              <button onClick={handleSaveManager}>Save</button>
            </div>
          )}
          <div>
            <div>Manager List</div>
            <div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managers.map((manager, index) => (
                    <tr key={index}>
                      <td>{manager.name}</td>
                      <td>{manager.email}</td>
                      <td>
                        <button className="action-button" onClick={() => handleUpdateManager(index)}>Update</button>
                        <button className="action-button" onClick={() => handleDeleteManager(index)}>Delete</button>
                        <button className="action-button">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Labors Section */}
        <section id="labors">
          <h3>Labors</h3>
          <button className="action-button" onClick={handleAddLabor}>Add New Labor</button>
          {isAddLaborVisible && (
            <div className="add-labor-form">
              <input
                type="text"
                placeholder="Labor Name"
                value={laborName}
                onChange={(e) => setLaborName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Labor Email"
                value={laborEmail}
                onChange={(e) => setLaborEmail(e.target.value)}
              />
              <button onClick={handleSaveLabor}>Save</button>
            </div>
          )}
          <div>
            <div>Labor List</div>
            <div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {labors.map((labor, index) => (
                    <tr key={index}>
                      <td>{labor.name}</td>
                      <td>{labor.email}</td>
                      <td>
                        <button className="action-button" onClick={() => handleUpdateLabor(index)}>Update</button>
                        <button className="action-button" onClick={() => handleDeleteLabor(index)}>Delete</button>
                        <button className="action-button">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
