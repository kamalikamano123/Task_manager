import { useEffect, useState } from "react";
import API from "../services/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get(""); // IMPORTANT

      console.log("Tasks:", res.data);

      const today = new Date().toISOString().split("T")[0];

 const formattedEvents = res.data.map(task => {
  const eventDate = task.createdAt.split("T")[0]; // Extract only date

  const today = new Date().toISOString().split("T")[0];

  let color = "#22c55e"; // green for completed

  if (task.status !== "COMPLETED" && eventDate < today) {
    color = "#ef4444"; // red = overdue
  } 
  else if (task.status !== "COMPLETED") {
    color = "#f59e0b"; // yellow = pending
  }

  return {
    id: task.id,
    title: task.title,
    date: eventDate,
    color: color
  };
});

      setEvents(formattedEvents);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Task Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventDidMount={(info) => {
          tippy(info.el, {
            content: `
              <strong>${info.event.title}</strong><br/>
              Date: ${info.event.startStr}
            `,
            allowHTML: true,
          });
        }}
      />
    </div>
  );
}