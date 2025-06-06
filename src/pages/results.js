import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Results() {
  const location = useLocation();
  const { thumbUrl } = location.state || {};

  const [fullImageUrl, setFullImageUrl] = React.useState(null);

  React.useEffect(() => {
    if (thumbUrl) {
      // Query backend to get full-size image from thumbnail URL
      axios
        .get("https://your-api-url/get-thumbnail-url", {
          params: { url: thumbUrl },
        })
        .then((res) => setFullImageUrl(res.data.full_url)) // Expected { full_url: "..." }
        .catch(() => alert("Failed to retrieve full image"));
    }
  }, [thumbUrl]);

  return (
    <div className="container mt-5">
      <h2>📸 Full Media</h2>
      {fullImageUrl ? (
        <img src={fullImageUrl} alt="Full media" className="img-fluid rounded shadow" />
      ) : (
        <p>Loading full-size image...</p>
      )}
    </div>
  );
}

export default Results;