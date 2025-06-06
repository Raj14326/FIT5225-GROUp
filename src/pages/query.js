import React, { useState } from "react";
import axios from "axios";

function Query() {
  const [queryText, setQueryText] = useState('{"crow": 2}');
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [thumbUrl, setThumbUrl] = useState("");
  const [fullImage, setFullImage] = useState("");

  const [tempFile, setTempFile] = useState(null);

  const [editUrls, setEditUrls] = useState("");
  const [editTags, setEditTags] = useState("");
  const [operation, setOperation] = useState("1");

  const [deleteUrls, setDeleteUrls] = useState("");

  // 1. Search by tag JSON
  const handleQuery = async () => {
    setError("");
    try {
      const tags = JSON.parse(queryText);
      const res = await axios.post("https://your-api/search", tags);
      setResults(res.data.links || []);
    } catch {
      setError("Invalid JSON or request failed.");
    }
  };

  // 2. Get full image from thumbnail
  const getFullImage = async () => {
    try {
      const res = await axios.get("https://your-api/get-thumbnail-url", {
        params: { url: thumbUrl }
      });
      setFullImage(res.data.full_url);
    } catch {
      setError("Failed to get full image from thumbnail URL.");
    }
  };

  // 3. Upload file for tag match
  const handleFileMatchQuery = async () => {
    if (!tempFile) return;
    const formData = new FormData();
    formData.append("file", tempFile);
    try {
      const res = await axios.post("https://your-api/query-by-file", formData);
      setResults(res.data.links || []);
    } catch {
      setError("File match query failed.");
    }
  };

  // 4. Add/remove tags manually
  const editTagsFunc = async () => {
    try {
      const urls = editUrls.split(",").map(u => u.trim());
      const tags = editTags.split(",").map(t => t.trim());
      const payload = {
        url: urls,
        operation: parseInt(operation),
        tags: tags
      };
      await axios.post("https://your-api/edit-tags", payload);
      alert("Tags updated successfully.");
    } catch {
      setError("Failed to edit tags.");
    }
  };

  // 5. Delete files
  const deleteFiles = async () => {
    try {
      const urls = deleteUrls.split(",").map(u => u.trim());
      await axios.post("https://your-api/delete", { urls });
      alert("Files deleted successfully.");
    } catch {
      setError("Failed to delete files.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>🔍 Tag-Based Query</h2>
      <textarea className="form-control mb-2" rows="4"
        value={queryText} onChange={e => setQueryText(e.target.value)}
      />
      <button className="btn btn-success mb-4" onClick={handleQuery}>Search by Tags</button>

      <h5>🎯 Thumbnail → Full Image</h5>
      <input className="form-control mb-2" value={thumbUrl} onChange={e => setThumbUrl(e.target.value)} placeholder="Thumbnail URL" />
      <button className="btn btn-info mb-4" onClick={getFullImage}>Get Full Image</button>
      {fullImage && <img src={fullImage} alt="Full" className="img-fluid mb-4" />}

      <h5>🧪 File Match Query</h5>
      <input type="file" className="form-control mb-2" onChange={e => setTempFile(e.target.files[0])} />
      <button className="btn btn-secondary mb-4" onClick={handleFileMatchQuery}>Find Matches by File</button>

      <h5>🏷️ Edit Tags</h5>
      <textarea className="form-control mb-2" placeholder="Image URLs (comma separated)"
        value={editUrls} onChange={e => setEditUrls(e.target.value)} />
      <select className="form-select mb-2" value={operation} onChange={e => setOperation(e.target.value)}>
        <option value="1">Add</option>
        <option value="0">Remove</option>
      </select>
      <input className="form-control mb-2" placeholder="Tags (e.g., crow,2)" value={editTags} onChange={e => setEditTags(e.target.value)} />
      <button className="btn btn-warning mb-4" onClick={editTagsFunc}>Submit Tag Edit</button>

      <h5>🗑️ Delete Files</h5>
      <textarea className="form-control mb-2" placeholder="File URLs to delete"
        value={deleteUrls} onChange={e => setDeleteUrls(e.target.value)} />
      <button className="btn btn-danger mb-4" onClick={() => {
        if (window.confirm("Are you sure?")) deleteFiles();
      }}>Delete Files</button>

      {error && <div className="alert alert-danger">{error}</div>}

      {results.length > 0 && (
        <>
          <h4>📸 Results</h4>
          <div className="row">
            {results.map((url, i) => (
              <div className="col-md-3 mb-3" key={i}>
                <img src={url} alt={"result-" + i} className="img-thumbnail" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Query;
