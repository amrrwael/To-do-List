import React from 'react';
import TaskItem from './IndivTask';

interface TaskListProps {
  tasks: any[];
  onTaskDeleted: () => void;
  onStatusChange: (taskId: string, status: string) => void;
  onFavoriteChange: (taskId: string, favorite: boolean) => void;
  favorites: string[];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskDeleted,
  onStatusChange,
  onFavoriteChange,
  favorites,
}) => {
  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDeleted={onTaskDeleted}
            onStatusChange={onStatusChange}
            onFavoriteChange={onFavoriteChange}
            isFavorite={favorites.includes(task.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
