import { useEffect, useState } from "react";
import API from "../services/api";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
    const [deadline, setDeadline] = useState(""); 

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    API.get("")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("", {
      title,
      description,
      category,
      deadline
    }).then(() => {
      fetchTasks();
      setTitle("");
      setDescription("");
      setCategory("");
    });
  };

  const handleDelete = (id) => {
    API.delete(`/${id}`).then(fetchTasks);
  };

  const markCompleted = (task) => {
    API.put(`/${task.id}`, {
      ...task,
      status: "COMPLETED"
    }).then(fetchTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-3xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          Smart Task Manager 
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
          <div className="grid grid-cols-3 gap-4">
            <input
              className="border p-2 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              className="border p-2 rounded"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              className="border p-2 rounded"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <input
  type="date"
  value={deadline}
  onChange={(e) => setDeadline(e.target.value)}
  className="border p-2 rounded"
/>
          </div>

          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white p-4 shadow rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{task.title}</p>
                <p className="text-sm text-gray-500">{task.description}</p>
                <p className="text-sm">
                  Status:
                  <span
                    className={`ml-2 font-bold ${
                      task.status === "COMPLETED"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                {task.status !== "COMPLETED" && (
                  <button
                    onClick={() => markCompleted(task)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
