import React from 'react'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify';
import FormRow from './FormRow';
import { register, login } from '../requests/Register-req'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};
const Register = () => {
    const [values, setValues] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const { setCurrentUser } = useContext(AuthContext);


    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(false)
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill out all fields');
            return;
        }
        if (isMember) {
            // login
            console.log("wowo");
            try{
                const data = await login(email, password);
                localStorage.setItem('token', data.token)
                setCurrentUser(data.token);
                navigate('/all-jobs');
            }catch(err){
                console.log(err);
            }
            setIsLoading(false)
            return;
        }
        try{
            const data = await register(name, email, password);
            localStorage.setItem('token', data.token)
            setCurrentUser(data.token)
            navigate('/add-jobs')
        }catch(err){
            console.log(err)
        }
        setIsLoading(false)
    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setValues({ ...values, [name]: value });
    };
    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };
    if (isLoading) {
        return <div>Loading...</div>; // Replace with your spinner component
      }
    return (
        <>
            <form className='form' onSubmit={onSubmit}>
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {/* name field */}
                {!values.isMember && (
                    <FormRow
                        type='text'
                        name='name'
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}
                {/* email field */}
                <FormRow
                    type='email'
                    name='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* password field */}
                <FormRow
                    type='password'
                    name='password'
                    value={values.password}
                    handleChange={handleChange}
                />
                <button type='submit' className='btn btn-block' >
                    submit
                </button>
                <p style={{marginTop: "15px"}}>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn' style={{marginLeft:"5px"}}>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </>
    )
}

export default Register
