import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  ClipboardList,
  CalendarDays,
  CircleCheck,
  Clock,
  FileText,
  IndianRupee
} from 'lucide-react';

const PatientView = () => {
  const { user } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    setIncidents(all.filter(i => i.patientId === user.patientId));
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2 flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-blue-700" />
        My Treatment History
      </h2>

      {incidents.length === 0 ? (
        <p className="text-gray-500">No treatment records found.</p>
      ) : (
        <div className="space-y-4">
          {incidents.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg p-4"
            >
              <h4 className="text-lg font-medium text-blue-700 mb-1 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-500" />
                {i.title}
              </h4>

              <p className="text-gray-700 mb-2">{i.description}</p>

              <div className="text-sm text-gray-600 space-y-1 mb-2">
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  Date: <span className="font-medium">{i.appointmentDate}</span>
                </p>
                <p className="flex items-center gap-2">
                  {i.status === 'Completed' ? (
                    <CircleCheck className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  )}
                  Status: <span className="font-medium">{i.status}</span>
                </p>
                <p className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-green-700" />
                  Cost: <span className="font-medium text-green-700">₹{i.cost}</span>
                </p>
              </div>

              {i.files?.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {i.files.map((f, idx) => (
                    <a
                      key={idx}
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" />
                      {f.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientView;
