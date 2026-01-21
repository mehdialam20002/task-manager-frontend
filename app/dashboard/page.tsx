"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { getToken, logout } from "@/lib/auth";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import Filters from "@/components/Filters";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [status, setStatus] = useState("");

  // 🔹 SEARCH STATES (IMPORTANT)
  const [searchInput, setSearchInput] = useState(""); // input ke liye (cursor safe)
  const [searchQuery, setSearchQuery] = useState(""); // API ke liye

  const [loading, setLoading] = useState(true);

  // 🔐 AUTH CHECK (ONLY ONCE)
  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }
    loadTasks("", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 📦 TASK LOAD (ONLY WHEN QUERY / STATUS CHANGE)
  useEffect(() => {
    loadTasks(searchQuery, status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, status]);

  const loadTasks = async (search: string, status: string) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/tasks?search=${search}&status=${status}`
      );
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // ➕ ADD
  const addTask = async (title: string) => {
    await api.post("/tasks", { title });
    toast.success("Task added");
    loadTasks(searchQuery, status);
  };

  // 🔄 TOGGLE
  const toggleTask = async (id: number) => {
    await api.patch(`/tasks/${id}/toggle`);
    toast.success("Task updated");
    loadTasks(searchQuery, status);
  };

  // 🗑 DELETE
  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    toast.success("Task deleted");
    loadTasks(searchQuery, status);
  };

  // ✏️ EDIT
  const editTask = async (id: number, title: string) => {
    await api.patch(`/tasks/${id}`, { title });
    toast.success("Task updated");
    loadTasks(searchQuery, status);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button onClick={logout} className="text-red-600">
          Logout
        </button>
      </div>

      {/* ADD TASK */}
      <TaskForm onAdd={addTask} />

      {/* FILTERS + SEARCH */}
      <Filters
  searchInput={searchInput}
  setSearchInput={(value) => {
    setSearchInput(value);

    // 🔥 IMPORTANT FIX
    if (value.trim() === "") {
      setSearchQuery(""); // empty → show all tasks
    }
  }}
  status={status}
  setStatus={setStatus}
  onSearch={() => setSearchQuery(searchInput)}
/>


      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          No tasks found
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow p-3 rounded mb-2"
          >
            <TaskItem
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              onEdit={editTask}
            />
          </div>
        ))
      )}
    </div>
  );
}
