import React, { useState } from 'react';
import '../styles/UserManagement.css';// Import the CSS for styling

// Sample data for users
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'Admin', status: 'Active' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserFormVisible, setIsAddUserFormVisible] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: '' });

  // Handle user search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Add User form visibility
  const toggleAddUserForm = () => {
    setIsAddUserFormVisible(!isAddUserFormVisible);
  };

  // Handle form submission for new user
  const handleAddUser = (event) => {
    event.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', role: '', status: '' });
    toggleAddUserForm();
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Button */}
      <button className="add-user-btn" onClick={toggleAddUserForm}>
        Add User
      </button>

      {/* Add User Form (Conditional rendering) */}
      {isAddUserFormVisible && (
        <div className="add-user-form">
          <h2>Add New User</h2>
          <form onSubmit={handleAddUser}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <label>Role:</label>
            <select
              name="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <label>Status:</label>
            <select
              name="status"
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={toggleAddUserForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;