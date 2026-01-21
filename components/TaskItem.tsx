"use client";
import { useState } from "react";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const saveEdit = () => {
    onEdit(task.id, title);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center">
      {isEditing ? (
        <input
          className="border p-1 rounded flex-1 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <span className={task.status ? "line-through" : ""}>
          {task.title}
        </span>
      )}

      <div className="flex gap-2 ml-2">
        <button onClick={onToggle} className="text-green-600">
          ✓
        </button>

        {isEditing ? (
          <button onClick={saveEdit} className="text-blue-600">
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600"
          >
            Edit
          </button>
        )}

        <button onClick={onDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
