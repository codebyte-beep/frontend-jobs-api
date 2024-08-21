import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const ApplyJobs = () => {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token')
  const [selectedFile, setSelectedFile] = useState(null);
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get('https://jobs-api-06-1.onrender.com/api/v1/jobs/apply-jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setResults(data.jobs)
        setIsLoading(false)
      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    }
    fetch()
  },[token]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleApply = async (jobId) => {
    if (!selectedFile) {
      alert("Please select a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      await axios.post(`https://jobs-api-06-1.onrender.com/api/v1/jobs/${jobId}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Application submitted successfully!");
      setSelectedFile(null);
    } catch (err) {
      console.log(err);
      alert("Error submitting application.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Replace with spinner component
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {results.map((job) => (
        <div className="card" key={job._id}>
          <div className="card-header">
            <img src={job.logo || 'default-logo.png'} alt="Logo" className="card-logo" />
            <div className="card-title-container">
              <h5 className="card-title" style={{ padding: "5px", fontSize: "25px" }}>{job.company}</h5>
              <h5 className="card-title" style={{ padding: "5px", fontSize: "18px", color: 'blue' }}>{job.position}</h5>
            </div>
          </div>
          <div className="card-body">
            <div className="card-info">
              <i className="fas fa-map-marker-alt"></i> {job.location}
            </div>
            <div className="card-status" style={{ padding: "10px" }}>
              <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
            </div>
            <div className="card-info" style={{ padding: "10px" }}>
              <i className="fas fa-calendar-alt"></i> {job.createdAt}
            </div>
          </div>
          <div className="card-footer">
            <input 
              type="file" 
              accept=".pdf, .doc, .docx" 
              onChange={handleFileChange}
              style={{ marginRight: '10px' }}
            />
            <button onClick={() => handleApply(job._id)} className="btn-edit">Apply</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ApplyJobs
