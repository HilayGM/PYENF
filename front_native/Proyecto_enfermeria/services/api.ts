const API_URL = 'http://localhost:8000/api';

export const fetchAdmins = async () => {
  const response = await fetch(`${API_URL}/admins`);
  if (!response.ok) {
    throw new Error('Failed to fetch admins');
  }
  return response.json();
};

export const createAdmin = async (adminData: { name: string; email: string; password: string }) => {
  const response = await fetch(`${API_URL}/admins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminData),
  });
  if (!response.ok) {
    throw new Error('Failed to create admin');
  }
  return response.json();
};

export const deleteAdmin = async (id: number) => {
  const response = await fetch(`${API_URL}/admins/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete admin');
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const fetchUserDetails = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
};
