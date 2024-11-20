import React, { useState } from 'react';
import { roles } from '../utils/roles'; // Import predefined roles
import './ManageRoles.css';

const ManageRoles = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [newRoles, setNewRoles] = useState([...roles]); // Default roles array
  
  const availablePermissions = ['read', 'write', 'delete'];

  const handleRoleNameChange = e => setRoleName(e.target.value);

  const handlePermissionChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter(permission => permission !== value));
    }
  };

  const handleAddRole = () => {
    const newRole = { name: roleName, permissions: permissions };
    setNewRoles([...newRoles, newRole]);
    setRoleName('');
    setPermissions([]);
  };

  return (
    <div className="manage-roles-container">
      <h2>Manage Roles</h2>
      <div className="role-form">
        <input 
          type="text" 
          placeholder="Role Name" 
          value={roleName}
          onChange={handleRoleNameChange}
          className="input-field"
        />
        <div className="permissions">
          {availablePermissions.map(permission => (
            <label key={permission} className="permission-label">
              <input
                type="checkbox"
                value={permission}
                onChange={handlePermissionChange}
              />
              {permission}
            </label>
          ))}
        </div>
        <button onClick={handleAddRole} className="add-role-btn">Add Role</button>
      </div>
      
      <div className="roles-list">
        <h3>Existing Roles</h3>
        <ul>
          {newRoles.map((role, index) => (
            <li key={index} className="role-item">
              <strong>{role.name}</strong>
              <ul>
                {role.permissions.map((permission, idx) => (
                  <li key={idx}>{permission}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageRoles;
