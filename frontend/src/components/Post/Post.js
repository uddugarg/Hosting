import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import { useSelector } from 'react-redux';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Post.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { Link } from 'react-router-dom';

function Post() {

    const user = useSelector(state => state.user);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/post/getPosts')
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.posts);
                } else {
                    alert('Server Down! Please Visit Later')
                }
            })
    }, [])

    return (
        <div className='post'>
            {posts.map((post, i) => (
                <Card key={i} className='post__card'>
                    <Link to={`/hosting/${post._id}`}>
                        <CardActionArea>
                            <img className='post__media' src={`http://localhost:5000/${post.image}`} alt='i' />
                            <CardContent>
                                <Typography className='post__content' variant="body2" component="p">{post.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                    <CardActions className='post__actions'>
                        <Button size="small"><ThumbUpIcon fontSize='small' /> Like</Button>
                        <Button size="small"><ThumbDownAltIcon fontSize='small' /> Unlike</Button>
                        <Button size="small"><SaveAltIcon fontSize='small' />Save </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    )
}

export default Post
