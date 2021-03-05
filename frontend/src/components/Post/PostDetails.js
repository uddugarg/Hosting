import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ShareIcon from '@material-ui/icons/Share';
import Header from '../Header/Header';
import { Avatar, Card, CardContent, TextField, Typography } from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import Comment from './Comment';


function PostDetails(props) {

    const user = useSelector(state => state.user);

    const postId = props.match.params.postId;

    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');

    const handleClick = () => {
        window.location.reload();
    }

    const variable = {
        postId: postId,
    }

    const commentVariable = {
        postId: postId,
        comment: comment,
        writer: localStorage.getItem('userId'),
    }

    useEffect(() => {

        axios.post('/api/post/getPost', variable)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.post);
                } else {
                    alert('Unable to fetch this post!');
                }
            })

        axios.get('/api/post/getPosts')
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.posts);
                } else {
                    alert('Server Down! Please Visit Later')
                }
            })
    }, [])

    const handleDelete = () => {
        axios.post('/api/post/deletePost', variable)
            .then(response => {
                if (response.data.success) {
                    alert('Post Deleted Successfully');
                    props.history.push('/');
                } else {
                    alert('Unable to delete this post');
                }
            })
    }

    const handleComment = (e) => {
        e.preventDefault();

        axios.post('/api/comment/postComment', commentVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.comment);
                    setComment('');
                } else {
                    alert('Unable to comment');
                }
            })
    }

    const writer = user.userData && user.userData._id;
    const postWriter = post.writer && post.writer._id;

    return (
        <div className='postDetails'>

            <Header />

            <div className="postDetails__left">
                <div className="postDetails__action1">
                    <ThumbUpAltOutlinedIcon />
                    <ChatBubbleOutlineOutlinedIcon />
                    <ThumbDownOutlinedIcon />
                </div>
                <div className="postDetails__action2">
                    <ShareIcon />
                    <SaveAltIcon />
                </div>
            </div>

            <div className="postDetails__mid">
                <div className="postDetails__user">
                    <Avatar className='postDetails__avatar' src={post.writer && post.writer.image} alt={post.writer && post.writer.username} />
                    <span>@{post.writer && post.writer.username}</span>
                    <span> · {moment(post.createdAt).format('MMM Do YY')}</span>
                    {writer === postWriter &&
                        <DeleteIcon className='postDetails__delete' fontSize='small' onClick={handleDelete} />
                    }
                </div>
                <div className="postDetails__img">
                    <img src={`http://localhost:5000/${post.image}`} alt="" />
                </div>
                <div className="postDetails__content">
                    <p>{post.description}</p>
                </div>
                {post.tags &&
                    <div className="postDetails__tags">
                        <p>{post.tags}</p>
                    </div>
                }
                <div className="postDetails__commentBox">
                    <form onSubmit={handleComment}>
                        <TextField className='postDetails__comment' color='secondary' variant='outlined' label='Write a comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                    </form>
                </div>
                <div className="postDetails__comments">
                    <Comment postId={postId} />
                </div>
            </div>

            <div className="postDetails__right">
                {posts.map((post, i) => (
                    <Link key={i} onClick={handleClick} to={`/hosting/${post._id}`}>
                        <Card className='postDetails__posts'>
                            <CardContent className='postDetails__postContent'>
                                <Typography className='h5' component='h5' variant='h5'>
                                    {post.description}
                                </Typography>
                            </CardContent>
                            <img src={`http://localhost:5000/${post.image}`} alt="" />
                        </Card>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default PostDetails
