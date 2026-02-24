import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/Calendar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Tasks />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
}

export default App;