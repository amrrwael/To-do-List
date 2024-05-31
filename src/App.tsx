import React, { useState, useEffect } from 'react';
import TaskList from './components/Tasks';
import AddTaskForm from './components/TaskForm';
import { fetchTasks } from './services/api';
import './index.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const loadTasks = async () => {
    const tasksData = await fetchTasks();
    setTasks(tasksData);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskAdded = () => {
    loadTasks();
  };

  const handleTaskDeleted = () => {
    loadTasks();
  };

  const handleStatusChange = (taskId: string, status: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, attributes: { ...task.attributes, status } } : task
    );
    setTasks(updatedTasks);
  };

  const handleFavoriteChange = (taskId: string, favorite: boolean) => {
    const updatedFavorites = favorite
      ? [...favorites, taskId]
      : favorites.filter((id) => id !== taskId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return task.attributes.status === 'active';
    if (filter === 'completed') return task.attributes.status === 'completed';
    if (filter === 'favorites') return favorites.includes(task.id);
    return true;
  });

  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
        <AddTaskForm onTaskAdded={handleTaskAdded} />
        <div className="filter-buttons">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
            All
          </button>
          <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
            Active
          </button>
          <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
            Completed
          </button>
          <button className={filter === 'favorites' ? 'active' : ''} onClick={() => setFilter('favorites')}>
            Favorites
          </button>
        </div>
      </header>
      <TaskList
        tasks={filteredTasks}
        onTaskDeleted={handleTaskDeleted}
        onStatusChange={handleStatusChange}
        onFavoriteChange={handleFavoriteChange}
        favorites={favorites}
      />
    </div>
  );
};

export default App;
