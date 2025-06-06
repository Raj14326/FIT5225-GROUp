import React, { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📤 Upload Media</h2>

      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={e => setFile(e.target.files[0])}
        />
      </div>

      {file && (
        <div className="alert alert-info">
          <strong>Selected File:</strong> {file.name}
        </div>
      )}

      <button className="btn btn-primary" disabled>
        Upload (API pending)
      </button>
    </div>
  );
}

export default Upload;
