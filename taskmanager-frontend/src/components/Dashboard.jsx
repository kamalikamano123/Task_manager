import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [dailyData, setDailyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const summaryRes = await API.get("/analytics/dashboard");
      const dailyRes = await API.get("/analytics/daily");
      const categoryRes = await API.get("/analytics/category");

      console.log("Dashboard Summary:", summaryRes.data);
      console.log("Daily Data:", dailyRes.data);
      console.log("Category Data:", categoryRes.data);

      setSummary(summaryRes.data);
      setDailyData(dailyRes.data);
      setCategoryData(categoryRes.data);
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  return (
    <div className="mt-10 space-y-10 px-6">

      {/* ================= Summary Cards ================= */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow text-center">
          <p className="text-lg">Total Tasks</p>
          <p className="text-3xl font-bold">{summary.totalTasks}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow text-center">
          <p className="text-lg">Completed</p>
          <p className="text-3xl font-bold">{summary.completedTasks}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow text-center">
          <p className="text-lg">Pending</p>
          <p className="text-3xl font-bold">{summary.pendingTasks}</p>
        </div>
      </div>

      {/* ================= Daily Productivity ================= */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Daily Productivity</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {/* ⚠️ IMPORTANT: dataKey must match backend field */}
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= Category Distribution ================= */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Category Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="count"
              nameKey="category"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}