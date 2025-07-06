import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import IncidentForm from '../components/IncidentForm';
import { v4 as uuidv4 } from 'uuid';
import { FileText } from 'lucide-react';

const PatientDetail = () => {
  const { id } = useParams();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    setIncidents(all.filter(i => i.patientId === id));
  }, [id]);

  const saveIncidents = (updated) => {
    setIncidents(updated);
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    const filtered = all.filter(i => i.patientId !== id);
    localStorage.setItem('incidents', JSON.stringify([...filtered, ...updated]));
  };

  const handleAdd = (incident) => {
    const newIncident = { ...incident, id: uuidv4(), patientId: id };
    const updated = [...incidents, newIncident];
    saveIncidents(updated);
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Patient Incident History</h2>

      <IncidentForm onSubmit={handleAdd} />

      <div className="mt-8 grid gap-4">
        {incidents.length === 0 ? (
          <p className="text-gray-500">No incidents yet for this patient.</p>
        ) : (
          incidents.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-blue-800 mb-1">{i.title}</h4>
              <p className="text-sm text-gray-700 mb-1">{i.description}</p>

              <div className="text-sm text-gray-600 mt-2">
                <div>Appointment Date: <span className="font-medium">{i.appointmentDate}</span></div>
                <div>Status: <span className="font-semibold text-yellow-700">{i.status}</span></div>
                <div>Cost: <span className="font-semibold text-green-700">₹{i.cost}</span></div>
              </div>

              {i.files?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {i.files.map((f, index) => (
                    <a
                      key={index}
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition"
                    >
                      <FileText className="w-4 h-4" />
                      {f.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default PatientDetail;
