import React from 'react'
import { useState, useEffect } from 'react';
import FormRow from './FormRow';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AddJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;
  const [values, setValues] = useState({
    company: '',
    position: '',
    status: 'pending'
  })
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (job) {
      setValues({
        company: job.company,
        position: job.position,
        status: job.status
      });
    }
  }, [job]);
  const onSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);
    const token = localStorage.getItem('token')
    if (job) {
      // Update existing job
      try {
        const { data } = await axios.patch(`https://jobs-api-06-1.onrender.com/api/v1/jobs/${job._id}`,
          {
            company: values.company,
            position: values.position,
            status: values.status
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        navigate('/all-jobs')
        console.log(data);
      } catch (err) {
        console.log(err);
      }

    }
    else {
      try {
        const { data } = await axios.post('https://jobs-api-06-1.onrender.com/api/v1/jobs/',
          {
            company: values.company,
            position: values.position,
            status: values.status
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        navigate('/all-jobs')
        console.log(data);
      } catch (err) {
        console.log(err);
      }

    }
    // return data
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  if (isLoading) {
    return <div>Loading...</div>; // Replace with your spinner component
  }
  return (
    <div>

      <form className='form' onSubmit={onSubmit}>
        <h3>{job ? 'Edit Job' : 'Add Job'}</h3>
        {/* name field */}
        <FormRow
          type='text'
          name='company'
          value={values.company}
          handleChange={handleChange}
        />

        {/* email field */}
        <FormRow
          type='text'
          name='position'
          value={values.position}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type='text'
          name='status'
          value={values.status}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          {job ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default AddJob
