import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">
          Task Management System
        </h1>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
//