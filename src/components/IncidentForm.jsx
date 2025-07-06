import { useState } from 'react';
import FileUpload from './FileUpload';

const IncidentForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    comments: initialData.comments || '',
    appointmentDate: initialData.appointmentDate || '',
    cost: initialData.cost || '',
    status: initialData.status || '',
    nextDate: initialData.nextDate || '',
    files: initialData.files || [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (files) => {
    setForm({ ...form, files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          name="title"
          placeholder="Treatment Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Treatment Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date & Time</label>
          <input
            name="appointmentDate"
            type="datetime-local"
            value={form.appointmentDate}
            onChange={handleChange}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Next Visit Date</label>
          <input
            name="nextDate"
            type="date"
            value={form.nextDate}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cost (₹)</label>
          <input
            name="cost"
            type="number"
            value={form.cost}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <input
            name="status"
            placeholder="e.g., Completed / Pending"
            value={form.status}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Files</label>
        <FileUpload onUpload={handleFileUpload} initialFiles={form.files} />
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md shadow transition"
        >
          Save Incident
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;
