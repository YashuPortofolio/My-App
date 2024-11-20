import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const { logout, user } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', role: 'user' },
    { id: 2, username: 'jane_smith', role: 'admin' },
    { id: 3, username: 'susan_lee', role: 'user' }
  ]);

  const [newUser, setNewUser] = useState({ username: '', role: 'user' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleLogout = () => {
    logout();  
    navigate('/login');  
  };

  const handleAddUser = () => {
    if (newUser.username.trim() === '') {
      setError('Username is required');
      return;
    }
    setUsers([...users, { id: users.length + 1, username: newUser.username, role: newUser.role }]);
    setNewUser({ username: '', role: 'user' });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleSaveChanges = () => {
    if (selectedUser.username.trim() === '') {
      setError('Username is required');
      return;
    }
    setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
    setSelectedUser(null);  
    setError('');
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['admin-container']}>
      <h1 className={styles['admin-title']}>Admin Dashboard</h1>
      <p className={styles['admin-info']}>Welcome, {user.username}! Manage users below:</p>

      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search users by username or role..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles['search-input']}
        />
      </div>

      <div className={styles['user-list']}>
        <h2>User List</h2>
        {filteredUsers.length > 0 ? (
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id} className={styles['user-item']}>
                <span
                  className={styles['user-name']}
                  onClick={() => handleEditUser(user)} 
                >
                  {user.username} ({user.role})
                </span>
                <button
                  className={styles['delete-button']}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles['no-users']}>No users found</p>
        )}
      </div>

      {selectedUser && (
        <div className={styles['edit-user']}>
          <h2>Edit User</h2>
          <input
            type="text"
            value={selectedUser.username}
            onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
            className={styles['input']}
          />
          <select
            value={selectedUser.role}
            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
            className={styles['select']}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className={styles['save-button']} onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      )}

      {/* Add New User Section */}
      <div className={styles['add-user']}>
        <h2>Add New User</h2>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={newUser.username}
          onChange={handleChange}
          className={styles['input']}
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleChange}
          className={styles['select']}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button className={styles['add-button']} onClick={handleAddUser}>
          Add User
        </button>
        {error && <p className={styles['error-message']}>{error}</p>}
      </div>

      <button className={styles['logout-button']} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminPage;
