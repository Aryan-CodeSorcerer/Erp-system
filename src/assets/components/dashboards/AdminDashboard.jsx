import React from 'react';
// import './AdminDashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const managers = [{ name: 'new', email: 'new@gmail.com' }];
  const labors = [{ name: 'test', email: 'test@gmail.com' }];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h5>Admin Dashboard</h5>
        <ul>
          <li>
            <a href="#sales-managers">Sales Managers</a>
          </li>
          <li>
            <a href="#labors">Labors</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Sales Managers Section */}
        <section id="sales-managers">
          <h3>Sales Managers</h3>
          <button>Add New Manager</button>
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
                        <button>Update</button>
                        <button>Delete</button>
                        <button>View</button>
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
          <button>Add New Labor</button>
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
                        <button>Update</button>
                        <button>Delete</button>
                        <button>View</button>
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
