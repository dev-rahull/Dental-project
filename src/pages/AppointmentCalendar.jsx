import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { CalendarDays, Clock } from 'lucide-react';

const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    const sorted = all.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
    setAppointments(sorted);
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Appointment Calendar</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments scheduled.</p>
      ) : (
        <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {appointments.map((app) => {
            const date = new Date(app.appointmentDate);
            return (
              <li
                key={app.id}
                className="flex items-start gap-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
              >
                <div className="text-blue-600">
                  <CalendarDays className="w-6 h-6 mt-1" />
                </div>

                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {date.toLocaleDateString()} — {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="font-medium text-gray-800 text-base mt-1">{app.title}</div>
                  <div className="text-sm text-gray-600 mt-1">Patient ID: <span className="font-semibold">{app.patientId}</span></div>
                  <div className="text-sm text-gray-600">Status: <span className="font-medium">{app.status}</span></div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </AdminLayout>
  );
};

export default AppointmentCalendar;
