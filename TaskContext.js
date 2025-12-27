import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([
  ]);

  useEffect(() => {
    async function load() {
      const saved = await AsyncStorage.getItem("tasks");
      if (saved) setTasks(JSON.parse(saved));
    }
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask({ title, description, category, dueDate, details }) {
  if (!title && !description) return; 
  const newTask = {
    id: Date.now(),
    title,
    description,
    category,
    dueDate,
    details,
    completed: false,
  };
  setTasks((prev) => [...prev, newTask]);
}

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id, updatedFields) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      )
    );
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !Boolean(t.completed) } : t))
    );
  }

  function updateTask(id, updatedFields) {
    setTasks((prev) =>
      prev.map((task) =>
       task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask, updateTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}
