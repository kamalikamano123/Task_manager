import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-10">
          SmartTasks
        </h2>

        <nav className="space-y-4">
          <Link
            to="/"
            className="block p-3 rounded-lg hover:bg-blue-100"
          >
            Tasks
          </Link>

          <Link
            to="/dashboard"
            className="block p-3 rounded-lg hover:bg-blue-100"
          >
            Dashboard
          </Link>
          <Link
            to="/calendar"
            className="block p-3 rounded-lg hover:bg-blue-100"
          >
            Calendar
          </Link>
          {/* <Link to="/calendar">Calendar</Link> */}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>

    </div>
  );
}