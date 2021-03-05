import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { registerUser } from '../_actions/user_action';
import { TextField, Button } from '@material-ui/core';
import logo from '../images/logo.jpg'
import { Link } from 'react-router-dom';


function Register(props) {

    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                username: '',
                phNumber: '',
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string()
                    .required('First Name is required'),
                lastName: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is Invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .required('Name is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Password must match')
                    .required('Name is required'),
                username: Yup.string()
                    .required('Username is required'),
                phNumber: Yup.string()
                    .required('Phone is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        username: values.username,
                        phNumber: values.phNumber,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                    }

                    dispatch(registerUser(submit)).then(response => {
                        if (response.payload.success) {
                            props.history && props.history.push('/login');
                        } else {
                            alert(response.payload.err.errmsg)
                        }
                    })
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;

                return (
                    <div className='login'>
                        <div className="login__header">
                            <Link to='/'>
                                <div className="header__logo">
                                    <img src={logo} alt="Hosting" className="header__img" />
                                    <h2>osting</h2>
                                </div>
                            </Link>
                        </div>

                        <div className="login__hero">
                            <img src={logo} alt="Hosting" className="header__img" />
                            <h1>osting</h1>
                        </div>

                        <p>Register here!</p>
                        <form onSubmit={handleSubmit}>
                            <div className='register__box'>

                                <TextField
                                    name='firstName'
                                    label='First Name'
                                    variant='outlined'
                                    type='text'
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.firstName && touched.firstName ? 'text-input error' : 'text-input'
                                    }
                                    required
                                />
                                {errors.firstName && touched.firstName && (
                                    <div className='input-feedback'>{errors.firstName}</div>
                                )}
                                <TextField
                                    name='lastName'
                                    label='Last Name'
                                    variant='outlined'
                                    type='text'
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                                    }
                                    required
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className='input-feedback'>{errors.lastName}</div>
                                )}
                                <TextField
                                    name='username'
                                    label='Username'
                                    variant='outlined'
                                    type='text'
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.username && touched.username ? 'text-input error' : 'text-input'
                                    }
                                    required
                                />
                                {errors.username && touched.username && (
                                    <div className='input-feedback'>{errors.username}</div>
                                )}

                                <TextField
                                    name='email'
                                    label='email'
                                    variant='outlined'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                    required
                                />
                                {errors.email && touched.email && (
                                    <div className='input-feedback'>{errors.email}</div>
                                )}

                                <TextField
                                    name='password'
                                    label='Password'
                                    variant='outlined'
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                    required
                                />
                                {errors.password && touched.password && (
                                    <div className='input-feedback'>{errors.password}</div>
                                )}

                                <TextField
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    variant='outlined'
                                    type='password'
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                    }
                                    required
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className='input-feedback'>{errors.confirmPassword}</div>
                                )}

                                <TextField
                                    name='phNumber'
                                    label='Mobile'
                                    variant='outlined'
                                    type='text'
                                    value={values.phNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.phNumber && touched.phNumber ? 'text-input error' : 'text-input'
                                    }
                                    required
                                />
                                {errors.phNumber && touched.phNumber && (
                                    <div className='input-feedback'>{errors.phNumber}</div>
                                )}

                                <Button className='home__logBtn' variant='outlined' type='submit' onClick={handleSubmit} disabled={isSubmitting}>SignUp</Button>
                            </div>
                        </form>
                    </div>
                );
            }}
        </Formik>
    )
}

export default Register
