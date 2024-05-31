import axios from 'axios';

const API_URL = 'https://cms.dev-land.host/api/tasks';
const TOKEN = 'a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const fetchTasks = async () => {
  const response = await api.get('/');
  return response.data.data;
};

export const addTask = async (title: string, description: string) => {
  const response = await api.post('/', {
    data: {
      title,
      description,
      status: 'active',
      favorite: false,
    },
  });
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  const response = await api.delete(`/${taskId}`);
  return response.data;
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  const response = await api.put(`/${taskId}`, {
    data: {
      status,
    },
  });
  return response.data;
};
export const updateTaskFavorite = async (taskId: string, favorite: boolean) => {
  const response = await api.put(`/${taskId}`, {
    
    data: {
      favorite,
    },
  });
  console.log('Favorite Task Added.');
  return response.data;
};
