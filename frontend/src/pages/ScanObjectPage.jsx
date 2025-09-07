import React, { useState } from "react";
import axios from "axios";

export default function ScanObjectPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Select an image first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Change the URL from "/api/predict" to "/api/model"
      const res = await axios.post("/api/model", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
      setCount((c) => c + 1);
    } catch (err) {
      console.error(err);
      alert("Error contacting backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">♻️ Scan Object</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded-lg mt-3"
      >
        {loading ? "Processing..." : "Upload & Classify"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-80">
          <h2 className="text-xl font-semibold mb-2">{result.category} Waste</h2>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
          <p>Instruction: {result.instruction}</p>
          <p className="italic text-gray-600 mt-2">💡 {result.fact}</p>
        </div>
      )}

      {count > 0 && (
        <p className="mt-4 font-bold text-green-700">
          🌟 You have recycled {count} items today!
        </p>
      )}
    </div>
  );
}
