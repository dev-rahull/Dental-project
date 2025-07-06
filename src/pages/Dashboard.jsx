import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { AuthContext } from '../context/AuthContext';
import {
  CalendarClock,
  Users,
  IndianRupee,
  ClipboardList,
  UserPlus
} from 'lucide-react';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [recentPatients, setRecentPatients] = useState([]);

  const { user } = useContext(AuthContext);

  if (user?.role !== 'Admin') {
    return <Navigate to="/my-records" />;
  }

  useEffect(() => {
    try {
      const rawData = localStorage.getItem('incidents');
      const data = rawData ? JSON.parse(rawData) : [];

      if (!Array.isArray(data)) throw new Error('Invalid incidents data');

      const upcoming = data.filter(
        (i) => i.appointmentDate && new Date(i.appointmentDate) > new Date()
      );

      const totalRevenue = data.reduce(
        (sum, i) => sum + (parseFloat(i.cost) || 0),
        0
      );

      const sorted = [...data].sort((a, b) =>
        new Date(b.appointmentDate || b.createdAt || 0) -
        new Date(a.appointmentDate || a.createdAt || 0)
      );

      const uniquePatientsMap = new Map();
      for (const i of sorted) {
        if (!uniquePatientsMap.has(i.patientId)) {
          uniquePatientsMap.set(i.patientId, {
            patientId: i.patientId,
            title: i.title,
            date: i.appointmentDate || i.createdAt,
          });
        }
        if (uniquePatientsMap.size >= 5) break;
      }

      setAppointments(upcoming.slice(0, 10));
      setRevenue(totalRevenue);
      setRecentPatients(Array.from(uniquePatientsMap.values()));
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-lg p-5 shadow-sm flex items-center gap-4">
          <IndianRupee className="w-8 h-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-xl font-semibold text-gray-800">₹{revenue}</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-5 shadow-sm flex items-center gap-4">
          <CalendarClock className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Upcoming Appointments</p>
            <p className="text-xl font-semibold text-gray-800">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-5 shadow-sm flex items-center gap-4">
          <Users className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Top Patients</p>
            <p className="text-xl font-semibold text-gray-800">(Simulated)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <ClipboardList className="text-blue-700 w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-700">
              Next 10 Appointments
            </h3>
          </div>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No upcoming appointments.</p>
          ) : (
            <ul className="space-y-3">
              {appointments.map((app) => (
                <li
                  key={app.id}
                  className="bg-white border p-4 rounded-lg shadow-sm"
                >
                  <div className="text-base font-semibold text-blue-800">
                    {app.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    Patient ID: {app.patientId}
                  </div>
                  <div className="text-sm text-gray-600">
                    Date: {new Date(app.appointmentDate).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <UserPlus className="text-green-700 w-5 h-5" />
            <h3 className="text-lg font-semibold text-gray-700">Recent Patients</h3>
          </div>
          {recentPatients.length === 0 ? (
            <p className="text-gray-500">No recent patients found.</p>
          ) : (
            <ul className="space-y-3">
              {recentPatients.map((patient, idx) => (
                <li
                  key={idx}
                  className="bg-white border p-4 rounded-lg shadow-sm"
                >
                  <div className="text-base font-semibold text-gray-800">
                    Patient ID: {patient.patientId}
                  </div>
                  <div className="text-sm text-gray-600">
                    Case: {patient.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    Date: {new Date(patient.date).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
