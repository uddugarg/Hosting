import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import Header from '../Header/Header'
import ImgDropZone from './ImgDropZone';
import './Upload.css';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Upload(props) {

    const user = useSelector(state => state.user);

    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const variable = {
            writer: user.userData._id,
            description: description,
            image: image,
            tags: tags,
        }

        if (description === '' || image === '') {
            return alert('Fields are empty');
        }

        axios.post('/api/post/uploadPost', variable)
            .then(response => {
                if (response.data.success) {
                    alert('Post Created Successfully');
                    setImage('');
                    setDescription('');
                    props.history.push('/');
                } else {
                    alert('Failed to upload post!!')
                }
            })
    }


    return (
        <div className='upload'>
            <Header />

            <Link to='/'>
                <CloseIcon className='upload__close' fontSize='small' />
            </Link>

            <div className="upload__dropzone">
                {!image ? (
                    <div className="upload__img">
                        <ImgDropZone image={image} setImage={setImage} />
                    </div>
                ) : (
                    <div className="upload__img">
                        <img src={`http://localhost:5000/${image}`} alt='thumbs' />
                    </div>
                )}
                <div className="upload__desc">
                    <textarea id="outlined-basic" placeholder="Description" variant="filled" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <TextField className='upload__tags' label='HashTags' variant='filled' value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
            </div>

            <Button className='upload__btn' variant='contained' type='submit' onClick={handleSubmit}>Post</Button>
        </div>
    )
}

export default Upload
