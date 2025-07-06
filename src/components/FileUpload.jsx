import { useState } from 'react';
import { FileText } from 'lucide-react';

const FileUpload = ({ onUpload, initialFiles = [] }) => {
  const [files, setFiles] = useState(initialFiles);

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileReaders = selectedFiles.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });
    Promise.all(fileReaders).then(newFiles => {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onUpload(updatedFiles);
    });
  };

  return (
    <div className="space-y-3">
      <label className="block w-full">
        <span className="inline-block bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded cursor-pointer hover:bg-gray-200 transition">
          Upload Files
          <input
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </span>
      </label>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100"
            >
              <FileText className="w-4 h-4" />
              {file.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
