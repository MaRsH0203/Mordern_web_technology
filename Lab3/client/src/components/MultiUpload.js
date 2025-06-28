import React, { useState } from 'react';

export default function MultiUpload() {
  const [files, setFiles] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    await fetch('http://localhost:5000/api/upload-multiple', {
      method: 'POST',
      body: formData,
    });
    alert('Uploaded!');
  };

  return (
    <div>
      <h3>Upload Multiple Images</h3>
      <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}