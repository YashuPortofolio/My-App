// This file simulates user registration functionality
let users = []; // Mock "database"

export const registerUser = (username, password, role) => {
  // Check if the user already exists
  const userExists = users.find(user => user.username === username);
  
  if (userExists) {
    return { success: false, message: 'Username already exists' };
  }

  // Register new user
  const newUser = { username, password, role };
  users.push(newUser); // Add user to mock "database"
  
  return { success: true, message: 'User registered successfully' };
};

// Optional: To simulate login functionality, you could also create a login function
export const loginUser = (username, password) => {
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
};
