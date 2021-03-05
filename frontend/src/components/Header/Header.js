import React from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../images/logo.jpg';
import { Button, TextField } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './Header.css';
import { useSelector } from 'react-redux';

function Header(props) {

    const user = useSelector(state => state.user);

    const handleLogout = () => {
        axios.get('/api/user/logout')
            .then(response => {
                if (response.status === 200) {
                    props.history.push('/login');
                } else {
                    alert('Log Out Failed')
                }
            });
    }

    return (
        <div className="header">
            <Link to='/'>
                <div className="header__logo">
                    <img src={logo} alt="Hosting" className="header__img" />
                    <h2>osting</h2>
                </div>
            </Link>
            <Link to='/upload'>
                <Button className='header__btn'><PostAddIcon fontSize='small' color='primary' />New Post</Button>
            </Link>

            <div className="header__search">
                <TextField id="filled-basic" label="Search" variant="filled" disabled />
            </div>

            {user.userData && !user.userData.isAuth ? (
                <div className="header__navigation">
                    <Link to='/login'>
                        <Button variant="outlined" color="primary" className='header__signinBtn'>Sign In</Button>
                    </Link>
                    <Link to='/register'>
                        <Button variant="contained" className='header__signupBtn'>Sign Up</Button>
                    </Link>
                </div>
            ) : (
                    <div className="header__navigation">
                        <Button variant="contained" color="primary" className='header__signinBtn'>Welcome! {user.userData && user.userData.username}</Button>
                        <Button variant="contained" className='header__signupBtn' onClick={handleLogout}>Logout</Button>
                    </div>
                )
            }

        </div>
    )
}

export default withRouter(Header)
