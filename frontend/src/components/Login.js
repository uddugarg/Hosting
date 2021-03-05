import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../_actions/user_action';
import { Link, withRouter } from 'react-router-dom';
import logo from '../images/logo.jpg'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';

function Login(props) {

    const dispatch = useDispatch();

    const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: '',
            }}
            validationSchema={yup.object().shape({
                email: yup.string()
                    .email('Email is Invalid')
                    .required('Email is required'),
                password: yup.string()
                    .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        email: values.email,
                        password: values.password,
                    }
                    dispatch(loginUser(submit))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId);
                                if (rememberMe === true) {
                                    window.localStorage.setItem('rememberMe', values.id);
                                } else {
                                    localStorage.removeItem('rememberMe');
                                }
                                props.history.push('/');
                            } else {
                                setError('Invalid Username or Password');
                            }
                        })
                        .catch(err => {
                            setError('Invalid Username or Password again');
                            setTimeout(() => {
                                setError('');
                            }, 3000)
                        })
                    setSubmitting(false);
                }, 500)
            }}>

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

                        <p>Sign in here!</p>
                        <form onSubmit={handleSubmit}>
                            <div className="login__box">
                                <TextField id="login__field"
                                    name='email'
                                    variant='outlined'
                                    label='Email'
                                    type='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    required
                                    className={
                                        errors.email && touched.email ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}

                                <TextField id="login__field"
                                    name='password'
                                    variant='outlined'
                                    label='Password'
                                    type='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    required
                                    className={
                                        errors.password && touched.password ? 'text-input error' : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}

                                {error && (
                                    <label><p className='login__error'>{error}</p></label>
                                )}

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={handleRememberMe}
                                            color="primary"
                                        />
                                    }
                                    label="Remember Me"
                                />

                                <Button className='login__btn'
                                    variant='contained'
                                    type='submit'
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}>
                                    Sign in
                                </Button>
                            </div>
                        </form>

                        <footer>
                            <p>need an account?</p>
                            <Button className='login__regBtn' variant='outlined'>Register</Button>
                        </footer>
                    </div>
                )

            }}

        </Formik>
    )
}

export default withRouter(Login);
