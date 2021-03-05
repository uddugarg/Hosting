import { Avatar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Comment({ postId }) {

    const [comments, setComments] = useState([]);

    const variable = {
        postId: postId
    }

    useEffect(() => {
        axios.post('/api/comment/getComment', variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments);
                } else {
                    alert('Unable to get comments');
                }
            })
    }, [])

    return (
        <div className='comment'>
            {comments.map((comment, i) => (
                <div className='comment__list'>
                    <Avatar src={comment.writer.image} alt={comment.writer.username} />
                    <div className="comment__info">
                        <h5>@{comment.writer.username}</h5>
                        <p>{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comment
