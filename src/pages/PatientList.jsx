import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminLayout from '../layouts/AdminLayout';
import PatientForm from './PatientForm';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(data);
  }, []);

  const savePatients = (updated) => {
    setPatients(updated);
    localStorage.setItem('patients', JSON.stringify(updated));
  };

  const handleAdd = (patient) => {
    const newPatient = { ...patient, id: uuidv4() };
    const updated = [...patients, newPatient];
    savePatients(updated);
  };

  const handleEdit = (updatedPatient) => {
    const updated = patients.map((p) =>
      p.id === editingPatient.id ? { ...editingPatient, ...updatedPatient } : p
    );
    savePatients(updated);
    setEditingPatient(null);
  };

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    savePatients(updated);
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Patients</h2>

      <PatientForm
        onSubmit={editingPatient ? handleEdit : handleAdd}
        initialData={editingPatient || {}}
      />

      <div className="mt-8 grid gap-4">
        {patients.length === 0 ? (
          <p className="text-gray-500">No patients found. Please add one.</p>
        ) : (
          patients.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition"
            >
              <div>
                <h4 className="text-lg font-semibold text-blue-800">{p.name}</h4>
                <p className="text-sm text-gray-600">{p.dob} | {p.contact}</p>
                <p className="text-sm text-gray-600 mt-1">{p.healthInfo}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                <Link
                  to={`/patients/${p.id}`}
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Link>
                <button
                  onClick={() => setEditingPatient(p)}
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default PatientList;
