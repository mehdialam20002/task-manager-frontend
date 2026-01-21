"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="input flex-1"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => {
          if (!title) return;
          onAdd(title);
          setTitle("");
        }}
      >
        Add
      </button>
    </div>
  );
}
