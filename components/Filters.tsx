"use client";

type Props = {
  searchInput: string;
  setSearchInput: (v: string) => void;
  onSearch: () => void;
  status: string;
  setStatus: (v: string) => void;
};

export default function Filters({
  searchInput,
  setSearchInput,
  onSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 rounded flex-1"
        placeholder="Search tasks..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(); // 🔥 instant search
        }}
      />

      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-3 rounded"
      >
        Search
      </button>

      <select
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>
    </div>
  );
}
