import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get('https://jobs-api-06-1.onrender.com/api/v1/jobs/', {
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
  }, [token]);
  const handleEdit = (job) => {
    navigate('/add-jobs', { state: { job } });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jobs-api-06-1.onrender.com/api/v1/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const newResults = results.filter((job) => job._id !== id);
      setResults(newResults)
    } catch (err) {
      console.log(err);
    }

  };

  if (isLoading) {
    return <div>Loading...</div>; // Replace with your spinner component
  }

  return (<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
    {results.map((job) => (
      <div className="card" key={job._id}>
        <div className="card-header">
          <img src={job.logo || 'default-logo.png'} alt="Logo" className="card-logo" />
          <div className="card-title-container">
            <h5 className="card-title" style={{padding:"5px", fontSize: "25px"}}>{job.company}</h5>
            <h5 className="card-title" style={{padding:"5px", fontSize: "18px", color: 'blue'}}>{job.position}</h5>
            {/* <p className="card-company">{job.company}</p> */}
          </div>
        </div>
        <div className="card-body">
          <div className="card-info">
            <i className="fas fa-map-marker-alt"></i> {job.location}
          </div>
          {/* <div className="card-status" style={{ padding: "10px" }}>
            <span className={`status ${job.status.toLowerCase()}`}>{job.position}</span>
          </div> */}
          <div className="card-status" style={{ padding: "10px" }}>
            <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
          </div>
          <div className="card-info" style={{ padding: "10px" }}>
            <i className="fas fa-calendar-alt"></i> {job.createdAt}
          </div>
        </div>
        <div className="card-footer">
          <button onClick={() => handleEdit(job)} className="btn-edit">Edit</button>
          <button onClick={() => handleDelete(job._id)} className="btn-delete">Delete</button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Jobs
